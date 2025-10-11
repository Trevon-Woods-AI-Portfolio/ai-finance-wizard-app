import { createContext, useContext, useEffect, useState } from "react";
import dotenv from "dotenv";
import io from "socket.io-client";
import { useSelector } from "react-redux";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const user = useSelector((state) => state.user);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const socket = io(BACKEND_URL, {
      query: {
        userId: user?._id,
      },
    });

    setSocket(socket);

    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => socket && socket.close();
  }, [user?._id]);
  
  console.log("Online Users: ", onlineUsers);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
