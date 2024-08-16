import React, { useContext, useEffect, useState } from 'react'; // Import useState
import '../styles/Chatbox.css';

import Userresponse from './Userresponce';
import Godresponse from './Godresponce';
import { ChatContext } from '../context/ChatContext';

export default function Components() {
   const { messages } = useContext(ChatContext);
   const [noChat, setNoChat] = useState(false);

   useEffect(() => {
      setNoChat(messages.length === 0);
   }, [messages]);

   return (
      <div className="chatbox_container_section">
         {
            noChat ?
               (<div className="no_chat_text">
                  <section class="ware-section">
                     <p>This is for educational purposes. This web app is built using the chat API, with UI inspiration taken from GPT. Use this at your own risk. For bug reports or any queries, please contact me at:</p>
                     <a href="https://buddhadebkoner.vercel.app" target='_blank'>buddhadebkoner.com</a>
                  </section>

               </div>)
               : (
                  <div className="chats_container">
                     {messages.map((chat, index) => {
                        if (chat.type === 'user') {
                           return <Userresponse key={index} response={chat.response} messageId={chat.id} />;
                        } else if (chat.type === 'god') {
                           return <Godresponse key={index} response={chat.response} messageId={chat.id} />;
                        }
                        return null;
                     })}
                  </div>
               )
         }
      </div>
   );
}
