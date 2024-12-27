import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [names, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    try {
      const res = await fetch('api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ names, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        navigate('/login');
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during signup");
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-row my-16 justify-between">
        <div className="w-6/12">
          <img
            src={"/images/cart.png"}
            alt="cart image"
            className="w-full"
          />
        </div>
        <form className="flex flex-col mx-auto w-2/6 my-auto" onSubmit={handleSubmit}>
          <h1 className="text-3xl mb-2">Create account</h1>
          <p className="text-sm mb-8 text-gray-700">Enter your details below</p>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex flex-col mb-1">
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="border-b-2 w-2/4 mb-6 text-black outline-none placeholder:text-gray-400 placeholder:text-sm"
              value={names}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="border-b-2 w-2/4 mb-6 text-black outline-none placeholder:text-gray-400 placeholder:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="border-b-2 w-2/4 mb-6 text-black outline-none placeholder:text-gray-400 placeholder:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between w-6/12 items-center flex-col">
            <button className="h-12 w-full bg-red-500 rounded-sm text-white text-md" type="submit">Create account</button>
            <button className="h-11 mt-2 w-full border-2 border-gray-300 text-md flex items-center justify-center rounded-sm">
              <img src={"https://www.google.com/favicon.ico"} alt="google icon" className="w-6 mr-2" />
              Sign up with Google
            </button>
          </div>

          <div className="flex justify-between w-3/6 mt-2">
            <p className="text-sm ml-2 opacity-95">Already have an account?</p>
            <span className="text-sm border-b-2 mb-1 border-b-black mr-2">
              <Link to="/login">Log in</Link>
            </span>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;
