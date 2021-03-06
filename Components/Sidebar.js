import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  //routing de next
  const router = useRouter();
  const { pathname } = router;

  const LinkSideBar = ({ href, text }) => {
    return (
      <li className={`${pathname === href ? "bg-blue-800" : ""} p-2`}>
        <Link href={href}>
          <a className="text-white block">{text}</a>
        </Link>
      </li>
    );
  };

  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div className="m-2">
        <p className="text-white text-2xl font-black">CRM Clientes</p>
      </div>
      <nav className="mt-3 list-none">
        <ul>
          <LinkSideBar href="/" text="Clientes" />
          <LinkSideBar href="/pedidos" text="Pedidos" />
          <LinkSideBar href="/productos" text="Productos" />
        </ul>
      </nav>
      <div className="m-2">
        <p className="text-white text-2xl font-black">Estadisticas</p>
      </div>
      <nav className="mt-3 list-none">
        <LinkSideBar href="/mejoresvendedores" text="Mejores Vendedores" />
        <LinkSideBar href="/mejoresclientes" text="Mejores Clientes" />
      </nav>
    </aside>
  );
};

export default Sidebar;
