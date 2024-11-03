import React, { useDebugValue, useState } from "react";

const Login = () => {
  const [state, setState] = useState("signup");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  console.log(name);
  return (
    <form action="" className="min-h-[80vh] flex items-center ">
      <div className="flex flex-col gap-3 m-auto items-start border p-8 min-w-[340px] sm:min-w-96 rounded-xl text-zinc-600 text-sm shadow-lg ">
        <p className="text-2xl  font-semibold">Create Account</p>
        <p
          className=""
          onClick={() => {
            state === "signup" ? setState("Login") : setState("signup");
          }}
        >
          Please {state === "signup" ? "signup" : "Login"} up to book
          appointment{" "}
        </p>

       {
       state==="signup"&& 
          <div className="w-full">
          <p>Full Name</p>
          <input
            className="border border-zinc-300 rounded w-full p-2  mt-1 "
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>}
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2  mt-1 "
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2  mt-1 "
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md  text-base ">
          {state === "signup" ? "Create account" : " Login"}
        </button>
        {state === "signup" ? (
          <p>
            Already have an account?
            <span className="text-primary underline mt-4 cursor-pointer" onClick={()=>setState("login")}> Login here</span>
          </p>
        ) : (
          <p>
            Create an new account?
            <span className="text-primary underline mt-4 cursor-pointer" onClick={()=>setState("signup")}> Click here</span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
