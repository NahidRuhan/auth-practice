/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


const Register = () => {
  const [error, setError] = useState(null);
  const [show,setShow] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value
    const photo = e.target.photo.value
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    else if(!/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/.test(password)){
        setError("Password should have at least 1 uppercase and at least 1 special character");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        toast("Register successful");
        updateProfile(user, {
            displayName: name, 
            photoURL: photo,
        })
        .then( () => console.log('profile updated'))
        .catch()
        sendEmailVerification(user)
  .then(() => {

    toast("Check Email for Verification");

  });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const errorObj = {
          code: errorCode,
          msg: errorMessage,
        };
        setError(errorObj);
      });
  };
  return (
    <div className="py-10">
      <h2 className="text-3xl my-10 text-center">Please register</h2>
      <form onSubmit={handleRegister} className="md:w-3/4 lg:w-1/2 mx-auto">

        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            name="name"
            type="text"
            placeholder="name"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            name="photo"
            type="text"
            placeholder="photo"
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
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
    type={show?"text":"password"}
    placeholder="password"
    className="input input-bordered w-full"
    required
  />
  <p onClick={()=> setShow(!show)} className="absolute right-2 top-0 bottom-0 hover:cursor-pointer inline-flex items-center">{show ?(<FaRegEyeSlash />):(<FaRegEye />)}</p>
</div>

        </div>
        <div className="flex gap-3">
          <input
            name="terms"
            type="checkbox"
            required
          />
            <label className="label">
            <span className="label-text">Accept our terms</span>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
      </form>
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

      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link className="text-blue-700 font-bold" to="/login">
          Please login
        </Link>
      </p>
    </div>
  );
};

export default Register;
