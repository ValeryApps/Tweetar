import React from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalState";

export const CommentModal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  return <div>{open && <h1>Comment modal open</h1>}</div>;
};
