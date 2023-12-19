import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs"; // 추후에 react-stompjs로 바꿔야함
import { LoginContext } from "../App";

const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {
  const { loginID } = useContext(LoginContext);
  const [stompClient, setStompClient] = useState(null);

  const initializeWebSocket = useCallback(() => {
    const socket = new WebSocket('ws://10.2.5.10/ws-message'); //ip 주소 나중에 바꿔줘야 됨
    const client = Stomp.over(socket, { debug: false }); // 디버그 모드 활성화 : true , 비활성화 : false
    client.debug = function(){}

    client.connect({}, (frame) => {
      setStompClient(client);
    });
  }, [loginID, setStompClient]);


  useEffect(() => {
    if (loginID) {
      initializeWebSocket();
    }

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [loginID]);

  return (
    <WebSocketContext.Provider value={stompClient}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};

export default WebSocketProvider;