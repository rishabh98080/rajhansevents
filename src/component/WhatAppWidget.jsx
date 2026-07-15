"use client";

import React, { useState } from "react";
import "./WhatsAppWidget.css";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const botNumber = "919876543210"; // Replace with your actual WhatsApp number without +

  const handleSend = () => {
    if (!message.trim()) return;
    
    // Encode the message and open WhatsApp
    const url = `https://wa.me/${botNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    
    // Optional: clear the message after sending
    setMessage("");
  };

  return (
    <div className="wa-widget-container">
      {/* The Chat Window */}
      {isOpen && (
        <div className="wa-chat-window">
          
          {/* Header */}
          <div className="wa-chat-header">
            <div className="wa-chat-title">
              <strong>Chat with Us</strong>
              <p>Typically replies in minutes</p>
            </div>
            <button className="wa-close-btn" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          {/* Chat Body */}
          <div className="wa-chat-body">
            <div className="wa-bot-message">
              Hi there! 👋 How can we help you today?
            </div>
          </div>

          {/* Input Area */}
          <div className="wa-chat-footer">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button className="wa-send-btn" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      )}

      {/* The Floating Toggle Button */}
      <button 
        className="wa-floating-btn" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
}