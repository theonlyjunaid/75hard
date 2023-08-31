import React from 'react'

const UserCard = ({user,tasks,completed}) => {

  return (
    <>
    <div className='container  flex justify-center mx-auto'>
        <div className='my-3 md:my-5 md:text-xl'>
Hey, {user?.name.split(" ")[0]} you are doing great!. Keep it up!
        </div>
     

    </div>
    {/* <div className='w-4/5 md:w-1/2 mx-auto container text-center'>
    <div className=" bg-gray-300 rounded-full mb-2 ">
  <div
    className="bg-blue-600 text-xs  font-medium text-blue-100 text-center p-2 leading-none rounded-full"
    style={{ width: completed/tasks.length+'%' }}
  />

</div>
<div>
  
  </div>
    </div>
 <div className=' text-center md:mx-10 mx-5'>
  <span className='font-semibold'>{parseFloat(completed/tasks.length).toFixed(3)+'%'}</span>  of your chalenge tasks are completed
  </div>   */}
  
    </>
  )
}

export default UserCard