import {
  FaceSmileIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  collection,
  serverTimestamp,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export const Input = () => {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const pickImage = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendData = async () => {
    if (loading) return;
    setLoading(true);
    const postRef = doc(collection(db, "posts"));
    await setDoc(postRef, {
      id: postRef.id,
      userId: session.user.uid,
      text: input,
      userPicture: session.user.image,
      name: session.user.name,
      username: session.user.username,
      likes: [],
      likesCount: 0,
      createdAt: serverTimestamp(),
    });
    const imageRef = ref(storage, `posts/${postRef.id}/images`);
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", postRef.id), {
          image: downloadUrl,
        });
      });
    }

    setInput("");
    setSelectedFile(null);
    setLoading(false);
  };
  const displayImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <>
      {session && (
        <div className="flex border-b-gray-200 border-b-2 space-x-3">
          <div className="w-13 h-13 rounded-full">
            <Image
              className="w-14 h-14 rounded-full object-cover hover-effect p-1 hover:brightness-95"
              src={session?.user?.image}
              alt="valery"
              width={56}
              height={56}
              onClick={signOut}
            ></Image>
          </div>
          <div className="w-full divide-y divide-gray-200">
            <div className=" border-b-2 ">
              <textarea
                className="w-full border-none focus:ring-0 text-lg placeholder:text-gray-700 tracking-wide min-h-[50px]"
                rows="3"
                placeholder="What's happening"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>
            {selectedFile && (
              <div className="relative overflow-hidden">
                <XMarkIcon
                  onClick={() => setSelectedFile(null)}
                  className="w-7 h-7 text-white font-bold rounded-full cursor-pointer absolute right-0 shadow-md shadow-white"
                />

                <img
                  src={selectedFile}
                  alt="Image preview"
                  className={loading ? "animate-pulse w-full object-cover" : ""}
                />
              </div>
            )}
            <div className="flex items-center py-2.5">
              <div className="flex items-center">
                <PhotoIcon
                  className="w-10 h-10 hover-effect p-2 text-sky-500 hover:bg-sky-100"
                  onClick={() => pickImage.current.click()}
                />
                <input
                  type="file"
                  ref={pickImage}
                  hidden
                  onChange={displayImage}
                />
                <FaceSmileIcon className="w-10 h-10 hover-effect p-2 text-sky-500 hover:bg-sky-100" />
              </div>
              <button
                onClick={sendData}
                className="ml-auto bg-blue-400 text-white rounded-full px-4 py-2 font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                disabled={!input.trim() || loading}
              >
                {loading ? "Please Waite!" : "Tweet"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
