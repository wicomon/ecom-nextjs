import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import appContext from "../../context/app/appContext";
import authContext from "../../context/auth/authContext";
import AlertaProducto from "./AlertaProductos";

const Modal = () => {
  const { toggleModal,cargando, modal,subirArchivo, nombreimagen,crearProducto,
    mensajeproducto,eliminarArchivo,obtenerProductos, categorias } = useContext(appContext);
  const { usuario } = useContext(authContext);

  const [image, setImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      id_categoria: "",
      nombre: "",
      descripcion: "",
      precio: "",
    },
    validationSchema: Yup.object({
      id_categoria: Yup.string().required("Debe seleccionar una categoria"),
      nombre: Yup.string().required("El nombre es obligatorio"),
      descripcion: Yup.string().required("La descripción es obligatoria"),
      precio: Yup.number('debe ser un numero').required("El precio es obligatorio"),
    }),
    onSubmit: (valores) => {
      if (!nombreimagen || !usuario) {
        return alert('debe seleccionar una imagen')
      }
      valores.imagen = nombreimagen;
      valores.id_creador = usuario.id
      crearProducto(valores);
      obtenerProductos();
    },
  });

  const handleImage = (event) => {
    if (nombreimagen) {
      eliminarArchivo(nombreimagen);
    }
    setImage(event.target.files[0])
    const formData = new FormData();
    formData.append('archivo', event.target.files[0]);

    subirArchivo(formData);
  };

  const limpiarFormulario = () => {
    // console.log('entro entro entro');
    formik.values.id_categoria = ""
    formik.values.nombre = ""
    formik.values.descripcion = ""
    formik.values.precio = ""
    // setImage(null);
    if (nombreimagen) {
      eliminarArchivo(nombreimagen);
    }
    toggleModal(false);
  };

  return (
    <div
      className={`${
        modal ? "fixed" : "hidden"
      } h-screen w-full left-0 top-0 flex justify-center items-center  p-6 bg-white rounded-md shadow-md dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50`}
    >
      <div className="bg-white rounded shadow-lg w-10/12 md:w-1/3 lg:w-3/5 lg:ml-60 xl:w-1/3 overflow-y-auto max-h-screen">
        <div className="border-b px-4 py-2 flex justify-between items-center">
          <svg
            className="h-8 w-8 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-semibold capitalize">Crear Producto</h3>
          <button
            className="text-black close-modal dark:text-whitee" 
            onClick={limpiarFormulario}
            disabled={cargando}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* ----------------------------------------------------------------------------------------------------------------------------- */}
        {mensajeproducto && <AlertaProducto />}
        <form onSubmit={formik.handleSubmit} className="mt-5 mx-1 px-1 lg:mx-5 ">
          {/* Fila */}
          <div className="flex flex-wrap -mx-3 mb-5">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-city"
              >
                City
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                placeholder="Albuquerque"
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                Categoria
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="id_categoria"
                  value={formik.values.id_categoria}
                  onChange={formik.handleChange}
                >
                  <option>Seleccione</option>
                  {categorias && 

                    categorias.map((categoria) =>{
                      return <option key={categoria.id} value={categoria.id}>{categoria.subcategoria}</option>;
                    })
                  }
                  
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {formik.touched.id_categoria && formik.errors.id_categoria ? (
                  <p className="text-red-500 text-xs italic">
                  {formik.errors.id_categoria}
                </p>
              ) : null}
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-zip"
              >
                Precio
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="precio"
                type="number"
                placeholder="en soles"
                value={formik.values.precio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.precio && formik.errors.precio ? (
                  <p className="text-red-500 text-xs italic">
                  {formik.errors.precio}
                </p>
              ) : null}
            </div>
          </div>
          {/* Fila */}
          <div className="flex flex-wrap -mx-3 mb-6 ">
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Nombre del producto
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200
                rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.nombre && formik.errors.nombre ? (
                  <p className="text-red-500 text-xs italic">
                  {formik.errors.nombre}
                </p>
              ) : null}
            </div>
          </div>
          {/* Fila */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Imagen del producto
              </label>
              <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">
                  Selecciona una imagen
                </span>
                <input type="file" className="hidden" onChange={handleImage} />
              </label>
            </div>
            <div className="w-full flex items-center md:w-1/2 px-3">
              
            <p className="text-black text-l italic">
                {image ? `

                  ${image.name} 
                
                `
                : 'no has seleccionado ninguna imagen'}
              </p>
              {formik.touched.imagen && formik.errors.imagen ? (
                  <p className="text-red-500 text-xs italic">
                  {formik.errors.imagen}
                </p>
              ) : null}
            </div>
          </div>
          {/* Fila */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Descripción
              </label>
              <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="descripcion"
                rows="3"
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              {formik.touched.descripcion && formik.errors.descripcion ? (
                  <p className="text-red-500 text-xs italic">
                  {formik.errors.descripcion}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex justify-end items-center w-100 border-t p-3 my-3">
            <input
              type="submit"
              className="bg-green-600 hover:bg-green-900 px-5 py-2 rounded text-white mr-1 close-modal"
              value="Agregar Nuevo Producto"
            />
          </div>
        </form>

        {/* ----------------------------------------------------------------------------------------------------------------------------- */}
      </div>
    </div>
  );
};

export default Modal;
