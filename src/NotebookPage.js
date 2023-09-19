import React, { useState, useEffect } from 'react';
import './NotebookPage.css';
import grammarCheck from './grammarCheck';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const NotebookPage = ({ onDelete, textareaRef, updatePage }) => {

  const [isBulletState, setIsBulletState] = useState(false);
  const [consecutiveEnters, setConsecutiveEnters] = useState(0);

  useEffect(() => {
    if (textareaRef.current) {
      grammarCheck(textareaRef.current);
    }

    const handleKeyPress = (e) => {
      if (e.key === "Enter" && isBulletState) {
        e.preventDefault();
        if (consecutiveEnters >= 1) {
          setIsBulletState(false);
          setConsecutiveEnters(0);
          textareaRef.current.value = textareaRef.current.value.slice(0, -4);
          textareaRef.current.value += "\n";
          updatePage(textareaRef.current.value);
        } else {
          setConsecutiveEnters(consecutiveEnters + 1);
          textareaRef.current.value += "\n\t- ";
          updatePage(textareaRef.current.value);
        }
      } else {
        setConsecutiveEnters(0);
      }
    };

    textareaRef.current.addEventListener("keydown", handleKeyPress);

    return () => {
      textareaRef.current.removeEventListener("keydown", handleKeyPress);
    };
  }, [textareaRef, isBulletState, consecutiveEnters, updatePage]);


  const handleContextMenu = (e) => {
    e.preventDefault();
    const menu = document.getElementById("bullet-menu");
    menu.style.position = 'fixed';
    menu.style.left = `${e.clientX}px`;
    menu.style.top = `${e.clientY}px`;
    menu.style.display = "block";
    document.addEventListener('click', hideMenu);
  };

  const handleMenuClick = () => {
    setIsBulletState(true); // Enable bullet state
    if (textareaRef.current) {
      textareaRef.current.value += "\n\t- ";
      // Call updatePage() to update the state in parent
      updatePage(textareaRef.current.value);
    }
    const menu = document.getElementById("bullet-menu");
    menu.style.display = "none";
  };

  const hideMenu = () => {
    const menu = document.getElementById("bullet-menu");
    menu.style.display = "none";
    document.removeEventListener('click', hideMenu);
  };

  return (
    <div className="page-container">
      <div 
        id="bullet-menu" 
        className="bullet-menu" 
        onClick={handleMenuClick}
      >
        <FormatListBulletedIcon className="bullet-menu-icon" />
      </div>
      <button className="delete-btn" onClick={onDelete}>✖</button>
      <textarea 
        className="lined-paper" 
        ref={textareaRef}
        onChange={e => updatePage(e.target.value)}
        onContextMenu={handleContextMenu} 
      />
    </div>
  );
}

export default NotebookPage;
