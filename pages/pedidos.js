import Layout from "../Components/Layout";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import Pedido from "../Components/Pedido";

const PEDIDOS_VENDEDOR = gql`
  query obtenerPedidosVendedor {
    obtenerPedidosVendedor {
      id
      pedido {
        nombre
        cantidad
        precio
        id
      }
      total
      cliente {
        id
        nombre
        apellido
        email
        telefono
      }
      creado
      estado
    }
  }
`;

const Pedidos = () => {
  const { data, loading, error } = useQuery(PEDIDOS_VENDEDOR);

  if (loading) return "CARGANDO...";
  const { obtenerPedidosVendedor } = data;

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>
        <Link href="/nuevopedido">
          <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-2 uppercase font-bold">
            Nuevo Pedido
          </a>
        </Link>
        {obtenerPedidosVendedor.length === 0 ? (
          <p className="mt-5 text-center text-2xl">No hay pedidos</p>
        ) : (
          obtenerPedidosVendedor.map((item) => (
            <Pedido key={item.id} data={item} />
          ))
        )}
      </Layout>
    </div>
  );
};

export default Pedidos;
