
import { apiUrl, postData, socketUrl } from "../api";


export const sendData = async (deviceId) => {
    if (!deviceId || !deviceId.trim()) throw new Error("deviceId is required");

    try {
    const response = await fetch(`${socketUrl}/send-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        deviceId,
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        }),
    });

    if (!response.ok) throw new Error("Failed to send data");
    return await response.json();
    } catch (error) {
    throw error;
    }
};

export const logoutDevice = async (deviceId) => {
    if (!deviceId || !deviceId.trim()) throw new Error("deviceId is required");
    try { 
        const response = await fetch(`${socketUrl}/force-logout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ deviceId }),
        });
        console.log(deviceId) 
    console.log(response)
    if (!response.ok) throw new Error("Failed to trigger logout");
    return await response.json();
    } catch (error) {
    throw error;
    }
};
  


  