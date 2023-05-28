import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import { Link } from "react-router-dom";
import {
  Tooltip,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Line,
  Dot,
} from "recharts";

// Componenta decoratoare care înfășoară LineChart și adaugă funcționalitate personalizată
const LineChartDecorator = (BaseComponent) => {
  const DecoratedLineChart = (props) => {
    const { data, ...rest } = props;

    const chartData = generateChartData(data);

    return (
      <BaseComponent data={chartData} {...rest} />
    );
  };

  // Funcție pentru generarea datelor pentru grafic
  const generateChartData = (objectives) => {
    const uniqueObjectives = {};
    objectives.forEach((objective) => {
      const { nume_obiectiv, pret_intrare } = objective;
      if (!uniqueObjectives[nume_obiectiv]) {
        uniqueObjectives[nume_obiectiv] = {
          name: nume_obiectiv,
          price: pret_intrare,
          color: pret_intrare < 30 ? "#00ff00" : "#ff0000",
        };
      }
    });

    return Object.values(uniqueObjectives);
  };

  return DecoratedLineChart;
};

const PriceCharts = () => {
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

  const LineChart = LineChartDecorator(RechartsLineChart); // Componenta decorată

  const CustomizedDot = (props) => {
    const { cx, cy, payload } = props;
    const { color } = payload;

    return (
      <Dot
        cx={cx}
        cy={cy}
        r={4}
        strokeWidth={2}
        stroke={color}
        fill={color}
      />
    );
  };

  return (
    <div>
      <div className="header">
        <div className="header-title">
          <span>Travel</span>
          <span className="halfBlue">Points</span>
        </div>
        <div className="link">
          
          <Link className='link' to='/'>
                      Logout
                </Link>
                 <Link className='link' to='/wishboard'>
                     Wishlist
                 </Link>
            <Link className='link' to='/comments'>
               Comments
            </Link>
            <Link className='link' to='/charts'>
                      Charts
                </Link>
        </div>
      </div>
      <div className="charts">
        <br /><br /><br />
        <LineChart
          width={500}
          height={300}
          data={objectives}
          margin={{
            top: 4,
            right: 50,
            left: 90,
            bottom: 4,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            dot={<CustomizedDot />}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default PriceCharts;
