import React, { createContext, useState } from "react";
import axios from "axios";

// Create Context
const ChatContext = createContext();

// Provider Component
const ChatProvider = ({ children }) => {
   const [messages, setMessages] = useState([]);
   const [inputValue, setInputValue] = useState("");
   const [isBtnActive, setIsBtnActive] = useState(true);

   // Function to send API request
   const sendApiRequest = async (message) => {
      setIsBtnActive(false);

      const API = import.meta.env.VITE_KEY;
      const userMessage = { type: "user", response: message };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Prepare the payload according to API requirements
      const payload = {
         contents: [
            {
               parts: [
                  {
                     text: message,
                  },
               ],
            },
         ],
      };

      // Add a default loading message
      const loadingMessage = { type: "god", response: "Loading..." };
      setMessages((prevMessages) => [...prevMessages, loadingMessage]);

      try {
         // Send the request
         const response = await axios.post(API, payload);
         const apiResponse = response.data;

         const content = apiResponse.candidates[0]?.content?.parts[0]?.text || "No response received";

         // Replace loading message with API response
         setMessages((prevMessages) => {
            // Find the index of the loading message
            const loadingIndex = prevMessages.findIndex((msg) => msg.type === "god" && msg.response === "Loading...");
            // Replace loading message with actual response
            return prevMessages.map((msg, index) =>
               index === loadingIndex ? { type: "god", response: content } : msg
            );
         });
      } catch (error) {
         console.error("Error fetching data", error);
         // Replace loading message with error message
         setMessages((prevMessages) => {
            const loadingIndex = prevMessages.findIndex((msg) => msg.type === "god" && msg.response === "Loading...");
            return prevMessages.map((msg, index) =>
               index === loadingIndex ? { type: "god", response: "Error fetching response" } : msg
            );
         });
      } finally {
         setIsBtnActive(true);
      }
   };

   return (
      <ChatContext.Provider value={{ messages, setMessages, inputValue, setInputValue, sendApiRequest, isBtnActive, setIsBtnActive }}>
         {children}
      </ChatContext.Provider>
   );
};

export { ChatProvider, ChatContext };
