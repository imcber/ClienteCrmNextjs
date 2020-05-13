import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import InputForm from "../Components/InputForm";

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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  });

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

export default Login;
