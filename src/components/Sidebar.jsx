import React, { useContext, useEffect, useState } from 'react';
import '../styles/Sidebar.css';
import data from '../assets/data';
import { ChatContext } from '../context/ChatContext';

export default function Components() {
   const { messages, setMessages, isBtnActive, setIsBtnActive } = useContext(ChatContext);
   const [history, setHistory] = useState(getHistory());

   function getHistory() {
      return JSON.parse(localStorage.getItem('history')) || [];
   }

   function saveHistory(newHistory) {
      localStorage.setItem('history', JSON.stringify(newHistory));
      setHistory(newHistory); // Update the state after saving to local storage
   }

   const toggleNewchat = () => {
      if (isBtnActive) {
         if (messages.length > 0) {
            const newMessage = messages.map(({ type, response }) => ({ type, response }));
            const nextIndex = history.length ? Math.max(history.map(item => item.index)) + 1 : 1;

            // Push new message into history and update local storage
            const updatedHistory = [...history, { index: nextIndex, messages: newMessage }];


            setMessages([]);
            saveHistory(updatedHistory);


         } else {
            console.warn("No messages to store");
         }
      } else {
         console.warn("API request in progress");
      }
   };

   const handelHistoryDelete = (index) => {
      // console.log(index);

      // Remove the item at the specified index from history and update local storage
      const updatedHistory = history.filter(item => item.index !== index);
      saveHistory(updatedHistory);
   };

   // Extract user responses for rendering
   const userResponsesHistory = history.map(({ messages }) =>
      messages.filter(({ type }) => type === 'user').map(({ response }) => response)
   );

   const historyChatRecive = (index) => {
      const data = JSON.parse(localStorage.getItem('history'));
      // console.log(data[index]);
      setMessages(data[index].messages);
   }
   const sidebarHandel = () => {
      console.log('sidebarHandel');

   }

   const resetPage = () => {
      localStorage.clear();
      window.location.reload();
   }

   return (
      <div className="sidebar_container">
         <div className="sidebar_container_icons">
            <button
               type='button'
               className='sidebar_btns_custom_cursor'
               onClick={resetPage}
            >
               <img src={data.refresh} alt="" onClick={sidebarHandel} />
            </button>
            <button
               type='button'
               onClick={toggleNewchat}
               id='newchatbtnicon'
               className='sidebar_btns_custom_cursor'
            >
               <img src={data.newchat} alt="" />
            </button>
         </div>
         <div
            className="sidebar_container_newchat sidebar_container_toggle_style"
            onClick={toggleNewchat}
         >
            <p>New chat</p>
            <img src={data.add} alt="" />
         </div>
         <div className="history_container_section">
            {
               userResponsesHistory.map((userResponses, index) => (
                  <div
                     key={index}
                     className="sidebar_container_history sidebar_container_toggle_style "
                     onClick={() => historyChatRecive(index)}
                  >
                     {userResponses.length > 0 && (
                        <p key={0}>
                           {userResponses[0].split(/\s+/).filter(Boolean).slice(0, 5).join(' ')}
                        </p>
                     )}
                     <button
                        type='button'
                        className='removebtn'
                        onClick={() => handelHistoryDelete(history[index].index)}
                     >
                        <img src={data.remove} alt="Remove" />
                     </button>
                  </div>
               ))
            }
         </div>
         <div className="sidebar_container_userprofile sidebar_container_toggle_style">
            <a href="https://github.com/BuddhadebKoner" target='_blank'>
               <img src={data.logo1} alt="" />
               <p>Buddhadeb Koner</p>
            </a>
         </div>
      </div>
   );
}
