const Footer = () => {
    return (
        <>
            <section className="footer">

                <div className="box-container">

                    <div className="box">
                        <h3>quick links</h3>
                        <a href="home.html"> <i className="fas fa-arrow-right"></i> home</a>
                        <a href="shop.html"> <i className="fas fa-arrow-right"></i> shop</a>
                        <a href="about.html"> <i className="fas fa-arrow-right"></i> about</a>
                        <a href="review.html"> <i className="fas fa-arrow-right"></i> review</a>
                        <a href="blog.html"> <i className="fas fa-arrow-right"></i> blog</a>
                        <a href="contact.html"> <i className="fas fa-arrow-right"></i> contact</a>
                    </div>

                    <div className="box">
                        <h3>extra links</h3>
                        <a href="#"> <i className="fas fa-arrow-right"></i> my order </a>
                        <a href="#"> <i className="fas fa-arrow-right"></i> my favorite </a>
                        <a href="#"> <i className="fas fa-arrow-right"></i> my wishlist </a>
                        <a href="#"> <i className="fas fa-arrow-right"></i> my account </a>
                        <a href="#"> <i className="fas fa-arrow-right"></i> terms or use </a>
                    </div>

                    <div className="box">
                        <h3>follow us</h3>
                        <a href="#"> <i className="fab fa-facebook-f"></i> facebook </a>
                        <a href="#"> <i className="fab fa-twitter"></i> twitter </a>
                        <a href="#"> <i className="fab fa-instagram"></i> instagram </a>
                        <a href="#"> <i className="fab fa-linkedin"></i> linkedin </a>
                        {/* <a href="#"> <i className="fab fa-pinterest"></i> pinterest </a> */}
                    </div>

                    <div className="box">
                        <h3>newsletter</h3>
                        <p>subscribe for latest updates</p>
                        <form action="">
                            <input type="email" placeholder="enter your email" />
                            <input type="submit" value="subscribe" className="btn" />
                        </form>
                        <img src="image/payment.png" className="payment" alt="" />
                    </div>

                </div>

            </section>

            <section className="credit">Creado por Williams Cordova Villalva | Todos los derechos reservados </section>
            <script src="js/script.js"></script>
        </>
    );
}

export default Footer;