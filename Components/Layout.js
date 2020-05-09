import React from "react";
import Head from "next/head";
import Sidebar from "../Components/Sidebar";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  //hook de router

  const { pathname } = useRouter();
  return (
    <>
      <head>
        <title>CRM Cliente</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU="
          crossOrigin="anonymous"
        />
        <link
          href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </head>
      {pathname === "/login" || pathname === "/nuevacuenta" ? (
        <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
          <div>{children}</div>
        </div>
      ) : (
        <div className="bg-gray-200">
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
              {children}
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
