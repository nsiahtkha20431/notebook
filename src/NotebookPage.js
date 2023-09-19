import React, { useEffect } from 'react';
import './NotebookPage.css';
import grammarCheck from './grammarCheck';

const NotebookPage = ({ onDelete, textareaRef, updatePage }) => {

    useEffect(() => {
        if (textareaRef.current) {
          grammarCheck(textareaRef.current);
        }
      }, [textareaRef]);

    const handleContextMenu = (e) => {
      e.preventDefault();
      const menu = document.getElementById("bullet-menu");
      menu.style.left = `${e.clientX}px`;
      menu.style.top = `${e.clientY}px`;
      menu.style.display = "block";
    };
  
    const handleMenuClick = () => {
      // Logic for bullet point addition goes here later
      const menu = document.getElementById("bullet-menu");
      menu.style.display = "none";
    };

    return (
        <div className="page-container">
          <div 
            id="bullet-menu" 
            className="bullet-menu" 
            onClick={handleMenuClick}
          >
            <div className="bullet-menu-item">Bullet</div>
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
