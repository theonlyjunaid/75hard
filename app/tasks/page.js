"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageNav from "../components/PageNav";
import { Client, Account, Databases, Query, ID } from "appwrite";
import Challenge from "../components/Challenge";
import UserCard from "../components/UserCard";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("64ee0a0bb9a1c89d9e4f");

const Page = () => {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(0);
  const [tasks, setTasks] = useState([]);
const [completed, setCompleted] = useState(0)
const compe = (num) => {
  if(num==="Pending"){
    setCompleted((prev)=>prev+0.5)
  }else if(num==="Completed"){
    setCompleted((prev)=>prev+1)

  }
}

  const router = useRouter();
  const fetchData = async (email) => {
    try {
      const databases = new Databases(client);

      const result = databases.listDocuments(
        "64ee24e2db24b58f528e",
        "64ee24faaea81643cfac",
        [Query.equal("email", [email]),
        Query.limit(75),
      ],
      );

      result.then(
        function (response) {
          console.log(response);
          setTasks(response.documents);
          for (const item of response.documents) {
            compe(item["BALANCED_DIET"])
            compe(item["3_LITERS_OF_WATER_PER_DAY"])
            compe(item["EXERCISE_45-Minutes"])
            compe(item["WALK_45-Minutes"])
            compe(item["10_PAGES_OF_ANY_BOOK_EVERYDAY"])
            compe(item["DOCUMENT_EVERYTHING"])
          }
        },
        function (error) {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUser = async () => {
    try {
      const account = new Account(client);
      const data = await account.get();
      setUser(data);
      fetchData(data.email);
      console.log(data);
    } catch (error) {
      console.log(error);
      router.push("/");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  const logout = async () => {
    try {
      console.log("logout");
      const account = new Account(client);

      await account.deleteSession("current");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const createDoc = async () => {
    try {
      const databases = new Databases(client);
      for (let i = 1; i <= 75; i++) {
        const result = await databases.createDocument(
          "64ee24e2db24b58f528e",
          "64ee24faaea81643cfac",
          ID.unique(),

          {
            title: user?.name,
            Date: new Date(Date.now() + 3600 * 1000 * 24 * i).toLocaleString(
              "en-US",
              "Asia/Delhi"
            ),
            email: user?.email,
            day: i,
          }
        );
        console.log(result);
        //   result.then(function (response) {
        //       console.log(response);
        //    }, function (error) {
        //       console.log(error);
        //    });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <PageNav logout={logout} />
<UserCard user={user} tasks={tasks} completed={completed}/>
      <div className="container p-5 md:p-10 mx-auto">
        {tasks.map((task, index) => (
          <Challenge key={index} task={task} show={show} setShow={setShow} client={client} compe={compe} />
        ))}
      </div>
      {tasks.length == 0 ? (
        <div
          onClick={createDoc}
          className="bg-gray-900 hover:bg-gray-700 px-5 mx-5 md:mx-10 flex justify-center py-2 rounded-md text-white"
        >
          Start Your Challenge Now
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Page;
