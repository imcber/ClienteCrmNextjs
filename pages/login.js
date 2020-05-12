import React, { useState } from "react";
import Layout from "../Components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { route } from "next/dist/next-server/server/router";

const AUTENTICAR_USUARIO = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;

const Login = () => {
  //Routing
  const router = useRouter();
  //Message
  const [message, setMessage] = useState(null);
  //Mutation Login
  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);
  //conf formik
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email no es valido")
        .required("El email no puede ir vacio"),
      password: Yup.string().required("El password es obligatorio"),
    }),
    onSubmit: async ({ email, password }) => {
      setMessage("Autentincado...");
      try {
        const { data } = await autenticarUsuario({
          variables: {
            input: {
              email,
              password,
            },
          },
        });
        const { token } = data.autenticarUsuario;
        localStorage.setItem("token", token);
        setMessage(null);
        router.push("/");
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

  if (typeof window !== "undefined" && localStorage.getItem("token")) {
    router.push("/");
    return null;
  }
  return (
    <>
      <Layout>
        <h1 className="text-center text-2xl text-white font-light">Login</h1>

        {message && showMessage()}
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
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
                value="Iniciar sesion"
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

export default Login;
