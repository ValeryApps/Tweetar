import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { CommentModal } from "./CommentModal";
import { News } from "./News";
import { Users } from "./Users";

export const Widgets = ({ newsResults, randomUsers }) => {
  const [newsCount, setNewsCount] = useState(3);
  const [usersCount, setUsersCount] = useState(3);
  const [isMore, setIsMore] = useState(false);
  const [moreUsers, setMoreUsers] = useState(false);
  useEffect(() => {
    setIsMore(newsCount <= newsResults.length);
    setMoreUsers(usersCount <= randomUsers.length);
  }, [newsCount, setNewsCount, setMoreUsers, usersCount]);
  return (
    <div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5">
      <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white p-2 z-50">
        <div className="flex items-center rounded-full relative bg-red-400 p-3">
          <MagnifyingGlassIcon className="h-6 z-50 text-gray-500" />
          <input
            type="text"
            placeholder="Search Twitter"
            className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-xl focus:bg-white bg-gray-100"
          />
        </div>
      </div>
      <CommentModal />
      <div className="text-gray-700 bg-gray-100 space-y-3 rounded-xl w-[90%] pt-2 xl:w-[75%]">
        <h1 className="font-bold text-xl px-4">What's happening?</h1>
        <AnimatePresence>
          {newsResults.slice(0, newsCount).map((article) => (
            <motion.div
              key={article.publishedAt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
            >
              <News key={article.publishedAt} article={article} />
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          onClick={() => {
            setNewsCount(newsCount + 10);
            if (!isMore) {
              setNewsCount(3);
            }
            // setIsMore(newsCount !== newsResults.length)
          }}
          className="text-blue-300 pl-4 pb-3 hover:text-blue-700"
        >
          {isMore ? "Show more" : "That's all"}
        </button>
      </div>

      <div className="text-gray-700 bg-gray-100 space-y-3 rounded-xl w-[90%] pt-2 xl:w-[75%] sticky top-16">
        <h1 className="font-bold text-xl px-4">Who to follow?</h1>
        <AnimatePresence>
          {randomUsers.slice(0, usersCount).map((user, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
            >
              <Users key={`${user.login.uid}${index}`} user={user} />
            </motion.div>
          ))}
        </AnimatePresence>

        <button
          onClick={() => {
            setUsersCount(usersCount + 10);
            if (!moreUsers) {
              setUsersCount(3);
            }
            // setIsMore(newsCount !== newsResults.length)
          }}
          className="text-blue-300 pl-4 pb-3 hover:text-blue-700"
        >
          {moreUsers ? "Show more" : "That's all. Collapse"}
        </button>
      </div>
    </div>
  );
};
