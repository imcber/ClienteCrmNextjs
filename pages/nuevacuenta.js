import React, { useState } from "react";
import Layout from "../Components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

const NUEVA_CUENTA = gql`
  mutation nuevoUsuario($input: UsuarioInput) {
    nuevoUsuario(input: $input) {
      id
      nombre
      apellido
      email
    }
  }
`;

const NuevaCuenta = () => {
  //state para el mensaje
  const [message, setMessage] = useState(null);
  //Mutation para nuevos usuarios
  const [nuevoUsuario] = useMutation(NUEVA_CUENTA);
  //Routing
  const router = useRouter();
  // validacion del formulario
  const formik = useFormik({
    initialValues: { nombre: "", apellido: "", email: "", password: "" },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      apellido: Yup.string().required("El apellido es obligatorio"),
      email: Yup.string()
        .email("El email no es valido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .required("El password es obligatorio")
        .min(6, "La contraseña de ser de almenos 6 caracteres"),
    }),
    onSubmit: async ({ nombre, apellido, email, password }) => {
      try {
        const { data } = await nuevoUsuario({
          variables: {
            input: {
              nombre,
              apellido,
              email,
              password,
            },
          },
        });
        setMessage(
          `Se creo correctamente el usuario: ${data.nuevoUsuario.nombre}`
        );
        setTimeout(() => {
          setMessage(null);
          router.push("/login");
        }, 3000);
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
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{message}</p>
      </div>
    );
  };

  return (
    <>
      <Layout>
        {message && showMessage()}
        <h1 className="text-center text-2xl text-white font-light">
          Crear Nueva Cuenta
        </h1>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <InputForm
                name="nombre"
                type="text"
                placeholder="Nombre Usuario"
                label="Nombre"
                formik={formik}
              />
              <InputForm
                name="apellido"
                type="text"
                placeholder="Apellido Usuario"
                label="Apellido"
                formik={formik}
              />
              <InputForm
                name="email"
                type="email"
                placeholder="Email usuario"
                label="Email"
                formik={formik}
              />
              <InputForm
                name="password"
                type="password"
                placeholder="Password usuario"
                label="Contraseña"
                formik={formik}
              />
              <input
                type="submit"
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 cursor-pointer"
                value="Crear Cuenta"
              />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

const InputForm = ({ name, type, placeholder, label, formik }) => {
  const { errors, handleBlur, handleChange, values, touched } = formik;

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        type={type}
        placeholder={placeholder}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors[name] && touched[name] ? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
          <p className="font-bold">{errors[name]}</p>
        </div>
      ) : null}
    </div>
  );
};
export default NuevaCuenta;
