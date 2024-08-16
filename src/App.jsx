import React, { useEffect } from 'react';
import './App.css';
// components
import Sidebar from './components/Sidebar';
import Chatbox from './components/Chatbox';
import Input from './components/Input';
import { ChatProvider } from './context/ChatContext';

export default function src() {
  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    // Disable inspect element and developer tools
    const handleKeyDown = (event) => {
      if (
        (event.ctrlKey && event.shiftKey && event.key === 'I') ||
        (event.ctrlKey && event.shiftKey && event.key === 'J') ||
        (event.ctrlKey && event.key === 'U') ||
        (event.key === 'F12')
      ) {
        event.preventDefault();
      }
    };

    // Disable dragging of images
    const handleDragStart = (event) => {
      if (event.target.tagName === 'IMG') {
        event.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return (
    <ChatProvider>
      <div className="app">

        <div className="sidebar_section">
          <Sidebar />
        </div>
        <div className="chat_section">
          <div className="Output_section">
            <Chatbox />
          </div>
          <div className="input_section">
            <Input />
          </div>
        </div>
      </div>
    </ChatProvider>
  )
}