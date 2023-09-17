import React, { useEffect } from 'react';
import './NotebookPage.css';
import grammarCheck from './grammarCheck';
// import autoCorrect from './autoCorrect';

const NotebookPage = ({ onDelete, textareaRef }) => {

    useEffect(() => {
        if (textareaRef.current) {
          grammarCheck(textareaRef.current);
        //   autoCorrect(textareaRef.current);
        }
      }, [textareaRef]);

    return (
        <div className="page-container">
            <button className="delete-btn" onClick={onDelete}>✖</button>
            <textarea className="lined-paper" ref={textareaRef}></textarea>
        </div>
    );
}

export default NotebookPage;
