import clienteAxios from "./axios";


const tokenAuth = (token) => {
    if (token) {
        // clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        clienteAxios.defaults.headers.common['x-token'] = token;
    }else{
        delete clienteAxios.defaults.headers.common['x-token'];
    }
}

export default tokenAuth;