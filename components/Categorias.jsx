import Link from "next/link";

const Categorias = () => {
    return (
        <>
            <div className="heading">
                <h1>Nuestra Tienda</h1>
                <p> <Link href="/"><a>Inicio </a>
                    </Link> Comprar </p>
            </div>

            <section className="category">

                <h1 className="title"> our <span>category</span> <a href="#">view all </a> </h1>

                <div className="box-container">

                    <a href="#" className="box">
                        <img src="image/cat-1.png" alt="" />
                        <h3>fresh fruits</h3>
                    </a>

                    <a href="#" className="box">
                        <img src="image/cat-2.png" alt="" />
                        <h3>vegetables</h3>
                    </a>

                    <a href="#" className="box">
                        <img src="image/cat-3.png" alt="" />
                        <h3>organic spices</h3>
                    </a>

                    <a href="#" className="box">
                        <img src="image/cat-4.png" alt="" />
                        <h3>fresh meat</h3>
                    </a>

                    <a href="#" className="box">
                        <img src="image/cat-5.png" alt="" />
                        <h3>organic wheat</h3>
                    </a>

                </div>

            </section>
        </>
    );
}

export default Categorias;