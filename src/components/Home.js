import React from "react";
import { useUserAuth } from "../context/UserAuthContextProvider";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { user, logOut } = useUserAuth();
  const history = useHistory();

  const logOutHandler = async (e) => {
    e.preventDefault();
    try {
      await logOut();
      history.push("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="h-screen align-middle box-border flex  justify-center items-center ">
      <section className="rounded-lg shadow-xl max-w-[80%] p-4 border flex flex-col">
        <h1 className="py-2 text-2xl font-bold text-center ">
          React Firebase Authentication
        </h1>
        {user && (
          <h2 className="py-2 text-xl font-bold text-center ">{user.email}</h2>
        )}

        <h2 className="py-2 font-bold text-center ">
          You have successfully logged in.
        </h2>
        <div className="px-4 py-2 rounded-lg bg-blue-600 flex justify-center hover:bg-blue-500  ">
          <button onClick={logOutHandler} className=" text-white">
            Log Out
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
