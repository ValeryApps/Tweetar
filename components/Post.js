import {
  ChatBubbleLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { ChartBarIcon, ShareIcon } from "@heroicons/react/24/solid";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";
import Moment from "react-moment";
import { db, storage } from "../firebase";
import { signIn, useSession } from "next-auth/react";
import { LoveSvg } from "./LoveSvg";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalState";

export const Post = ({ post }) => {
  const { data: session } = useSession();
  const uid = session?.user.uid;
  const currentId = post.data().userId;

  const [open, setOpen] = useRecoilState(modalState);

  const likePost = async () => {
    if (session === null) {
      await signIn();
    } else {
      console.log(post.data()["likes"].indexOf(uid) !== -1);
      if (post.data()["likes"].indexOf(uid) !== -1) {
        await updateDoc(doc(db, "posts", post.id), {
          likes: arrayRemove(uid),
          likesCount: increment(-1),
        });
      } else {
        await updateDoc(doc(db, "posts", post.id), {
          likes: arrayUnion(uid),
          likesCount: increment(1),
        });
      }
    }
  };

  const deletePost = async () => {
    if (currentId !== uid) {
      return;
    }
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deleteDoc(doc(db, "posts", post.id));
      if (post.data().image) {
        await deleteObject(ref(storage, `posts/${post.id}/images`));
      }
    }
  };
  return (
    <div className="flex space-x-4 my-10 ">
      <div className="min-w-[60px] max-h-[50px] ">
        <img
          src={post.data().userPicture}
          alt="username"
          className="w-full rounded-full object-cover min-w-[60px] max-h-[60px]"
        />
      </div>

      <div className="min-w-[490px]">
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <h1 className="hover:font-bold font-semibold hover:underline cursor-pointer whitespace-nowrap">
              {post.data().name}
            </h1>{" "}
            <span className="text-sm text-gray-600 ">
              @{post.data().username}
            </span>{" "}
            <span className="text-sm text-gray-500">
              <Moment fromNow date={post.data().createdAt?.toDate()}></Moment>
            </span>
          </div>
          <div className="">
            <EllipsisHorizontalIcon className="h-12 w-12 hover-effect p-0 hover:text-sky-600 hover:bg-sky-200" />
          </div>
        </div>
        <div className="text-gray-600 text-[15px] sm:text-[16px] mb-2">
          {post.data().text}
        </div>
        <div className="">
          <img
            src={post.data().image}
            alt={post.id}
            className="w-full rounded-xl"
          />
        </div>

        <div className="flex justify-between mt-2 mx-2 items-center">
          <ChatBubbleLeftEllipsisIcon
            onClick={() => setOpen(!open)}
            className="max-h-11 w-11 hover-effect p-2 hover:text-sky-600 hover:bg-sky-200"
          />
          {currentId === uid && (
            <TrashIcon
              onClick={deletePost}
              className="max-h-11 w-11 hover-effect p-2 hover:text-red-600 hover:bg-red-200"
            />
          )}
          <div className="flex items-center">
            {post.data()["likes"].indexOf(uid) !== -1 ? (
              <LoveSvg onClick={likePost} />
            ) : (
              <HeartIcon
                onClick={likePost}
                className="max-h-11 w-11 hover-effect p-2 hover:text-red-600 hover:bg-red-200"
              />
            )}
            <span>{post.data()["likesCount"]}</span>
          </div>
          <ShareIcon className="max-h-11 w-11 hover-effect p-2 hover:text-sky-600 hover:bg-sky-200" />
          <ChartBarIcon className="max-h-11 w-11 hover-effect p-2 hover:text-sky-600 hover:bg-sky-200" />
        </div>
      </div>
    </div>
  );
};
