import { SparklesIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Input } from "./Input";
import { Post } from "./Post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { AnimatePresence, motion } from "framer-motion";

export const Feeds = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "posts"), orderBy("createdAt", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, []);
  return (
    <div className="xl:ml-[370px] border-l-2 border-r-2 min-w-[576px] sm:ml-[76px] flex-grow max-w-xl">
      <div className="flex justify-between items-center px-3 py-2 sticky top-0 z-50 bg-white border-b-2 border-gray-200">
        <div className="text-lg sm:text-xl font-bold cursor-pointer">Home</div>
        <div className="hover-effect flex items-center justify-center px-0 w-9 h-9">
          <SparklesIcon className="h-7" />
        </div>
      </div>
      <Input />
      <AnimatePresence>
        {posts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            <Post post={post} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
