import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../../context/Context";
const sidebar = () => {
  const [extended, setExtended] = useState(true);
  const { onSent, prevPrompt, setRecentPrompt, newChat } = useContext(Context);
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };
  return (
    <div className={`sidebar ${extended ? "sidebar" : "extended"}`}>
      <div className="top">
        <img
          onClick={() => {
            setExtended((prev) => !prev);
          }}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />

        <div onClick={newChat} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? "" : <p>New Chat</p>}
        </div>

        <div className="recent">
          <p className="recent-title">Recent</p>
          {prevPrompt.map((item, index) => {
            return (
              <div onClick={() => loadPrompt(item)} className="recent-entry">
                <img src={assets.message_icon} alt="" />
                <p onClick={() => loadPrompt(item)}>{item.slice(0, 18)}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          <p>Help</p>
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          <p>Activity</p>
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          <p>Setting</p>
        </div>
      </div>
    </div>
  );
};

export default sidebar;
