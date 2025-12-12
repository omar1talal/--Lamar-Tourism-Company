import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { getTravelAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'أهلاً بك في شركة لمار للسياحة! أنا مساعدك الذكي. كيف يمكنني مساعدتك في التخطيط لرحلتك القادمة؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    // Prepare history for Gemini
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await getTravelAdvice(history, userMessage);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 h-[calc(100vh-100px)]">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden h-full flex flex-col border border-gray-100">
        
        {/* Header */}
        <div className="bg-brand-600 p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Sparkles className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">مساعد لمار الذكي</h2>
            <p className="text-brand-100 text-sm">مدعوم بتقنية Gemini AI</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-gray-200' : 'bg-brand-100'
              }`}>
                {msg.role === 'user' ? <User size={20} className="text-gray-600" /> : <Bot size={20} className="text-brand-600" />}
              </div>
              <div
                className={`max-w-[80%] p-4 rounded-2xl text-base leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-brand-600 text-white rounded-tl-none'
                    : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tr-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                 <Bot size={20} className="text-brand-600" />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tr-none shadow-sm border border-gray-100">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اسألني عن وجهات سياحية، أسعار تذاكر، أو خطط سفر..."
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all text-right"
              dir="rtl"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 text-white rounded-xl px-6 transition-colors flex items-center justify-center"
            >
              <Send size={20} className={isLoading ? 'opacity-0' : 'rotate-180'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
