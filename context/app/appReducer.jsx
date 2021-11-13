import { TOGGLE_SIDEBAR, TOGGLE_CARRITO, TOGGLE_LOGIN, TOGGLE_BUSCAR, TOGGLE_TEMA, TOGGLE_MODAL,
    SUBIR_ARCHIVO, SUBIR_ARCHIVO_EXITO, SUBIR_ARCHIVO_ERROR , ELIMINAR_ARCHIVO_EXITO, ELIMINAR_ARCHIVO_ERROR,
    CREAR_PRODUCTO_EXITO, CREAR_PRODUCTO_ERROR, LIMPIAR_ALERTA_PRODUCTO, LIMPIAR_STATE_CREACION,
    LISTAR_PRODUCTOS, ELIMINAR_PRODUCTO_ERROR, ELIMINAR_PRODUCTO_EXITO, LISTAR_CATEGORIAS , OBTENER_PRODUCTO_EXITO,
    OBTENER_PRODUCTO_ERROR} 
from "../../types";

const appReducer = (state, action) => {
    switch (action.type) {

        case TOGGLE_SIDEBAR:
            return{
                ...state,
                sidebar: action.payload
            };
        case TOGGLE_CARRITO:
            return{
                ...state,
                carrito: action.payload
            };
        case TOGGLE_LOGIN:
            return{
                ...state,
                loginform: action.payload
            };
        case TOGGLE_BUSCAR:
            return{
                ...state,
                buscador: action.payload
            };
        case TOGGLE_TEMA:
            return{
                ...state,
                tema: action.payload
            };
        case TOGGLE_MODAL:
            return{
                ...state,
                modal: action.payload
            };
        case SUBIR_ARCHIVO:
            return{
                ...state,
                cargando: true
            }
        case SUBIR_ARCHIVO_EXITO:
            return{
                ...state,
                nombreimagen: action.payload,
                cargando: false
            }
        case SUBIR_ARCHIVO_ERROR:
            return{
                ...state,
                // mensaje_archivo: action.payload,
                cargando: false
            }
        case ELIMINAR_ARCHIVO_EXITO:
            return{
                ...state,
                nombreimagen: null,
                cargando: false
            }
        case ELIMINAR_ARCHIVO_ERROR:
            return{
                ...state,
                // mensaje_archivo: action.payload,
                cargando: false
            }
        case CREAR_PRODUCTO_EXITO:
            return{
                ...state,
                mensajeproducto: 'se creo producto con el id : '+action.payload.id_producto,
                cargando: true,
                nombreimagen: null,
            }
        case CREAR_PRODUCTO_ERROR:
            return{
                ...state,
                mensajeproducto: action.payload,
                cargando: false
            }
        case LIMPIAR_ALERTA_PRODUCTO:
            return{
                ...state,
                mensajeproducto: null
            };
        case LIMPIAR_STATE_CREACION:
            return{
                ...state,
                mensajeproducto: null,
                nombreimagen: null,
                cargando: false
            };
        case LISTAR_PRODUCTOS:
            return{
                ...state,
                listadoproductos: action.payload
            };
        case LISTAR_CATEGORIAS:
            return{
                ...state,
                categorias: action.payload
            };
        case OBTENER_PRODUCTO_EXITO:
            return{
                ...state,
                productoseleccionado: action.payload
            };
        case OBTENER_PRODUCTO_ERROR:
            return{
                ...state,
                productoseleccionado: null
            };
        default:
            return state;
    }
}
 
export default appReducer;