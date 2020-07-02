import React, { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Swal from "sweetalert2";

const ACTUALIZAR_PEDIDO = gql`
  mutation actualizarPedido($input: PedidoInput, $id: ID!) {
    actualizarPedido(id: $id, input: $input) {
      estado
    }
  }
`;

const ELIMINAR_PEDIDO = gql`
  mutation eliminarPedido($id: ID!) {
    eliminarPedido(id: $id)
  }
`;

const PEDIDOS_VENDEDOR = gql`
  query obtenerPedidosVendedor {
    obtenerPedidosVendedor {
      id
    }
  }
`;

const Pedido = ({ data }) => {
  const { id, total, cliente, estado, pedido } = data;
  const { nombre, apellido, telefono, email } = cliente;
  const [estadoPedido, setEstadoPedido] = useState(estado);
  const [claseContainer, setClaseContainer] = useState("");
  //Mutation para cambiar esado del pedido
  const [actualizarPedido] = useMutation(ACTUALIZAR_PEDIDO);
  //Mutation para eliminar pedido
  const [eliminaPedido] = useMutation(ELIMINAR_PEDIDO, {
    update(cache) {
      const { obtenerPedidosVendedor } = cache.readQuery({
        query: PEDIDOS_VENDEDOR,
      });

      cache.writeQuery({
        query: PEDIDOS_VENDEDOR,
        data: {
          obtenerPedidosVendedor: obtenerPedidosVendedor.filter(
            (item) => item.id !== id
          ),
        },
      });
    },
  });

  useEffect(() => {
    if (estadoPedido) {
      setEstadoPedido(estadoPedido);
    }
    modificarStatusPedido();
  }, [estadoPedido]);

  //funcion para modificar el color de pedido por el estado
  const modificarStatusPedido = () => {
    if (estadoPedido === "PENDIENTE") {
      setClaseContainer("border-yellow-500");
    } else if (estadoPedido === "COMPLETADO") {
      setClaseContainer("border-green-500");
    } else {
      setClaseContainer("border-red-500");
    }
  };

  const cambiarEstadoPedido = async (value) => {
    try {
      const { data } = await actualizarPedido({
        variables: {
          id: id,
          input: {
            estado: value,
            cliente: cliente.id,
          },
        },
      });
      setEstadoPedido(data.actualizarPedido.estado);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarPedido = () => {
    Swal.fire({
      title: "Desea eliminar este pedido?",
      text: "Este cambio no es reversible",
      icon: "warning",
      showCancelButton: true,
      confirmButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar",
    }).then(async (result) => {
      if (result.value) {
        try {
          const { data } = await eliminaPedido({ variables: { id } });
          Swal.fire("Eliminado", data.eliminarPedido, success);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div
      className={`mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow ${claseContainer} border-t-4`}
    >
      <div>
        <p className="font-bold text-gray-800">
          Cliente: {nombre} {apellido}
        </p>
        {email && (
          <>
            <p className="flex items-center my-2">
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                className="w-4 h-4 mr-3"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              {email}
            </p>
          </>
        )}

        {telefono && (
          <>
            <p className="flex items-center my-2">
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                className="w-4 h-4 mr-3"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
              {telefono}
            </p>
          </>
        )}

        <h2 className="text-gray-900 font-bold">Estado Pedido:</h2>

        <select
          value={estadoPedido}
          className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
          onChange={(e) => {
            cambiarEstadoPedido(e.target.value);
          }}
        >
          <option value="COMPLETADO">COMPLETADO</option>
          <option value="PENDIENTE">PENDIENTE</option>
          <option value="CANCELADO">CANCELADO</option>
        </select>
      </div>
      <div>
        <h2 className="text-gray-800 font-bold mt-2">Resumen del Pedido</h2>
        <div className="md:grid md:grid-cols-2 md:gap-4">
          {pedido.map(({ id, nombre, cantidad }) => (
            <div key={id} className="mt-4">
              <p className="text-sm text-gray-600">Producto: {nombre}</p>
              <p className="text-sm text-gray-600">Cantidad: {cantidad}</p>
            </div>
          ))}
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <p className="text-gray-800 mt-3 font-bold text-xl">
            <span className="font-bold">Total a pagar: $ {total}</span>
          </p>
          <div className="md:grid md:grid-cols-2 md:gap-4">
            <button
              onClick={() => eliminarPedido()}
              className="uppercase text-xs font-bold flex justify-center items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded"
            >
              Eliminar
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                className="w-8 h-8 ml-3"
              >
                <path
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>
            <button className="uppercase text-xs font-bold flex items-center justify-center mt-4 bg-blue-800 px-5 py-2 inline-block text-white rounded">
              Editar
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                className="w-8 h-8 ml-3"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pedido;
