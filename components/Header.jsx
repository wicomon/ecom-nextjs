import Link from "next/link";
import { useContext, useEffect, useRef } from "react";
import appContext from "../context/app/appContext";
import Buscador from "./ui/Buscador";
import Carrito from "./ui/Carrito";
import LoginForm from "./ui/LoginForm";

const Header = () => {
  const AppContext = useContext(appContext);
  const { carrito,loginform, buscador} = AppContext;

  const navbarRef = useRef();
  const menuRef = useRef();
 
  const toggleBuscador = () => {
    buscador.classList.toggle("active");
    carrito.classList.remove("active");
    loginform.classList.remove("active");
    navbarRef.current.classList.remove("active");
  };

  const toggleCarrito = () => {
    carrito.classList.toggle("active");
    buscador.classList.remove("active");
    loginform.classList.remove("active");
    navbarRef.current.classList.remove("active");
  };

  const toggleLogin = () => {
    loginform.classList.toggle("active");
    buscador.classList.remove("active");
    carrito.classList.remove("active");
    navbarRef.current.classList.remove("active");
  };

  const toggleBoton = () => {
    navbarRef.current.classList.toggle("active");
    buscador.classList.remove("active");
    carrito.classList.remove("active");
    loginform.classList.remove("active");
  };

  return (
    <header className="header">
      <Link href="/">
        <a className="logo">
          {" "}
          <i className="fas fa-shopping-basket"></i> Drogo store{" "}
        </a>
      </Link>

      <nav className="navbar" ref={navbarRef}>
        <Link href="/">
          <a>Inicio</a>
        </Link>
        <Link href="/comprar">
          <a>Comprar</a>
        </Link>
         <Link href="/about">
          <a>about</a>
        </Link>
        <Link href="/review">
          <a>review</a>
        </Link>
        <Link href="/blog">
          <a>blog</a>
        </Link>
        <Link href="/contact">
          <a>contact</a>
        </Link>
      </nav>

      <div className="icons">
        <div
          id="menu-btn"
          href={menuRef}
          onClick={() => toggleBoton()}
          className="fas fa-bars"
        ></div>
        <div
          id="search-btn"
          onClick={() => toggleBuscador()}
          className="fas fa-search"
        ></div>
        <div
          id="cart-btn"
          onClick={() => toggleCarrito()}
          className="fas fa-shopping-cart"
        ></div>
        <div
          id="login-btn"
          onClick={() => toggleLogin()}
          className="fas fa-user"
        ></div>
      </div>

      <Buscador />

      <Carrito />


      <LoginForm />

    </header>
  );
};

export default Header;
