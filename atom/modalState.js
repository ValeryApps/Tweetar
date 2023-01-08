import { atom } from "recoil";
export const modalState = atom({
  key: "messageState",
  default: false,
});
export const postIdState = atom({
  key: "stateOfPostId",
  default: "",
});
