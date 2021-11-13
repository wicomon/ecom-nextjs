import { useContext, useEffect, useRef } from "react";
import appContext from "../../context/app/appContext";

const LoginForm = () => {

    const AppContext = useContext(appContext);
    const { mostrarLoginform } = AppContext;

    // console.log(sidebar);
  const loginformRef = useRef();

  useEffect(() => {
    if (loginformRef) {
        mostrarLoginform(loginformRef.current);
        // console.log(loginformRef.current);
    }
  }, [loginformRef]);

    return (
        <form action="" className="login-form" ref={loginformRef}>
                <h3>login form</h3>
                <input type="email" placeholder="enter your email" className="box" />
                <input type="password" placeholder="enter your password" className="box" />
                <div className="remember">
                    <input type="checkbox" name="" id="remember-me" />
                    <label htmlFor="remember-me">remember me</label>
                </div>
                <input type="submit" value="login now" className="btn" />
                <p>forget password? <a href="#">click here</a></p>
                <p>don't have an account? <a href="#">create one</a></p>
            </form>
    );
}
 
export default LoginForm;