import { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import { USUARIO_AUTENTICADO, REGISTRO_EXITOSO, REGISTRO_ERROR, LIMPIAR_ALERTA,
    LOGIN_EXITOSO, LOGIN_ERROR, CERRAR_SESION, TOGGLE_SIDEBAR } from "../../types";

import clienteAxios from '../../config/axios';
import tokenAuth from "../../config/tokenAuth";

const AuthState = (props) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
    const initialState = {
        token : token,
        autenticado : null,
        usuario : null,
        mensaje: null,
        sesionterminada: false,
    }

    // definir el reducer
    const [state, dispatch] = useReducer(authReducer, initialState);

    // autenticar usuarios
    const iniciarSesion = async(datos) =>{
        // console.log(datos);
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            // console.log(respuesta.data);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            });
        } catch (error) {
            // console.log(error.response.data.msg);
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response ? error.response.data.msg : 'Hubo un error'
            });
        }
        // Limpiar alerta
        setTimeout(() =>{
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000)
        
    }

    // usuario autenticado
    const usuarioAutenticado = async () =>{
        const token = localStorage.getItem('token');
        // console.log(token);
        if (token) {
            tokenAuth(token)
        }
        try {
            const respuesta = await clienteAxios.get('/api/auth');
            // console.log(respuesta);
            if (respuesta.data.usuario) {
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: respuesta.data.usuario
                });
                delete clienteAxios.defaults.headers.common['x-token']
            }
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response ? error.response.data.msg : 'Hubo un error'
            });
        }
        setTimeout(() =>{
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000)
    }

    
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION,
        });
        dispatch({
            type: LIMPIAR_ALERTA
        })
    }

    return (
        <authContext.Provider
            value={{
                token : state.token,
                autenticado : state.autenticado,
                usuario : state.usuario,
                mensaje: state.mensaje,
                sesionterminada: state.sesionterminada,
                usuarioAutenticado,
                iniciarSesion,
                cerrarSesion,
            }}
        >
            {props.children}
        </authContext.Provider>
    );
}
 
export default AuthState;
