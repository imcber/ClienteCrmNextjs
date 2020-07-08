import React from "react";
import Layout from "../Components/Layout";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { gql, useQuery } from "@apollo/client";

const MEJORES_VENDEDORES = gql`
  query mejoresVendedores {
    mejoresVendedores {
      total
      vendedor {
        nombre
        apellido
      }
    }
  }
`;

const data1 = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const MejoresVendedores = () => {
  const { data, loading, error } = useQuery(MEJORES_VENDEDORES);
  if (loading) return "Cargando";
  if (!data) return "Sin data";
  const dataChart = data.mejoresVendedores.map;

  console.log(data);

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Mejores Vendedores</h1>
      <BarChart
        className="mt-10"
        width={500}
        height={300}
        data={data1}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#3182ce" />
      </BarChart>
    </Layout>
  );
};

export default MejoresVendedores;
