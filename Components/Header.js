import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const QUERY_DATA_USER = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
      apellido
      email
    }
  }
`;

const Header = ({ data }) => {
  // routing
  const router = useRouter();

  const { nombre, apellido, email } = data.obtenerUsuario;

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex justify-between mb-6">
      <p className="mr-2">{`Hola ${nombre} ${apellido}`}</p>
      <button
        onClick={() => cerrarSesion()}
        className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-mb"
        type="button"
      >
        Cerrar sesion
      </button>
    </div>
  );
};

export default Header;
