import React from "react";
import Swal from "sweetalert2";
import { useMutation, gql } from "@apollo/client";
import Router from "next/router";

const ELIMINAR_PRODUCTO = gql`
  mutation eliminarProducto($id: ID!) {
    eliminarProducto(id: $id)
  }
`;

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

const Producto = ({ item: { existencia, id, nombre, precio } }) => {
  const [eliminaProducto] = useMutation(ELIMINAR_PRODUCTO, {
    update(cache) {
      const { obtenerProductos } = cache.readQuery({
        query: OBTENER_PRODUCTOS,
      });

      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: {
          obtenerProductos: obtenerProductos.filter((item) => item.id !== id),
        },
      });
    },
  });
  const eliminarProducto = () => {
    Swal.fire({
      title: "Deseas eliminar este producto?",
      text: "Este cambio no es reversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar",
    }).then(async (result) => {
      if (result.value) {
        try {
          const { data } = await eliminaProducto({ variables: { id } });
          Swal.fire("Correcto", data.eliminarProducto, "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const editarProducto = () => {
    Router.push({
      pathname: "/editarproducto/[id]",
      query: { id },
    });
  };
  return (
    <tr>
      <td className="border px-4 py-2">{nombre}</td>
      <td className="border px-4 py-2">{existencia}</td>
      <td className="border px-4 py-2">$ {precio}</td>
      <td className="border px-4 py-2">
        <button
          type="button"
          onClick={() => eliminarProducto()}
          className="flex items-center justify-center bg-red-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold hover:bg-red-800"
        >
          Eliminar
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-8 h-8 ml-3">
            <path
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>
          </svg>
        </button>
      </td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex items-center justify-center bg-blue-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold hover:bg-blue-800"
          onClick={() => editarProducto()}
        >
          Editar
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-8 h-8 ml-3">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Producto;
