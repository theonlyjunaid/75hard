"use client";
 
import React from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Client, Account } from "appwrite";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("64ee0a0bb9a1c89d9e4f");

const Home = () => {
  const router = useRouter();
  const login = async () => {
    try {
      const account = new Account(client);

      account.createOAuth2Session("google", "https://75harddays.vercel.app/tasks");
      console.log(account);
    } catch (error) {
      console.log(error);
    }
  };
  // const logout = async () => {
  //   try {
  //     const account = new Account(client);
  //     await account.deleteSession("current");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const fetchUser = async () => {
    try {
      const account = new Account(client);
      const data = await account.get();
      if (data.$id) {
        console.log("logged in");
        router.push("/tasks");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="relative w-full">
      <Navbar login={login} />
      <Hero login={login} />
      {/* <div 
className=' bg-blue-500 relative z-100 text-white p-2 cursor-pointer '
onClick={login}
>
  Login
</div>
     <div 
className=' bg-blue-500 relative z-100 text-white p-2 cursor-pointer '
onClick={logout}
>
  Logout
</div> */}
<Footer/>
    </div>
  );
};

export default Home;
