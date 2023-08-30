import React, { useState } from 'react'
import Link from 'next/link'
import { Client, Account, Databases, Query, ID } from "appwrite";

const Challenge = ({ task, show, setShow ,client,compe}) => {
    const [saving, setSaving] = useState(false)
    const [thisTask, setThisTask] = useState(task)
    const Show = (e) => {
        // if (e === show) {
        //     setShow(0)
        // } else {
        if (show !== e) { setShow(e) }
        // }
    }
    const sShow = (e) => {
        if (e === show) {
            setShow(0)
        } else {

            setShow(e)
        }
        console.log(show)
    }
    const handleComplete = (taskToDo, status) => {
        // console.log(e.target.checked)
        // console.log(item)
        setThisTask({ ...thisTask, [taskToDo]: status })
    }
console.log(thisTask.$id)
    const handleSave = () => {
        setSaving(true)
        console.log(thisTask)
        const databases = new Databases(client);

        const result = databases.updateDocument(
            "64ee24e2db24b58f528e",
            "64ee24faaea81643cfac",
            thisTask.$id,
            {
                "BALANCED_DIET": thisTask["BALANCED_DIET"],
                "3_LITERS_OF_WATER_PER_DAY": thisTask["3_LITERS_OF_WATER_PER_DAY"],
                "EXERCISE_45-Minutes": thisTask["EXERCISE_45-Minutes"],
                "WALK_45-Minutes": thisTask["WALK_45-Minutes"],
                "10_PAGES_OF_ANY_BOOK_EVERYDAY": thisTask["10_PAGES_OF_ANY_BOOK_EVERYDAY"],
                "DOCUMENT_EVERYTHING": thisTask["DOCUMENT_EVERYTHING"]
            }
          );
          result.then((res)=>{
                console.log(res)
                setSaving(false)
            })

          console.log(result)
    }


    const tasksToDo = ["BALANCED_DIET", "3_LITERS_OF_WATER_PER_DAY", "EXERCISE_45-Minutes", "WALK_45-Minutes", "10_PAGES_OF_ANY_BOOK_EVERYDAY", "DOCUMENT_EVERYTHING"]

    return (
        <div>
            {/* <pre>
            {JSON.stringify(task, null, 2)}
        </pre> */}
            <section className="relative  bg-white overflow-hidden mx-auto flex justify-center" id=''>

                <div className="relative z-10 container px-4 mx-auto">
                    <div className="md:max-w-4xl mx-auto">

                        <div className=" mb-2 md:mb-5 flex flex-wrap -m-1">
                            <div className="w-full p-1">
                                <>
                                    <div className={`py-7 px-8 bg-white bg-opacity-60 border-2 ${show === thisTask.day ? "transform border-indigo-600" : "transform"} duration-300 rounded-2xl shadow-10xl`} onClick={
                                        () => {
                                            Show(thisTask.day)
                                        }
                                    } >
                                        <div className="flex flex-wrap justify-between -m-2">
                                            <div className="flex-1 p-2">
                                                <h3 className="mb-4 text-lg font-semibold leading-normal">
                                                    Day    {thisTask.day}
                                                </h3>
                                                {show === thisTask.day && <div className=" ">
                                                    {tasksToDo.map((taskToDo, index) => {
                                                        return (
                                                            <div className='flex flex-wrap md:gap-10 gap-2 mt-5' key={index}>
                                                                <h3>
                                                                    {taskToDo.split("_").join(" ")}
                                                                </h3>
                                                                <ul className='flex flex-wrap md:justify-end ml-auto gap-1 md:gap-5'>
                                                                    <li>
                                                                        <div className="flex">
                                                                            <input
                                                                                type="checkbox"

                                                                                className="h-6 w-6 text-green-500 rounded-md border-4 border-green-200 focus:ring-0 transition duration-75 ease-in-out transform hover:scale-100"
                                                                                checked={thisTask[taskToDo] === 'notStarted' ? true : false}
                                                                                onChange={(e) => handleComplete(taskToDo, 'notStarted')}
                                                                            />
                                                                            <div
                                                                                className={`capitalize ml-3 text-md font-medium `}
                                                                            >
                                                                                Not Started
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="flex">
                                                                            <input
                                                                                type="checkbox"
                                                                                className="h-6 w-6 text-green-500 rounded-md border-4 border-green-200 focus:ring-0 transition duration-75 ease-in-out transform hover:scale-100"
                                                                                //   checked={item['isComplete']}
                                                                                checked={thisTask[taskToDo] === 'Pending' ? true : false}
                                                                                onChange={(e) => handleComplete(taskToDo, 'Pending')}

                                                                            //   onChange={(e) => handleComplete(e, item)}
                                                                            />
                                                                            <div
                                                                                className={`capitalize ml-3 text-md font-medium `}
                                                                            >
                                                                                Pending
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="flex">
                                                                            <input
                                                                                type="checkbox"
                                                                                className="h-6 w-6 text-green-500 rounded-md border-4 border-green-200 focus:ring-0 transition duration-75 ease-in-out transform hover:scale-100"
                                                                                //   checked={item['isComplete']}
                                                                                checked={thisTask[taskToDo] === 'Completed' ? true : false}
                                                                                onChange={(e) => handleComplete(taskToDo, 'Completed')}

                                                                            //   onChange={(e) => handleComplete(e, item)}
                                                                            />
                                                                            <div
                                                                                className={`capitalize ml-3 text-md font-medium `}
                                                                            >
                                                                                Completed
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        )

                                                    }
                                                    )}
                                                    <button className={`bg-gray-900 hover:bg-gray-800 rounded-lg px-5 py-2 text-white mt-5 flex justify-end ml-auto ${saving?"bg-gray-400 hover:bg-slate-400":""}`} onClick={handleSave}>
                                                       {!saving? "Save Changes":"Saving..."}
                                                    </button>
                                                </div>
                                                }

                                            </div>

                                            <div className="w-auto p-2 h-max " onClick={() => { sShow(0) }}>
                                                <svg
                                                    className={`relative top-1 duration-300 ${show === thisTask.day ? "" : "transform rotate-180"}`}
                                                    width={20}
                                                    height={20}
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M4.16732 12.5L10.0007 6.66667L15.834 12.5"
                                                        stroke={show === thisTask.day ? "#4F46E5" : " #18181B"}
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Challenge