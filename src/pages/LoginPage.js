import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, provider, twitterProvider, facebookProvider } from "../fireConfig";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import {LiaGoogle, LiaFacebookF, LiaTwitter} from "react-icons/lia";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const login = async () => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("currentUser", JSON.stringify(result));
      setLoading(false);
      toast.success("Login successful");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const signInWithTwitter = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, twitterProvider);
      console.log(result);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const signInWithFacebook = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, facebookProvider);
      console.log(result);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="login-parent">
      {loading && <Loader />}
      <div className="row justify-content-center">
        <div className="col-md-4 z1">
          <div className="login-form">
            <h2>Login</h2>

            <hr />

            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button className="my-3" onClick={login}>
              Login
            </button>
            <p>--- or ---</p>
            <hr />
            <button className="rounded-button my-1" onClick={signInWithGoogle}><LiaGoogle/>
            Sign in with Google
            </button><br/>
            <button className="rounded-button my-1" onClick={signInWithTwitter}><LiaFacebookF/>Sign in with Twitter</button>
            <button className="rounded-button my-1" onClick={signInWithFacebook}><LiaTwitter/>Sign in with Facebook</button>
            <hr />
            <Link to="/register">Click Here To Register</Link>
          </div>
        </div>
        <div className="col-md-5 z1">
          <lottie-player
            src="https://assets7.lottiefiles.com/packages/lf20_yr6zz3wv.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>

      <div className="login-bottom"></div>

      <style>{`
        .rounded-button {
          border-radius: 25px;
        }
      `}</style>
    </div>
  );
}

export default LoginPage;
