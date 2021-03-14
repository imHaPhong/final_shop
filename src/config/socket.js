import { io } from "socket.io-client";
export const socket = io("https://tuanna-final.herokuapp.com/", {
  transports: ["websocket"],
});
