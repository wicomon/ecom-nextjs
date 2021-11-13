import moment from "moment";
import Link from "next/link";
import { useState } from "react";
moment.locale("es");

const Tabla = ({ columnas, data, titulo,  fnEliminar}) => {
	
  // const fecha_creacion = moment(parseInt(producto.created)).format(
  //   "DD-MM-YYYY"
  // );
	const [filtro, filtroBusqueda] = useState('');
  const [sorted, setSorted] = useState(false);

	const dataFiltrada = (info = data) => {
   if(sorted){
      setSorted(false);
      return info;
    }
    if (filtro != '') {
      const new_data = info.filter(lista => lista.nombre.toString().toLowerCase().includes(filtro.toLowerCase()));
      return new_data;
    }
    return info;
  }
  
  const ordenarUp = (columna) =>{
    if (columna.tipo == 'numero') {
      data.sort((a,b)=>{ 
        return a[columna.fila] - b[columna.fila]
      })
      setSorted(true);
      dataFiltrada()
    }else{
      data.sort((a,b)=>{ 
        if(a[columna.fila].toLowerCase()> b[columna.fila].toLowerCase()) {
          return -1;
        } else if(a[columna.fila].toLowerCase() < b[columna.fila].toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      })
      // console.log(sorted);
      setSorted(true);
      dataFiltrada()
    }
    
  }
  const ordenarDown = (columna) =>{
    if (columna.tipo == 'numero') {
      data.sort((a,b)=>{ 
        return b[columna.fila] - a[columna.fila]
      })
      setSorted(true);
      dataFiltrada()
    }else{
      data.sort((a,b)=>{ 
        // return b[columna.fila].length - a[columna.fila].length
        if(a[columna.fila].toLowerCase()> b[columna.fila].toLowerCase()) {
          return 1;
        } else if(a[columna.fila].toLowerCase() < b[columna.fila].toLowerCase()) {
          return -1;
        } else {
          return 0;
        }
      })
      // console.log(sorted);
      setSorted(true);
      dataFiltrada()
    }
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center lg:justify-between my-5">
        <div></div>
        <div className="flex border-2 rounded dark:focus:border-blue-500">
          <input
            type="text"
            onChange={(e) =>
              filtroBusqueda(e.target.value ? e.target.value : "")
            }
            className="px-4 py-2 lg:w-96 md:w-20   bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:focus:border-purple-500"
            placeholder="Buscar un producto..."
          />

          <button className="flex items-center justify-center px-4 border-l dark:bg-gray-700">
            <svg
              className="w-6 h-6 text-gray-600 dark:text-white"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-lg shadow-xs mb-10">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-xs font-bold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                {columnas.map((columna) => (
                  <th key={columna.key} className="px-4 py-3">
                    <div className="flex justify-between items-center">
                      <div className="">
                        {columna.titulo}
                      </div>
                      <div className="flex flex-col">
                      
                        <button
                              className="flex items-center justify-between text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                              aria-label="Edit"
                              name="up"
                              onClick={()=>ordenarUp(columna)}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                              </svg>
                        </button>
                        <button
                              className="flex items-center justify-between text-sm font-medium leading-5 text-purple-600 roundedLg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                              aria-label="Edit"
                              name="down"
                              onClick={()=>ordenarDown(columna)}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                              </svg>
                        </button>
                      </div>
                    </div>
                    
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {dataFiltrada().map((producto) => {
								return(
                <>
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
                    <td className="px-4 py-3 text-sm">{moment(parseInt(producto.created)).format("DD-MM-YYYY")}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-4 text-sm">
                        <Link key={producto.created}
                          href={`/admin/productos/[...${titulo}]`}
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
                          onClick={() => fnEliminar(producto.id)}
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
                </>)
              })}
            </tbody>
          </table>
        </div>
        <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
          <span className="flex items-center col-span-3">
            Tabla de productos activos
          </span>
        </div>
      </div>
    </>
  );
};

export default Tabla;
