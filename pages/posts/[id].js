import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { Widgets } from "../../components/Widgets";
import { db } from "../../firebase";
import { Post } from "../../components/Post";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Comment } from "../../components/Comment";

const PostPage = ({ newsResults, randomUsers }) => {
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const [post, setPost] = useState(null);
  useEffect(() => {
    onSnapshot(doc(db, "posts", router.query.id), (snap) => {
      setPost(snap);
    });
  }, [router]);
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "comments"),
        where("postId", "==", router.query.id),
        orderBy("createdAt", "desc")
      ),
      (snap) => {
        setComments(snap.docs);
      }
    );
  }, [db, router, router]);

  return (
    <>
      <Head>
        <title>Tweeta</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen  mx-auto">
        <Sidebar />
        <div className="xl:ml-[370px] border-l-2 border-r-2 min-w-[576px] sm:ml-[76px] flex-grow max-w-xl">
          <div className="flex items-center gap-2 pt-3 font-bold">
            <ArrowLeftIcon
              className="h-10 hover-effect p-2"
              onClick={() => router.back()}
            />
            <span>Tweet</span>
          </div>
          {post && (
            <div>
              <Post post={post} />
              <div className="pl-6 bg-gray-100">
                <h2 className="text-center">comments</h2>
                {comments.map((comment, index) => (
                  <div key={index}>
                    <Comment comment={comment.data()} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <Widgets
          newsResults={newsResults.articles}
          randomUsers={randomUsers.results}
        />
      </main>
    </>
  );
};
export default PostPage;

export const getServerSideProps = async () => {
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json"
  ).then((result) => result.json());

  const randomUsers = await fetch("https://randomuser.me/api/?results=10").then(
    (user) => user.json()
  );

  return {
    props: { newsResults, randomUsers },
  };
};
