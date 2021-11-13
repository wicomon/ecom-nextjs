import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  return (
    <>
      <Head>
        <title>Tienda Virtual</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href='./css/main.front.css' rel='stylesheet'/>

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        ></link>
      </Head>

      <Header />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
