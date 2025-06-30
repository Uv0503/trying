import React from 'react';

const Nav = ({ history, onSelectChat, onNewChat, onToggleNav }) => {
  return (
    <div className="p-4">
      <button
        onClick={onToggleNav}
        className="mb-4 p-2 bg-slate-800 rounded-md"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      <ul>
        <li>
          <button
            onClick={onNewChat}
            className="flex items-center p-2 hover:bg-slate-800 rounded-lg w-full mb-2"
          >
            <span className="material-symbols-outlined mr-3">chat_bubble</span>
            <span>New Chat</span>
          </button>
        </li>

        <li className="mt-4 text-gray-400 uppercase text-xs">History</li>
        {history.map((msg, idx) => (
          <li
            key={idx}
            className="flex items-center p-2 hover:bg-slate-800 rounded-lg cursor-pointer"
            onClick={() => onSelectChat(idx)}
          >
            <span className="material-symbols-outlined mr-3">
              {msg.role === 'user' ? 'person' : 'smart_toy'}
            </span>
            <span className="truncate max-w-[12rem]">{msg.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
