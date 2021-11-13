import moment from "moment";
import { useContext } from "react";
import Link from "next/link";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";
import appContext from "../../context/app/appContext";
moment.locale("es");

const Producto = ({ producto }) => {
  const AppContext = useContext(appContext);
  const { obtenerProductos } = AppContext;

  const fecha_creacion = moment(parseInt(producto.created)).format("DD-MM-YYYY");

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

  

  // console.log(producto);
  return (
    <tr className="text-gray-700 dark:text-gray-400">
      <td className="px-4 py-3">
        <div className="flex items-center text-sm">
          <div className="relative hidden w-10 h-10 mr-3 rounded-full md:block">
            <img
              className="object-cover w-full h-full rounded-full"
              src={`${process.env.imagesURL}/productos/${producto.imagen}`}
              alt=""
              loading="lazy"
            />
            <div
              className="absolute inset-0 rounded-full shadow-inner"
              aria-hidden="true"
            ></div>
          </div>
          <div>
            <p className="font-semibold">{producto.nombre}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm">S/ {producto.precio}</td>
      <td className="px-4 py-3 text-sm">{producto.categoria}</td>
      <td className="px-4 py-3 text-xs">
        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
          Optimo
        </span>
      </td>
      <td className="px-4 py-3 text-sm">{fecha_creacion}</td>
      <td className="px-4 py-3">
        <div className="flex items-center space-x-4 text-sm">
          <Link
            href="/admin/productos/[...producto]"
            as={`/admin/productos/${producto.id}/${producto.nombre}/${producto.precio}/${producto.descripcion}/${producto.id_categoria}/${producto.imagen}/${producto.estado}`}
          >
            <button
              className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
              aria-label="Edit"
            >
              <svg
                className="w-8 h-8 text-blue-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
              </svg>
            </button>
          </Link>
          <button
            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
            aria-label="Delete"
            onClick={() => eliminarProducto(producto.id)}
          >
            <svg
              className="w-8 h-8 text-red-500"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Producto;
