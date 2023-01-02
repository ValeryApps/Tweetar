import {
  ChatBubbleLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ChartBarIcon, ShareIcon } from "@heroicons/react/24/solid";

export const Post = ({ post }) => {
  return (
    <div className="flex space-x-4 my-10 ">
      <div className="min-w-[60px] max-h-[50px] ">
        <img
          src={post.userImage}
          alt="username"
          className="w-full rounded-full object-cover min-w-[60px] max-h-[60px]"
        />
      </div>

      <div className="min-w-[490px]">
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <h1 className="hover:font-bold font-semibold hover:underline cursor-pointer whitespace-nowrap">{post.name}</h1> <span className="text-sm text-gray-600 ">{post.username}</span>{" "}
            <span className="text-sm text-gray-500">{post.timestamp}</span>
          </div>
          <div className="">
            <EllipsisHorizontalIcon className="h-12 w-12 hover-effet p-0 hover:text-sky-600 hover:bg-sky-200" />
          </div>
        </div>
        <div className="text-gray-600 text-[15px] sm:text-[16px] mb-2">{post.text}</div>
        <div className="">
          <img src={post.img} alt={post.id} className="w-full" />
        </div>

        <div className="flex justify-between mt-2 mx-2 items-center">
          <ChatBubbleLeftEllipsisIcon
            EllipsisHorizontalIcon
            className="max-h-11 w-11 hover-effet p-2 hover:text-sky-600 hover:bg-sky-200"
          />
          <TrashIcon
            EllipsisHorizontalIcon
            className="max-h-11 w-11 hover-effet p-2 hover:text-sky-600 hover:bg-sky-200"
          />
          <            HeartIcon
            className="max-h-11 w-11 hover-effet p-2 hover:text-sky-600 hover:bg-sky-200"
          />
          <            ShareIcon
            className="max-h-11 w-11 hover-effet p-2 hover:text-sky-600 hover:bg-sky-200"
          />
          <            ChartBarIcon
            className="max-h-11 w-11 hover-effet p-2 hover:text-sky-600 hover:bg-sky-200"
          />
        </div>
      </div>
    </div>
  );
};
