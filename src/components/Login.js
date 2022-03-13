import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useUserAuth } from "../context/UserAuthContextProvider";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { logIn, googleSignIn } = useUserAuth();

  const history = useHistory();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await logIn(email, password);
      history.push("/home");
    } catch (err) {
      setError(err.message);

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const googleSignInHandler = async (e) => {
    e.preventDefault();

    try {
      await googleSignIn();
      history.push("/home");
    } catch (err) {
      setError(err.message);

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const phoneSignUpHandler = () => {};

  const passwordEyeToggler = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="h-screen align-middle box-border flex flex-col space-y-3   justify-center items-center ">
      <section className="rounded-lg shadow-xl max-w-[80%] p-4 border flex flex-col">
        <h1 className="py-2 text-4xl font-extrabold text-center ">Log In</h1>
        <h1 className="py-2 text-2xl font-bold text-center ">
          React Firebase Authentication
        </h1>
        {error && (
          <h2 className="text-red-600 text-center border-2 border-red-600 bg-red-200 px-2 py-1 mt-2 rounded-lg">
            {error}
          </h2>
        )}
        <form onSubmit={onSubmitHandler} className=" pt-8 space-y-5">
          <div className="px-4 py-2 border border-gray-400 rounded-lg">
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              className="outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="px-4 py-2  border border-gray-400 rounded-lg flex justify-between">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              className="outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            {!showPassword ? (
              <BsFillEyeFill
                className="place-self-center"
                onClick={passwordEyeToggler}
              />
            ) : (
              <BsFillEyeSlashFill
                className="place-self-center"
                onClick={passwordEyeToggler}
              />
            )}
          </div>
          <div className="px-4 py-2 rounded-lg bg-blue-600 flex justify-center hover:bg-blue-500  ">
            <button type="submit" className=" text-white">
              Log In
            </button>
          </div>
          <div className="border"></div>
          <div>
            <GoogleButton
              onClick={googleSignInHandler}
              className="min-w-full "
            />
          </div>
          <div
            onClick={phoneSignUpHandler}
            className="px-4 py-2 rounded-lg bg-green-600 flex justify-center hover:bg-green-500  "
          >
            <Link to="/phoneSignUp">
              <button className=" text-white">Sign Up with Phone Number</button>
            </Link>
          </div>
        </form>
      </section>
      <section className="rounded-lg shadow-xl max-w-[80%] p-4 border flex flex-col">
        <div className="text-base font-bold ">
          Dont't have an account ?&nbsp;
          <Link to="/signup" className="text-blue-600 underline">
            SignUp
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Login;
