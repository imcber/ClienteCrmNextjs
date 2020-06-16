import Head from "next/head";
import Layout from "../Components/Layout";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import Cliente from "../Components/Cliente";

//Obtiene los clientes del vendedor
const QUERY_CLIENTES_VENDEDOR = gql`
  query obtenerClientesXVendedor {
    obtenerClientesXVendedor {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;

export default function Index() {
  //consulta de apollo
  const { data, loading, error } = useQuery(QUERY_CLIENTES_VENDEDOR);

  // routing
  const router = useRouter();
  console.log(loading);
  console.log(data);
  console.log(error);
  if (loading) return "Cargando";
  console.log("true bitch");

  console.log(loading);
  console.log(data);
  console.log(error);

  if (!data) {
    localStorage.removeItem("token");
    router.push("/login");
    console.log("otro log");

    console.log(data);
    return <div>Redirigiendo...</div>;
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
      <Link href="/nuevocliente">
        <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-2 uppercase font-bold">
          Nuevo cliente
        </a>
      </Link>
      <div>
        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Empresa</th>
              <th className="w-1/5 py-2">Email</th>
              <th className="w-1/5 py-2">Eliminar</th>
              <th className="w-1/5 py-2">Editar</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.obtenerClientesXVendedor.map((item) => (
              <Cliente key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
