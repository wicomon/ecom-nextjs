import Head from "next/head";
import FooterAdm from "./Footer";
import HeaderAdm from "./Header";
import SidebarAdm from "./Sidebar";
import 'tailwindcss/tailwind.css';
import { useContext, useEffect } from "react";
import appContext from "../../context/app/appContext";
import authContext from "../../context/auth/authContext";
import { useRouter } from "next/router";
import Spinner from '../ui/Spinner';

const LayoutAdm = (props) => {

  const AppContext = useContext(appContext);
  const { tema } = AppContext;
  const AuthContext = useContext(authContext);
  const { usuarioAutenticado, usuario, autenticado, sesionterminada} = AuthContext;

  // next router
  const router = useRouter();
  
  useEffect(() => {
    usuarioAutenticado();
    // console.log('autentidaco : '+autenticado);
    // console.log('sesionterminada : '+sesionterminada);
    if (!autenticado && sesionterminada) {
          router.push('/admin')
    }
  }, [autenticado, sesionterminada]);

  
  if(!usuario) return <Spinner />;

  return (
    <>
      <Head>
        <title>Administración</title>

        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Head>
      {autenticado && usuario ? 
        <div className={`flex ${tema} ${tema=='dark' ? 'bg-gray-800' : 'bg-white'} `}>
        <SidebarAdm />

        <div className="w-full h-screen flex flex-col">
          <HeaderAdm />
          <div className="flex-grow bg-gray-50 dark:bg-gray-900  px-5 pt-5 overflow-auto">
            <div className="container mx-auto">
              {props.children}
            </div>
            
            </div>
          {/* <FooterAdm /> */}
        </div>
      </div>
      : <Spinner />}
    </>
  );
};

export default LayoutAdm;
