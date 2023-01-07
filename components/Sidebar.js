import Image from "next/image";
import { SideBarMenuItem } from "./SideBarMenuItem";
import { HomeIcon } from "@heroicons/react/24/solid";
import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
  HashtagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react";

export const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full mt-6 xl:ml-24">
      {/* Twitter logo */}
      <div className="hover-effect p-3 hover:bg-blue-100">
        <Image
          src="https://www.edigitalagency.com.au/wp-content/uploads/Twitter-logo-png.png"
          width="35"
          height="35"
          alt="This is it"
        ></Image>
      </div>
      {/* Menu */}
      <div>
        <SideBarMenuItem Icon={HomeIcon} text="Home" active />
        <SideBarMenuItem Icon={HashtagIcon} text="Explore" />
        {session && (
          <>
            <SideBarMenuItem Icon={BellIcon} text="Notifications" />
            <SideBarMenuItem Icon={BookmarkIcon} text="Boolmarks" />
            <SideBarMenuItem Icon={ClipboardIcon} text="Lists" />
            <SideBarMenuItem Icon={UserIcon} text="Profile" />
            <SideBarMenuItem Icon={EllipsisHorizontalCircleIcon} text="More" />
          </>
        )}
      </div>
      {/* Button */}
      {session ? (
        <>
          <button className="bg-blue-400 text-white w-56 h-12 rounded-full shadow-md hover:brightness-95 font-bold text-lg hidden xl:block mt-1 ">
            Tweet
          </button>
          {/* User min profile */}
          <div className="flex gap-3 items-center hover-effect justify-center xl:justify-start text-gray-700 mt-auto mb-11">
            <img
              onClick={signOut}
              className="h-10 rounded-full"
              src={session?.user?.image}
              alt="user image"
            />

            <div className="xl:flex flex-col justify-center items-center leading-5 hidden ">
              <h1 className="font-bold">{session?.user?.name}</h1>
              <span className="text-sm text-gray-500">
                @{session?.user?.username}
              </span>
            </div>
            <EllipsisHorizontalIcon className="h-7" />
          </div>
        </>
      ) : (
        <button
          onClick={signIn}
          className="bg-blue-400 text-white w-36 h-12 rounded-full shadow-md hover:brightness-95 font-bold text-lg hidden xl:block mt-1"
        >
          Sign in
        </button>
      )}
    </div>
  );
};
