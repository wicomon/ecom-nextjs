import { useContext, useEffect, useState } from "react";
import LayoutAdm from "../../components/admin/Layout";
import Producto from "../../components/admin/Producto";
import Modal from "../../components/ui/Modal";
import Spinner from "../../components/ui/Spinner";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";
import appContext from "../../context/app/appContext";
import Tabla from '../../components/Tabla'

const Productos = () => {
    const AppContext = useContext(appContext);
    const {  toggleModal, listadoproductos, obtenerProductos, obtenerCategorias} = AppContext;
    // let listado=listadoproductos;
    const [filtro, filtroBusqueda] = useState('');
    // console.log(filtro);
    useEffect(() =>{
        obtenerProductos();
        obtenerCategorias();
        
    },[]);
      // console.log(listado);
      const columnas = [
        {key:"1" , fila: 'nombre', tipo:'texto', titulo : 'Nombre'},
        {key:"2" , fila: 'precio', tipo:'numero',titulo : 'Precio'},
        {key:"3" , fila: 'id_categoria', tipo:'numero',titulo : 'Categoria'},
        {key:"4" , fila: 'estado', tipo:'numero',titulo : 'Estado'},
        {key:"5" , fila: 'created', tipo:'numero',titulo : 'Fecha Creación'},
        {key:"6" , fila: 'id', tipo:'numero',titulo : 'Acciones'},
      ]

    //   const dataFiltrada = () => {
    //     if (filtro=='') {
    //       return listadoproductos;
    //     }
    //   return listadoproductos.filter(lista => lista.nombre.toString().toLowerCase().includes(filtro.toLowerCase()));
    // }

    const eliminarProducto = async (data) => {
      if (window.confirm("Esta seguro que desea eliminar el producto?")) {
        const token = localStorage.getItem("token");
        // console.log(token);
        if (token) {
          tokenAuth(token);
        }
        try {
          const resultado = await clienteAxios.delete(`/api/productos/${data}`);
          console.log(resultado.data);
          if (resultado.data.estado == 1) {
            await clienteAxios.delete(`/api/archivos/${producto.imagen}`);
          }
          obtenerProductos();
          alert("Se elimino con exito");
        } catch (error) {
          console.log(error);
        }
        delete clienteAxios.defaults.headers.common["x-token"];
      }
    };

    return (
        <LayoutAdm>
            <div className="flex justify-between">
            <h1 className="text-3xl font-semibold text-gray-600 dark:text-gray-300">Productos</h1>
            
            <button 
                  className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200  bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
                  onClick={() => toggleModal(true)}
              
              >Nuevo Producto</button>

            </div>
            <Modal />
            
              {/* <div className="flex flex-col lg:flex-row items-center lg:justify-between my-5">
                <div></div>
                <div className="flex border-2 rounded">
                    <input 
                      type="text" 
                      onChange={e => filtroBusqueda(e.target.value ? e.target.value : '')}  
                      className="px-4 py-2 lg:w-96 md:w-20   bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:focus:shadow-outline-gray" 
                      placeholder="Buscar un producto..." 
                    />
                    
                    <button className="flex items-center justify-center px-4 border-l dark:bg-gray-700">
                        <svg className="w-6 h-6 text-gray-600 dark:text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                        </svg>
                    </button>
                    
                </div>
              </div> */}
              {listadoproductos ? 
                <Tabla key={12345} columnas={columnas} data={listadoproductos} titulo={'producto'} fnEliminar={eliminarProducto} />
              : <Spinner />}

            {/* {listadoproductos ? 
            <div className="w-full overflow-hidden rounded-lg shadow-xs mb-10">
              <div className="w-full overflow-x-auto">
                
                <table className="w-full whitespace-no-wrap">
                  <thead>
                    <tr
                      className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                    >
                      <th className="px-4 py-3">Producto</th>
                      <th className="px-4 py-3">Precio</th>
                      <th className="px-4 py-3">Categoría</th>
                      <th className="px-4 py-3">Estado</th>
                      <th className="px-4 py-3">Fecha creación</th>
                      <th className="px-4 py-3">Acciones</th>
                    </tr>
                  </thead>
                  
                  <tbody
                    className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
                  >
                      {
                        dataFiltrada().map((producto)=> {
                        return <Producto
                            key={producto.created}
                            producto={producto}
                            />;
                        })
                      }
                  </tbody>
                </table>
              </div>
              <div
                className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
              >
                <span className="flex items-center col-span-3">
                  Tabla de productos activos
                </span>
                
                
              </div>
            </div>
            : <Spinner />} */}
        </LayoutAdm>
    );
}

export default Productos;