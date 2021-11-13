import { useContext, useEffect, useRef } from "react";
import appContext from "../../context/app/appContext";

const Carrito = () => {

    const AppContext = useContext(appContext);
    const { carrito, mostrarCarrito } = AppContext;

    // console.log(sidebar);
  const carritoRef = useRef();

  useEffect(() => {
    if (carritoRef) {
        mostrarCarrito(carritoRef.current);
        // console.log(carritoRef.current.children);
    }
  }, [carritoRef]);

  return (
    <div className="shopping-cart" ref={carritoRef}>
      <div className="box">
        <i className="fas fa-times"></i>
        <img src="image/cart-1.jpg" alt="" />
        <div className="content">
          <h3>organic food</h3>
          <span className="quantity">1</span>
          <span className="multiply">x</span>
          <span className="price">$18.99</span>
        </div>
      </div>
      <div className="box">
        <i className="fas fa-times"></i>
        <img src="image/cart-2.jpg" alt="" />
        <div className="content">
          <h3>organic food</h3>
          <span className="quantity">1</span>
          <span className="multiply">x</span>
          <span className="price">$18.99</span>
        </div>
      </div>
      <div className="box">
        <i className="fas fa-times"></i>
        <img src="image/cart-3.jpg" alt="" />
        <div className="content">
          <h3>organic food</h3>
          <span className="quantity">1</span>
          <span className="multiply">x</span>
          <span className="price">$18.99</span>
        </div>
      </div>
      <h3 className="total">
        {" "}
        total : <span>56.97</span>{" "}
      </h3>
      <a href="#" className="btn">
        checkout cart
      </a>
    </div>
  );
};

export default Carrito;
