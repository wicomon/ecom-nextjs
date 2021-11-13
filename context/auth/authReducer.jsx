import { USUARIO_AUTENTICADO, REGISTRO_EXITOSO, REGISTRO_ERROR, LIMPIAR_ALERTA,
    LOGIN_EXITOSO, LOGIN_ERROR, CERRAR_SESION, TOGGLE_SIDEBAR } from "../../types";

const authReducer = (state, action) => {
    switch (action.type) {
        case REGISTRO_ERROR:
        case LOGIN_ERROR:
            // localStorage.removeItem('token');
            return{
                ...state,
                mensaje: action.payload,
                sesionterminada: true,
                // token: null,
            };
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload);
            return{
                ...state,
                token: action.payload,
                autenticado: true,
                sesionterminada: false,
            };
        case USUARIO_AUTENTICADO:
            return{
                ...state,
                usuario: action.payload,
                autenticado: true
            };
        case CERRAR_SESION:
            localStorage.removeItem('token');
            return{
                ...state,
                usuario: null,
                token: null,
                autenticado: null,
                sesionterminada: true,
            };
        case LIMPIAR_ALERTA:
            return{
                ...state,
                mensaje: null
            };
        case TOGGLE_SIDEBAR:
            return{
                ...state,
                sidebar: action.payload
            };
        default:
            return state;
    }
}
 
export default authReducer;