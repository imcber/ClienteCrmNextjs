import React, { useState } from "react";
import Layout from "../Components/Layout";
import InputForm from "../Components/InputForm";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const MUTATION_NUEVO_CLIENTE = gql`
  mutation nuevoCliente($input: ClienteInput) {
    nuevoCliente(input: $input) {
      id
      nombre
      apellido
      empresa
      email
      telefono
    }
  }
`;

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

const NuevoCliente = () => {
  //routing
  const router = useRouter();

  //Mensaje error
  const [message, setMessage] = useState(null);

  //Mutation para nuevos clientes
  const [nuevoCliente] = useMutation(MUTATION_NUEVO_CLIENTE, {
    update(cache, { data: nuevoCliente }) {
      // Obtener objeto de cache a actulizar
      const { obtenerClientesXVendedor } = cache.readQuery({
        query: QUERY_CLIENTES_VENDEDOR,
      });
      //se reescribe el cache, ya que el cache no es mutable
      cache.writeQuery({
        query: QUERY_CLIENTES_VENDEDOR,
        data: {
          obtenerClientesXVendedor: [...obtenerClientesXVendedor, nuevoCliente],
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      empresa: "",
      email: "",
      telefono: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      apellido: Yup.string().required("El apellido es obligatorio"),
      empresa: Yup.string().required("La empresa en obligatoria"),
      email: Yup.string()
        .email("Email invalido")
        .required("El email es obligatorio"),
      telefono: Yup.string(),
    }),
    onSubmit: async ({ nombre, apellido, empresa, email, telefono }) => {
      try {
        const { data } = await nuevoCliente({
          variables: {
            input: {
              nombre,
              apellido,
              empresa,
              email,
              telefono,
            },
          },
        });
        router.push("/"); //redireccion clientes
      } catch (error) {
        setMessage(error.message.replace("GraphQL error:", "").trim());
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    },
  });

  const showMessage = () => {
    return (
      <div className="bg-white py-2 px-3 w-full max-w-lg my-3 max-w-sm text-center mx-auto">
        <p>{message}</p>
      </div>
    );
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo cliente</h1>
      {message && showMessage()}
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md pt-6 pb-8 mb-4 px-8"
            onSubmit={formik.handleSubmit}
          >
            <InputForm
              name="nombre"
              type="text"
              placeholder="Nombre Cliente"
              label="Nombre"
              formik={formik}
            />
            <InputForm
              name="apellido"
              type="text"
              placeholder="Apellido Cliente"
              label="Apellido"
              formik={formik}
            />
            <InputForm
              name="empresa"
              type="text"
              placeholder="Empresa Cliente"
              label="Empresa"
              formik={formik}
            />
            <InputForm
              name="email"
              type="email"
              placeholder="Email Cliente"
              label="Email"
              formik={formik}
            />
            <InputForm
              name="telefono"
              type="tel"
              placeholder="Telefono Cliente"
              label="Telefono"
              formik={formik}
            />
            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer"
              value="Registrar Cliente"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NuevoCliente;
