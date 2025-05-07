'use client';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'system', content: 'Welcome to your AI Chatbot 🧠✨' }]);
  const chatContainerRef = useRef(null);
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current?.scrollHeight;
  }, [messages]);

  const filterThink = (content) => {
    const thinkStart = content.indexOf('<think>');
    const thinkEnd = content.indexOf('</think>');

    if (thinkStart !== -1 && thinkEnd !== -1 && thinkStart < thinkEnd) {
      const beforeThink = content.substring(0, thinkStart).trim();
      const afterThink = content.substring(thinkEnd + '</think>'.length).trim();
      return `${beforeThink} ${afterThink}`.trim();
    }
    return content;
  };

  const sendMessage = async () => {
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsThinking(true);

    try {
      const res = await axios.post('/api/chat', {
        messages: newMessages,
      });
      setIsThinking(false);
      const aiResponse = res.data.reply;
      const filteredResponse = filterThink(aiResponse);
      setMessages([...newMessages, { role: 'assistant', content: filteredResponse }]);
    } catch (err) {
      console.error("Error sending message:", err);
      setIsThinking(false);
      setMessages([...newMessages, { role: 'assistant', content: 'Oops. Something went wrong 💥' }]);
    }
  };

  return (
    <div className="p-6 mx-auto h-full" id="chatbot-container">
      <div
        ref={chatContainerRef}
        className="h-96 overflow-y-scroll border rounded p-4 mb-4 space-y-2 bg-gray-900 text-white"
        id="chat-messages"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.role === 'user' ? 'text-right' : 'text-left'}
            id={`message-${msg.role}`}
          >
            <p
              className={`inline-block px-3 py-2 rounded-lg ${msg.role === 'user' ? 'bg-gray-800' : 'bg-gray-800'}`}
              id={`message-content-${msg.role}`}
            >
              {msg.role === 'assistant' ? filterThink(msg.content) : msg.content}
            </p>
          </div>
        ))}
        {isThinking && (
          <div className="text-left italic text-gray-500" id="thinking-indicator">
            Thinking...
          </div>
        )}
      </div>
      <div className="flex gap-2" id="input-section">
        <input
          className="flex-1 p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          id="chat-input"
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={sendMessage}
          id="send-button"
        >
          Send
        </button>
      </div>
    </div>
  );
}
