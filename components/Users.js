

export const Users = ({user}) => {
  
   return (
      <div className="flex items-center p-3 hover:bg-gray-200 cursor-pointer">
     <img src={user.picture.thumbnail} alt="" className="rounded-full cursor-pointer" />
     <div className="ml-4 leading-5 truncate">
     <h1 className="text-sm font-bold text-gray-600 truncate hover:underline cursor-pointer">{user.login.username}</h1>
     <h1 className="text-xs text-gray-400 ">{user.name.first} {user.name.last}</h1>
     </div>
     <button className="bg-sky-500 text-white px-4 py-1.5 rounded-full hover:bg-sky-800 font-bold transition duration-500 ml-auto">Follow</button>
     </div>
   )
 }
 