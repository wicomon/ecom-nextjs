import Banners from "../components/Banners";
import Layout from "../components/Layout";
import Main from "../components/Main";
import Productos from "../components/Productos";

export default function Home() {
  
  return (
    <Layout>
      <Main />
      <Banners />
      <Productos />
    </Layout>
  )
}
