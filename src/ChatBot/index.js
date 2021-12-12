import React, { useEffect, useState } from "react";
import Msg from "./msg";
import { data } from "./data/data";
import { options } from "./data/options";
import { useNavigate } from "react-router-dom";
import scrollToBottom from './commonFunc'
import "./style.css";


let chats = [];
const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useState([]);
  let navigate = useNavigate();
 
  const userName =
  window.localStorage.getItem("userName") !== null
    ? JSON.parse(window.localStorage.getItem("userName"))
    : null;
  useEffect(() => {
        if(!userName){
          setChatList([]);
          navigate("/");
        }
    chats = [
      ...chats,
      { Message: `Hello ${userName}. Welcome.`, incomingMsg: true },
    ];
    setChatList(chats);
  }, [navigate,userName]);



  const getAnswer = (q) => {
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].question.toLocaleLowerCase().includes(q.toLocaleLowerCase())
      ) {
        chats = [...chats, { Message: data[i].answer, incomingMsg: true }];
        setChatList(chats);
        return;
      }
    }
    chats = [
      ...chats,
      {
        Message:
          "Didn't recognise your question.Do you want to learn something?",
        incomingMsg: true,
        option: true,
        options: options,
      },
    ];
    setChatList(chats);
    scrollToBottom('chat-container');
    return;
  };
  //
  const onSendMsg = () => {
    chats = [...chats, { Message: message, sentMsg: true }];
    setChatList(chats);
    setTimeout(() => {
      getAnswer(message);
    }, 1000);

    setMessage("");
  };
  

  const clickOnOption = (option) => {
    chats = [
      ...chats,
      {
        Message: option.name,
        incomingMsg: true,
        option: false,
        link: true,
        links: option.links,
      },
    ];
    setChatList(chats);
    scrollToBottom('chat-container');
    return;
  };

  const openLinkInNewTab = (link) => {
    chats = [
      ...chats,
      {
        Message: `Great.Enjoy your ${link.linkName}.`,
        incomingMsg: true,
        option: false,
        link: false,
      },
    ];
    setChatList(chats);
    scrollToBottom('chat-container');
    const newWindow = window.open(link.url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
    return;
  };

  function onKeyUp(event){
    event.charCode === 13 && onSendMsg()
}

  return (
    <div className="chatBox">
      <div className="chat-header">Conversation with LearningBot</div>
      <div className="chat-container">
        <>
          {chatList.map((item) => (
            <>
              <Msg
                incomingMsg={item.incomingMsg}
                Message={item.Message}
                sentMsg={item.sentMsg}
              />
              {item.option && (
                <div className="options-container">
                  {item.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => clickOnOption(option)}
                      className="options-button"
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              )}
              {item.link && (
                <div className="links-container">
                  {item.links.map((link) => (
                    <p
                      key={link.id}
                      onClick={() => openLinkInNewTab(link)}
                      className="links-button"
                    >
                      {link.linkName}
                    </p>
                  ))}
                </div>
              )}
            </>
          ))}
        </>
      </div>
      <div className="typeMessageContainer">
        <input
          type="text"
          className="typeMessageBox"
          value={message}
          placeholder="Type here..."
          onKeyPress={onKeyUp}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button
          type="button"
          className={message ? "sendBtn bgOrange" : " sendBtn bgGray"}
          disabled={message ? false : true}
          onClick={onSendMsg}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
