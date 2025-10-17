import { io } from "socket.io-client";

let socket;

export const connectSocket = ({ deviceId, userId = null }) => {
  socket = io("http://145.223.18.56:3003", {
    transports: ["websocket"],
    secure: false, // true if HTTPS with certs
  });

  socket.on("connect", () => {
    console.log("🟢 Socket connected:", socket.id);

    // Join device room
    if (deviceId) socket.emit("joinDevice", deviceId);
    if (userId) socket.emit("joinDevice", userId); // optional if you want userId room
  });

  // Listen to deviceId channel
  if (deviceId)
    socket.on(deviceId, (data) => {
      console.log("📨 Incoming Data:", data);
      handleIncomingData(data);
    });

  // Force logout listener
  socket.on("force_logout", (data) => {
    console.log("🚨 Force logout received:", data);
    handleLogout();
  });

  return socket;
};

const handleIncomingData = (data) => {
  // e.g., show modal, play sound
  console.log("🔔 Show modal and play sound:", data);
};

const handleLogout = () => {
  // e.g., clear AsyncStorage, navigate to Login screen
  console.log("🔴 Logging out user...");
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};
