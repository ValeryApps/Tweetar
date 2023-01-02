import Image from 'next/image'
import { SideBarMenuItem } from './SideBarMenuItem'
import {HomeIcon } from '@heroicons/react/24/solid'
import {BellIcon, BookmarkIcon, ClipboardIcon, EllipsisHorizontalCircleIcon, EllipsisHorizontalIcon, HashtagIcon, UserIcon} from '@heroicons/react/24/outline'


export const Sidebar = () => {
  return (
   <div className='hidden sm:flex flex-col p-2 xl:items-start fixed h-full mt-6'>
      {/* Twitter logo */}
      <div className='hover-effet p-3 hover:bg-blue-100'>
         <Image src="https://www.edigitalagency.com.au/wp-content/uploads/Twitter-logo-png.png" width='35' height='35'></Image>
      </div>
      {/* Menu */}
      <div>
         <SideBarMenuItem Icon={HomeIcon} text="Home" active/>
         <SideBarMenuItem Icon={HashtagIcon} text="Explore"/>
         <SideBarMenuItem Icon={BellIcon} text="Notifications"/>
         <SideBarMenuItem Icon={BookmarkIcon} text="Boolmarks"/>
         <SideBarMenuItem Icon={ClipboardIcon} text="Lists"/>
         <SideBarMenuItem Icon={UserIcon} text="Profile"/>
         <SideBarMenuItem Icon={EllipsisHorizontalCircleIcon} text="More"/>
      </div>
      {/* Button */}
      <button className='bg-blue-400 text-white w-56 h-12 rounded-full shadow-md hover:brightness-95 font-bold text-lg hidden xl:block mt-1'>Tweet</button>
      {/* User min profile */}
      <div className="flex gap-3 items-center hover-effet justify-center xl:justify-start text-gray-700 mt-auto">

            <img className="h-10 rounded-full" src="https://avatars.githubusercontent.com/u/40743049?v=4" alt="user image" />

         <div className="xl:flex flex-col justify-center items-center leading-5 hidden ">
            <h1 className="font-bold">Valery Guhena</h1>
            <span className="text-sm text-gray-500">@valeryguhena</span>
         </div>
         <EllipsisHorizontalIcon className='h-7'/>
      </div>
   </div> 
  )
}
