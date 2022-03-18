import "./ChatWithUser.css";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMessageWithUser, setMessage, watchElemMessage } from "../api/chat";
import { date } from "../api/helper";

function ChatWithUser() {
  let [inputText, setInputText] = useState("");
  let [messageWithUser, setMessageWithUser] = useState("initial");
  let [info, setInfo] = useState("initial");
  let [, setIdFirebaseMessage] = useState("init");
  let { id } = useParams();

  useEffect(() => {
    getMessageWithUser(id, setInfo);
  }, []);

  useEffect(() => {
    if (info !== "initial") {
      watchElemMessage(info, setIdFirebaseMessage, setMessageWithUser);
    }
  }, [info]);

  function createMessage() {
    setMessage(info, inputText);
    setInputText("");
  }

  return (
    <div className="chat">
      <div>
        <header>
          <div className="chat__header-btn">
            <Link to="../">
              <button>{"<"}</button>
            </Link>
          </div>
          <div className="chat__header-info">
            <p>{info.login}</p>
          </div>
        </header>
        <main>
          {messageWithUser === "initial" && info === "initial" ? (
            <p className="main__noMessage">Loading...</p>
          ) : messageWithUser === "initial" && info !== "initial" ? (
            <p className="main__noMessage">Not messages</p>
          ) : (
            <div className="chat__main-messages">
              {messageWithUser.map((elem, i) => {
                return (
                  <div
                    className={elem.user === info.login ? "left" : "right"}
                    key={i}
                  >
                    <div className="text">
                      <span>{elem.text}</span>
                    </div>
                    <span>{date(elem.time)}</span>
                  </div>
                );
              })}
            </div>
          )}
          <div className="chat__main-input">
            <input
              placeholder="Text"
              value={inputText}
              onInput={(e) => setInputText(e.target.value)}
            />
            <button disabled={inputText.length === 0} onClick={createMessage}>
              Send
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ChatWithUser;
