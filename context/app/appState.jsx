import { useReducer } from "react";
import { TOGGLE_SIDEBAR, TOGGLE_CARRITO, TOGGLE_LOGIN, TOGGLE_BUSCAR, TOGGLE_TEMA, TOGGLE_MODAL,
    SUBIR_ARCHIVO, SUBIR_ARCHIVO_EXITO, SUBIR_ARCHIVO_ERROR,ELIMINAR_ARCHIVO_EXITO,ELIMINAR_ARCHIVO_ERROR,
    CREAR_PRODUCTO_EXITO, CREAR_PRODUCTO_ERROR, LIMPIAR_ALERTA_PRODUCTO, LIMPIAR_STATE_CREACION,
    LISTAR_PRODUCTOS, LISTAR_CATEGORIAS, OBTENER_PRODUCTO_EXITO, OBTENER_PRODUCTO_ERROR} 
from "../../types";
import appContext from "./appContext";
import appReducer from "./appReducer";

import clienteAxios from '../../config/axios';
import tokenAuth from "../../config/tokenAuth";

const AppState = (props) => {

    const initialState = {
        sidebar: null,
        carrito: null,
        buscador: null,
        loginform: null,
        navbar: null,
        tema : 'dark',
        modal: false,
        nombreimagen: null,
        cargando: false,
        mensajeproducto: null,
        listadoproductos: null,
        productoseleccionado: null,
        categorias: null,
    }

    // definir el reducer
    const [state, dispatch] = useReducer(appReducer, initialState);

    const cambiarSidebar = (data) => {
        dispatch({
            payload: data,
            type: TOGGLE_SIDEBAR,
        });
    }
    const mostrarCarrito = (data) => {
        dispatch({
            payload: data,
            type: TOGGLE_CARRITO,
        });
    }
    const mostrarLoginform = (data) => {
        dispatch({
            payload: data,
            type: TOGGLE_LOGIN,
        });
    }
    const mostrarBuscador = (data) => {
        dispatch({
            payload: data,
            type: TOGGLE_BUSCAR,
        });
    }
    const cambiarTema = (data) => {
        dispatch({
            payload: data,
            type: TOGGLE_TEMA,
        });
    }
    const toggleModal = (data) => {
        dispatch({
            payload: data,
            type: TOGGLE_MODAL,
        });
    }
    const subirArchivo = async(formData) => {
        dispatch({
            type: SUBIR_ARCHIVO
        });
        const token = localStorage.getItem('token');
        // console.log(token);
        if (token) {
            tokenAuth(token)
        }
        try {
            const respuesta = await clienteAxios.post('/api/archivos', formData);
            // console.log(respuesta.data.archivo);
            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload:  respuesta.data.archivo
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error //.response.data
            });
        }
        delete clienteAxios.defaults.headers.common['x-token'];
        
    }
    const eliminarArchivo = async(archivo) => {
        const token = localStorage.getItem('token');
        // console.log(token);
        if (token) {
            tokenAuth(token)
        }
        try {
            const respuesta = await clienteAxios.delete(`/api/archivos/${archivo}`);
            // console.log(respuesta.data.archivo);
            dispatch({
                type: ELIMINAR_ARCHIVO_EXITO,
                payload:  respuesta.data.msg
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: ELIMINAR_ARCHIVO_ERROR,
                payload: error //.response.data
            });
        }
        delete clienteAxios.defaults.headers.common['x-token']
    }
    const crearProducto = async(data) => {
        const token = localStorage.getItem('token');
        // console.log(token);
        if (token) {
            tokenAuth(token)
        }
        try {
            const resultado = await clienteAxios.post('/api/productos', data);
            // console.log(resultado.data.msg);
            dispatch({
                type: CREAR_PRODUCTO_EXITO,
                payload: {
                    id_producto: resultado.data.id_producto,
                    msg: resultado.data.msg
                }
            })
        } catch (error) {
            dispatch({
                type: CREAR_PRODUCTO_ERROR,
                payload: error.response ? error.response.data.msg : 'No se pudo crear'
            })
        }
        delete clienteAxios.defaults.headers.common['x-token'];
        setTimeout(() =>{
            dispatch({
                type: LIMPIAR_ALERTA_PRODUCTO
            })
            dispatch({
                type: LIMPIAR_STATE_CREACION
            });
        }, 3000)
    }

    const obtenerProducto = async(id) =>{
        const token = localStorage.getItem("token");
        // console.log(token);
        if (token) {
            tokenAuth(token);
        }
        try {
            const resultado = await clienteAxios.get(`/api/productos/${id}`);
            // console.log(resultado.data.results[0]);
            dispatch({
                type: OBTENER_PRODUCTO_EXITO,
                payload:  resultado.data.results[0]
            });
        } catch (error) {
            console.log(error);
                dispatch({
                    type: OBTENER_PRODUCTO_ERROR,
                    payload: error //.response.data
                });
        }
        delete clienteAxios.defaults.headers.common["x-token"];
    }

    const obtenerProductos = async() =>{
        const token = localStorage.getItem('token');
        // console.log(token);
        if (token) {
            tokenAuth(token)
        }
        try {
            const resultado = await clienteAxios.get('/api/productos');
            // console.log(resultado.data);
            dispatch({
                type: LISTAR_PRODUCTOS,
                payload: resultado.data.results
            })
        } catch (error) {
            console.log(error.response.data);
        }
        delete clienteAxios.defaults.headers.common['x-token']
    }

    const obtenerCategorias = async() =>{
        const token = localStorage.getItem('token');
        // console.log(token);
        if (token) {
            tokenAuth(token)
        }
        try {
            const resultado = await clienteAxios.get('/api/categorias');
            // console.log(resultado.data);
            dispatch({
                type: LISTAR_CATEGORIAS,
                payload: resultado.data.results
            })
        } catch (error) {
            console.log(error.response.data);
        }
        delete clienteAxios.defaults.headers.common['x-token']
    }


    return (
        <appContext.Provider
            value={{
                sidebar: state.sidebar,
                carrito: state.carrito,
                buscador: state.buscador,
                loginform: state.loginform,
                navbar: state.navbar,
                tema: state.tema,
                modal : state.modal,
                nombreimagen: state.nombreimagen,
                cargando: state.cargando,
                mensajeproducto: state.mensajeproducto,
                listadoproductos: state.listadoproductos,
                categorias: state.categorias,
                productoseleccionado: state.productoseleccionado,
                cambiarSidebar,
                mostrarCarrito,
                mostrarLoginform,
                mostrarBuscador,
                cambiarTema,
                toggleModal,
                subirArchivo,
                eliminarArchivo,
                crearProducto,
                obtenerProducto,
                obtenerProductos,
                obtenerCategorias
            }}
        >
            {props.children}
        </appContext.Provider>
    );
}
 
export default AppState;
