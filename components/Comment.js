import { TrashIcon } from "@heroicons/react/24/outline";
import {
  ChartBarIcon,
  EllipsisHorizontalIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import Moment from "react-moment";
import { LoveSvg } from "./LoveSvg";

export const Comment = ({ comment }) => {
  return (
    <div className="flex space-x-4 my-10 border-gray-200 border-b-2">
      <div className="min-w-[40px] max-h-[40px]">
        <img
          src={comment.userPic}
          alt="username"
          className="w-full rounded-full object-cover min-w-[40px] max-h-[40px]"
        />
      </div>

      <div className="min-w-[480px]">
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <h1 className="hover:font-bold font-semibold hover:underline cursor-pointer whitespace-nowrap">
              {comment.username}
            </h1>{" "}
            {/* <span className="text-sm text-gray-600 ">
              @{post.data().username}
            </span>{" "} */}
            <span className="text-sm text-gray-500">
              <Moment fromNow date={comment.createdAt?.toDate()}></Moment>
            </span>
          </div>
          <div className="">
            <EllipsisHorizontalIcon className="h-8 w-8 hover-effect p-0 hover:text-sky-600 hover:bg-sky-200" />
          </div>
        </div>
        <div className="text-gray-600 text-[15px] sm:text-[16px] mb-2">
          {comment.comment}
        </div>
        <div
          className="cursor-pointer"
          //  onClick={() => router.push(`posts/${post.id}`)}
        >
          {/* <img
            src={post.data().image}
            alt={post.id}
            className="w-full rounded-xl"
          /> */}
        </div>

        <div className="flex justify-between mt-2 mx-2 items-center">
          {/* <div className="flex items-center">
            <ChatBubbleLeftEllipsisIcon
              onClick={commentPost}
              className="max-h-11 w-11 hover-effect p-2 hover:text-sky-600 hover:bg-sky-200"
            />
            {post.data()?.commentCount}
          </div> */}
          <TrashIcon
            // onClick={deletePost}
            className="max-h-8 w-8 hover-effect p-2 hover:text-red-600 hover:bg-red-200"
          />
          {/* 
          {currentId === uid && (
            
          )} */}
          <div className="flex items-center">
            {/* {post.data()["likes"].indexOf(uid) !== -1 ? ( */}
            <LoveSvg />
            {/* ) : (
              <HeartIcon
                onClick={likePost}
                className="max-h-11 w-11 hover-effect p-2 hover:text-red-600 hover:bg-red-200"
              />
            )} */}
            {/* <span>{post.data()["likesCount"]}</span> */}
          </div>
          <ShareIcon className="max-h-8 w-8 hover-effect p-2 hover:text-sky-600 hover:bg-sky-200" />
          <ChartBarIcon className="max-h-8 w-8 hover-effect p-2 hover:text-sky-600 hover:bg-sky-200" />
        </div>
      </div>
      <div className=" w-full"></div>
    </div>
  );
};
