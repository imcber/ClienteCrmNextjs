import Layout from "../Components/Layout";
import { gql, useQuery } from "@apollo/client";
import Producto from "../Components/Producto";
import Link from "next/link";

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      existencia
      precio
    }
  }
`;

const Produtos = () => {
  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

  if (loading) return "Cargando...";
  if (!data) return "No hay productos";

  const { obtenerProductos } = data;
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Produtos</h1>
        <Link href="/nuevoproducto">
          <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-2 uppercase font-bold">
            Nuevo Producto
          </a>
        </Link>
        <div>
          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/5 py-2">Nombre</th>
                <th className="w-1/5 py-2">Existencia</th>
                <th className="w-1/5 py-2">Precio</th>
                <th className="w-1/5 py-2">Eliminar</th>
                <th className="w-1/5 py-2">Editar</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {obtenerProductos.length > 0 ? (
                obtenerProductos.map((item) => (
                  <Producto key={item.id} item={item} />
                ))
              ) : (
                <div>vacio</div>
              )}
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  );
};

export default Produtos;
