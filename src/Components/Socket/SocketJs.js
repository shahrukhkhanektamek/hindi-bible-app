import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { io } from "socket.io-client";
import DeviceInfo from "react-native-device-info";
import { useNavigation } from "@react-navigation/native";
import { apiUrl, postData, socketUrl } from "../api";
import { MMKV } from "react-native-mmkv";
import { GlobalContext } from "../GlobalContext";

const storage = new MMKV();

const SocketJs = () => {
  const [deviceId, setDeviceId] = useState(null);
  const navigation = useNavigation();
  const { extraData } = useContext(GlobalContext); 
  const urls = apiUrl();

  useEffect(() => {
    // 🔹 Get device ID once component mounts
    const fetchDeviceId = async () => { 
      const id = await DeviceInfo.getUniqueId();
      setDeviceId(id);  
    };
    fetchDeviceId();
  }, []);

  useEffect(() => {
    if (!deviceId) return;

    console.log("🔗 Connecting socket:", deviceId);

    // ✅ Connect to your socket server
    const socket = io(socketUrl, {
      transports: ["websocket"],
      secure: false,
    });

    socket.on("connect", () => {
      console.log("🟢 Socket connected:", socket.id);
      socket.emit("joinDevice", deviceId);
    });

    socket.on(deviceId, (data) => {
      console.log("📩 Incoming Data:", data);
      // Here you can handle notifications or update UI
    });

    socket.on("force_logout", async () => {
      console.log("🚨 Force logout received");
      const response = await postData([], urls.logout,"GET", navigation,extraData,1,1);
    });

    return () => {
      console.log("🔵 Disconnecting socket");
      socket.disconnect();
    };
  }, [deviceId]);

  return (
    <View></View>
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   <Text>🔌 Socket Connected to Device ID:</Text>
    //   <Text style={{ fontWeight: "bold", marginTop: 10 }}>asfsaf</Text>
    // </View>
  );
};

export default SocketJs;
