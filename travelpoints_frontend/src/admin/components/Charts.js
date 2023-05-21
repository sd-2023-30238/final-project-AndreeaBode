import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  Cell,
} from "recharts";

const Charts = () => {
  const [objectives, setObjectives] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/adminboard/objectives")
      .then((res) => {
        setObjectives(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const generateChartData = () => {
    const locationCounts = {};

    
    objectives.forEach((objective) => {
      const { locatie } = objective;
      if (locatie in locationCounts) {
        locationCounts[locatie]++;
      } else {
        locationCounts[locatie] = 1;
      }
    });

    
    const chartData = Object.keys(locationCounts).map((locatie) => ({
      locatie,
      count: locationCounts[locatie],
    }));

    return chartData;
  };

  const chartData = generateChartData();

  const chartFactory = (chartData) => {
    return (
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 4,
          right: 50,
          left: 90,
          bottom: 4,
        }}
        barSize={20}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="locatie" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" background={{ fill: "#eee" }} />
      </BarChart>
    );
  };

  return (
    <div>
      <div className='header'>
        <div className='header-title'>
          <span>Travel</span>
          <span className='halfBlue'>Points</span>
        </div>
        <div className='link'>
        <Link className='link' to='/'>
                      Logout
                </Link>
                 <Link className='link' to='/wishboard'>
                     Wishlist
                 </Link>
            <Link className='link' to='/comments'>
               Comments
            </Link>
            <Link className='link' to='/email'>
                Email
            </Link>
            <Link className='link' to='/pricecharts'>
                      PriceCharts
                </Link>
        </div>
      </div>
      <div className="charts">
        <br /><br /><br />
        {chartFactory(chartData)}
      </div>
    </div>
  );  
};


export default Charts;
