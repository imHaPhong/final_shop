import { io } from "socket.io-client";
// export const socket = io("https://tuanna-final.herokuapp.com/", {
//   transports: ["websocket"],
// });
export const socket = io("http://localhost:8080/", {
  transports: ["websocket"],
});
