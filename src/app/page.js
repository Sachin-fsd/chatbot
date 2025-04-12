'use client';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'system', content: 'Welcome to your AI Chatbot 🧠✨' }]);
  const chatContainerRef = useRef(null);
  const [isThinking, setIsThinking] = useState(false); // New state

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current?.scrollHeight;
  }, [messages]);

  const filterThink = (content) => {
    const thinkStart = content.indexOf('<think>');
    const thinkEnd = content.indexOf('</think>');

    if (thinkStart !== -1 && thinkEnd !== -1 && thinkStart < thinkEnd) {
      // Remove the <think>...</think> block
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
    setIsThinking(true); // Show "Thinking..."

    try {
      const res = await axios.post('/api/chat', {
        messages: newMessages,
      });
      console.log(res);
      setIsThinking(false); // Hide "Thinking..." when response arrives
      const aiResponse = res.data.reply;
      const filteredResponse = filterThink(aiResponse);
      setMessages([...newMessages, { role: 'assistant', content: filteredResponse }]);
    } catch (err) {
      console.error("Error sending message:", err);
      setIsThinking(false); // Hide "Thinking..." when response arrives
      setMessages([...newMessages, { role: 'assistant', content: 'Oops. Something went wrong 💥' }]);
    }
  };

  return (
    <div className="p-6 mx-auto h-full">
      <div ref={chatContainerRef} className="h-96 overflow-y-scroll border rounded p-4 mb-4 space-y-2 bg-gray-900 text-white">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
            <p className={`inline-block  px-3 py-2 rounded-lg ${msg.role === 'user' ? 'bg-gray-800' : 'bg-gray-800'}`}>
              {msg.role === 'assistant' ? filterThink(msg.content) : msg.content}
            </p>
          </div>
        ))}
        {isThinking && (
          <div className="text-left italic text-gray-500">Thinking...</div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}