import Head from "next/head";
import Layout from "../Components/Layout";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

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
  if (loading) return "Cargando";

  if (!loading && !data) {
    router.push("/login");
    return <div>Redirigiendo...</div>;
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
      <div>
        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Empresa</th>
              <th className="w-1/5 py-2">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.obtenerClientesXVendedor.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">
                  {item.nombre} {item.apellido}
                </td>
                <td className="border px-4 py-2">{item.empresa}</td>
                <td className="border px-4 py-2">{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
