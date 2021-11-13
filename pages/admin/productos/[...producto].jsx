import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import LayoutAdm from "../../../components/admin/Layout";
import Spinner from "../../../components/ui/Spinner";
import appContext from "../../../context/app/appContext";
import tokenAuth from "../../../config/tokenAuth";
import clienteAxios from "../../../config/axios";
import Link from "next/link";

const DetalleProducto = () => {
  const router = useRouter();
  const producto = router.query.producto || [];
  // const {nombre} = id;
  // console.log(producto);
  const estilo =
    "block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring";

  const AppContext = useContext(appContext);
  const {
    obtenerProductos,
    productoseleccionado,
    obtenerProducto,
    categorias,
    subirArchivo,
    eliminarArchivo,
    nombreimagen,
  } = AppContext;

  const [product, setProduct] = useState({
    id: producto[0],
    nombre: producto[1],
    precio: producto[2],
    descripcion: producto[3],
    id_categoria: producto[4],
    imagen: producto[5],
    estado: producto[6],
  });
  const [nuevaimagen, setNuevaimagen] = useState(null);
  //   const {nombre,id_categoria,descripcion,precio,imagen, estado} = producto;

  useEffect(() => {
    obtenerProducto(producto[0]);
  }, []);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (event) => {
    if (nombreimagen) {
      eliminarArchivo(nombreimagen);
    }
    if (!event.target.files[0]) {
      return;
    }
    setNuevaimagen(event.target.files[0]);
    const formData = new FormData();
    formData.append("archivo", event.target.files[0]);

    subirArchivo(formData);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    // console.log(token);
    if (token) {
      tokenAuth(token);
    }
    if (nombreimagen) {
      // console.log(nombreimagen);
      const ultimaimagen = product.imagen;
      // console.log(ultimaimagen);
      product.imagen = nombreimagen;
      try {
        const resultado = await clienteAxios.put(
          `/api/productos/${product.id}`,
          product
        );
        // console.log(resultado.data.msg);
        console.log(resultado.data);
        if (resultado.data.estado == 1) {
          eliminarArchivo(ultimaimagen);
        }
        delete clienteAxios.defaults.headers.common["x-token"];
        router.push("/admin/productos");
      } catch (error) {
        console.log(error);
      }
      delete clienteAxios.defaults.headers.common["x-token"];
    } else {
      try {
        const resultado = await clienteAxios.put(
          `/api/productos/${product.id}`,
          product
        );
        delete clienteAxios.defaults.headers.common["x-token"];
        router.push("/admin/productos");
      } catch (error) {
        console.log(error);
      }
      delete clienteAxios.defaults.headers.common["x-token"];
    }
  };

  return (
    <LayoutAdm>
      {!productoseleccionado ? (
        <Spinner />
      ) : (
        <section className="max-w-4xl p-6  bg-white rounded-md shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
            Detalles del producto
          </h2>

          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="nombre"
                >
                  Nombre
                </label>
                <input
                  className={estilo}
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={product.nombre}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="emailAddress"
                >
                  Categoria
                </label>
                <div className="relative">
                  <select
                    className={estilo}
                    name="id_categoria"
                    id="id_categoria"
                    value={product.id_categoria}
                    onChange={handleChange}
                  >
                    <option>Seleccione</option>
                    {categorias &&
                      categorias.map((categoria) => {
                        return (
                          <option key={categoria.id} value={categoria.id}>
                            {categoria.subcategoria}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>

              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="password"
                >
                  Precio
                </label>
                <input
                  className={estilo}
                  id="precio"
                  name="precio"
                  type="number"
                  value={product.precio}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="passwordConfirmation"
                >
                  Descripcion
                </label>
                <input
                  className={estilo}
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  value={product.descripcion}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="imagen"
                >
                  Imagen
                </label>
                <img
                  className="object-contain md:object-scale-down h-48 w-full "
                  src={process.env.imagesURL + "/productos/" + product.imagen}
                />
              </div>
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200 "
                  htmlFor="imagen"
                >
                  Seleccionar nuevo imagen?
                </label>
                <input
                  className="text-gray-700 dark:text-gray-200 mt-20"
                  type="file"
                  onChange={handleImage}
                />
              </div>
            </div>
						<hr className="mt-5"/>
            <div className="flex justify-end ">
              <Link href={`/admin/productos`}>
                <div className="flex justify-end mt-6">
                  <button
                    className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-800 focus:outline-none focus:bg-red-600"
                    type="submit"
                  >
                    Cancelar
                  </button>
                </div>
              </Link>
              <div className="flex justify-end mt-6 ml-5">
                <button
                  className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-900 focus:outline-none focus:bg-green-800"
                  type="submit"
                >
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </section>
      )}
    </LayoutAdm>
  );
};

export default DetalleProducto;
