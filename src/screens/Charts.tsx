import React from 'react';
import Chart from 'chart.js/auto';
import { useQuery } from 'react-query';
import { Line } from 'react-chartjs-2';

//Imported these files as default map marker was not working properly
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';

import {
  LinearScale,
  TimeScale,
  CategoryScale,
  TimeSeriesScale,
  Legend,
  Tooltip,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
} from 'chart.js/auto';
import {
  MapContainer,
  MapContainerProps,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';

//Registering the scales for the chart
Chart.register(
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Legend,
  Tooltip,
  CategoryScale,
  TimeScale,
  TimeSeriesScale
);

interface MapProps extends MapContainerProps {
  center: [number, number];
  zoom: number;
  scrollWheelZoom: boolean;
}

const ChartsMap: React.FC = () => {
  const { isLoading: isCountriesLoading, data: countryData } = useQuery(
    'countryData',
    async () => {
      const response = await fetch('https://disease.sh/v3/covid-19/countries');
      const data = await response.json();
      return data;
    }
  );

  const { isLoading: isGraphDataLoading, data: graphData } = useQuery(
    'graphData',
    async () => {
      const response = await fetch(
        'https://disease.sh/v3/covid-19/historical/all?lastdays=all'
      );
      const data = await response.json();
      return data;
    }
  );

  if (isCountriesLoading || isGraphDataLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full text-2xl font-medium text-white">
        Loading...
      </div>
    );
  }

  const graphLabels = Object.keys(graphData.cases);
  const graphDataPoints = Object.values(graphData.cases);

  const lineGraphData = {
    labels: graphLabels,
    datasets: [
      {
        label: 'Cases',
        data: graphDataPoints,
        fill: false,
        borderColor: '#4B5563',
        yAxisID: 'linear',
      },
    ],
  };

  const mapMarkers = countryData.map((country: any) => (
    <Marker
      key={country.country}
      position={[country.countryInfo.lat, country.countryInfo.long]}
    >
      <Popup>
        <div>
          <h3>{country.country}</h3>
          <p>Total Active Cases: {country.active}</p>
          <p>Total Recovered Cases: {country.recovered}</p>
          <p>Total Deaths: {country.deaths}</p>
        </div>
      </Popup>
    </Marker>
  ));

  const mapProps: MapProps = {
    center: [20, 0],
    zoom: 3,
    scrollWheelZoom: false,
  };

  return (
    <div className="text-white bg-primary-bg">
      <h1 className="my-6 text-3xl font-bold text-center">Worldwide Cases</h1>
      <div className="w-full mx-auto md:w-3/4">
        <Line data={lineGraphData} className="w-full" />
      </div>
      <div className="relative mt-6">
        <h1 className="mb-4 text-3xl font-bold text-center">
          Cases by Country
        </h1>
        <MapContainer
          {...mapProps}
          style={{
            height: '400px',
            backgroundColor: 'red',
            marginBottom: '90px',
          }}
          className="md:mt-20"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {mapMarkers}
        </MapContainer>
      </div>
    </div>
  );
};

export default ChartsMap;
