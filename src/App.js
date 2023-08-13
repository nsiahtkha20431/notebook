import React, { useState } from 'react';
import './App.css';
import NotebookPage from './NotebookPage';

function App() {
    const [pages, setPages] = useState([{}]);

    const addPage = () => {
        setPages([...pages, {}]);
    }

    const deletePage = (index) => {
        const newPages = [...pages];
        newPages.splice(index, 1);
        setPages(newPages);
    }

    return (
        <div className="app-container">
            <h2 className="title">♡nishat's journal♡</h2>
            <div className="notebook">
                <div className="pages-container">
                    {pages.map((_, index) => (
                        <NotebookPage key={index} onDelete={() => deletePage(index)} />
                    ))}
                </div>
                <button onClick={addPage} className="add-page-btn">→</button>
            </div>
        </div>
    );
}

export default App;
