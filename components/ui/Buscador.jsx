import { useContext, useEffect, useRef } from "react";
import appContext from "../../context/app/appContext";

const Buscador = () => {
    const AppContext = useContext(appContext);
    const {  mostrarBuscador } = AppContext;

    // console.log(sidebar);
  const searchRef = useRef();

  useEffect(() => {
    if (searchRef) {
        mostrarBuscador(searchRef.current);
        console.log(searchRef.current.children);
    }
  }, [searchRef]);

    return (
        <form action="" ref={searchRef} className="search-form">
                <input type="search" placeholder="search here..." id="search-box" />
                <label htmlFor="search-box" className="fas fa-search"></label>
        </form>
    );
}
 
export default Buscador;