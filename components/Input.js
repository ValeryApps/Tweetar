import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/24/outline"

export const Input = () => {
  return (
    <div className="flex border-b-gray-200 border-b-2 space-x-3">
      <img className='w-11 h-11 rounded-full object-cover hover-effet hover:brightness-95' src="https://sun9-50.userapi.com/impf/c851124/v851124463/fa81e/fyT0xuM6_g8.jpg?size=1200x1600&quality=96&sign=0bb357e48181a2c07afa8b2300325fca&c_uniq_tag=DGAGBY2pkzjgR01OllP3ICt9vzKyb3hmvztgjYykF5E&type=album" alt="valery" />
      <div className="w-full divide-y divide-gray-200">
         <div className=" border-b-2 ">
            <textarea className="w-full border-none focus:ring-0 text-lg placeholder:text-gray-700 tracking-wide min-h-[50px]"  rows="3" placeholder="What's happenning"></textarea>
         </div>
         <div className="flex items-center py-2.5">
            <div className="flex items-center">
               <PhotoIcon className="w-10 h-10 hover-effet p-2 text-sky-500 hover:bg-sky-100"/>
               <FaceSmileIcon className="w-10 h-10 hover-effet p-2 text-sky-500 hover:bg-sky-100"/>
            </div>
            <button className="ml-auto bg-blue-400 text-white rounded-full px-4 py-2 font-bold shadow-md hover:brightness-95 disabled:opacity-50" disabled>Tweet</button>
         </div>
      </div>
    </div>
  )
}
