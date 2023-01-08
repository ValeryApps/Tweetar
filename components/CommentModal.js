import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atom/modalState";
import Modal from "react-modal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  increment,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";
import { useSession } from "next-auth/react";
import Image from "next/image";

export const CommentModal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId] = useRecoilState(postIdState);
  const [post, setPost] = useState({});
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (postId) {
      const postRef = doc(db, "posts", postId);
      onSnapshot(postRef, (snap) => setPost(snap.data()));
    }
  }, []);
  const sendData = async () => {
    setLoading(true);
    const commentRef = await addDoc(collection(db, "comments"), {
      postId: postId,
      comment: input,
      username: session.user?.name,
      userPic: session.user?.image,
      createdAt: serverTimestamp(),
    });
    const comment = await getDoc(doc(db, "comments", commentRef.id));

    await updateDoc(doc(db, "posts", postId), {
      comments: arrayUnion(comment.data()),
      commentCount: increment(1),
    });
    setLoading(false);
    setOpen(false);
    setInput("");
  };
  return (
    <>
      <Modal
        ariaHideApp={false}
        isOpen={open}
        onRequestClose={closeModal}
        className="max-w-lg w-[50%] left-[50%] top-24 absolute z-[60] translate-x-[-50%] border-2 border-gray-400 rounded-xl shadow-lg bg-white p-1"
      >
        <div className="">
          <div className="hover-effect w-8 h-8 flex items-center p-1">
            <XMarkIcon
              className="h-6 text-gray-800 cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>
        </div>
        <div className="border-b-2 border-gray-2 my-1"></div>
        <div className="">
          <div className="flex items-center h-16 gap-2 relative">
            <img
              src={post?.userPicture}
              alt=""
              className=" rounded-full object-cover min-w-[60px] max-h-[60px] "
            />
            <span className="w-0.5 absolute h-full z-[-1] bg-gray-200 top-11 left-7"></span>
            <div className="flex gap-3 items-center">
              <h1 className="hover:font-bold font-semibold hover:underline cursor-pointer whitespace-nowrap">
                {post?.name}
              </h1>{" "}
              <span className="text-sm text-gray-600 ">@{post?.username}</span>{" "}
              <span className="text-sm text-gray-500">
                <Moment fromNow date={post?.createdAt?.toDate()}></Moment>
              </span>
            </div>
          </div>
          <div className="ml-12 text-gray-600">{post?.text}</div>
        </div>
        {session && (
          <div className="flex  space-x-3">
            <div className="w-13 h-13 rounded-full">
              <Image
                className="w-14 h-14 rounded-full object-cover hover-effect p-1 hover:brightness-95"
                src={session?.user?.image}
                alt="valery"
                width={56}
                height={56}
              ></Image>
            </div>
            <div className="w-full divide-y divide-gray-200">
              <div className=" border-b-2 ">
                <textarea
                  className="w-full border-none focus:ring-0 text-lg placeholder:text-gray-700 tracking-wide min-h-[50px]"
                  rows="3"
                  placeholder="Tweet a reply"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                ></textarea>
              </div>
              <div className="flex items-center py-2.5">
                <button
                  onClick={sendData}
                  className="ml-auto bg-blue-400 text-white rounded-full px-4 py-2 font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  disabled={!input.trim() || loading}
                >
                  {loading ? "Please Wait!" : "Reply"}
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
