/* eslint-disable no-unused-vars */
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

import { Link } from "react-router-dom";
import {
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [forgetEmail, setForgetEmail] = useState("");
  const [user,setUser] = useState(null);

  console.log(forgetEmail);

  const provider = new GoogleAuthProvider();


  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {

        if (result.user.emailVerified) {
          toast("Login successful");
        } else {
          toast("Please verify your email");
          console.log(result.user)
          sendEmailVerification(result.user).then(() => {
            toast("Check Email for Verification");
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  const handleReset = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, forgetEmail)
      .then(() => {
        toast("Password reset email sent successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
    .then( result => {

        const user = result.user;
        console.log(user);
        setUser(user);
        
      })

    .catch( error => {
        console.log(error.message);
      });
}

const handleGoogleSignOut = () => {
    signOut(auth)
    .then( result => {

        console.log(result);
        setUser(null);
        
      })

    .catch( error => {
        console.log(error.message);
      });
}

  return (
    <div>
      <h2 className="text-3xl my-10 text-center">Please login</h2>
      <form onSubmit={handleLogin} className="md:w-3/4 lg:w-1/2 mx-auto">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            onChange={(e) => setForgetEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <div className="flex items-center relative">
            <input
              name="password"
              type={show ? "text" : "password"}
              placeholder="password"
              className="input input-bordered w-full"
              required
            />
            <p
              onClick={() => setShow(!show)}
              className="absolute right-2 top-0 bottom-0 hover:cursor-pointer inline-flex items-center"
            >
              {show ? <FaRegEyeSlash /> : <FaRegEye />}
            </p>
          </div>
          <label className="label">
            <p onClick={handleReset} className="label-text-alt link link-hover">
              Forgot password?
            </p>
          </label>
        </div>

        {typeof error == "object" && (
          <div className="flex flex-col justify-center text-center gap-2 py-3 text-red-500">
            <p>{error?.code}</p>
            <p>{error?.msg}</p>
          </div>
        )}
        {typeof error == "string" && (
          <p className="flex flex-col justify-center text-center gap-2 py-3 text-red-500">
            {error}
          </p>
        )}

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
      <div className="flex justify-center pt-10 gap-10">

<button onClick={handleGoogleSignIn} className="btn btn-primary">Google Login</button>
<button onClick={handleGoogleSignOut} className="btn btn-primary">Google Logout</button>

</div>
      <p className="text-center mt-4">
        Don&apos;t have an account?{" "}
        <Link className="text-blue-700 font-bold" to="/register">
          Please register
        </Link>
      </p>
    </div>
  );
};

export default Login;
