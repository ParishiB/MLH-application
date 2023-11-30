import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PieChart from '../factors/Topics';
import SunburstChart from '../factors/Sector';
import BubbleChart from '../factors/Pestle';
import HorizontalBarChart from '../factors/Likelihood';
import RelevanceHeatmap from '../factors/Relevance';
import YearChart from '../factors/Year';
import RegionChart from '../factors/Region';
import BarChart from '../factors/Test';
import HistogramChart from '../factors/Test1';
import BarChart1 from '../factors/Relevance';
import LineChart from '../factors/Relevance';
import RelevanceLineChart from '../factors/Relevance';
import VariableColorLineChart from '../factors/Intensity';



const Main = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      const API_URL = "http://localhost:8000";
      try {
        const response = await axios.get(`${API_URL}/api/data`);
        setData(response.data);
        console.log('Fetched Data:', response.data); // Add this line to log the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDataFromApi();
  });

  return (
    <>
    <div>
      <h1 className="text-center text-purple-700 font-bold text-2xl p-[30px]"> Here are few visualisations of your data !!!!!</h1>
      <PieChart data={data} />
      <BarChart data={data} />
      <SunburstChart data={data} />
      <BubbleChart data={data} />
      <VariableColorLineChart data={data} />
    </div>
    </>
  );
};

export default Main;
