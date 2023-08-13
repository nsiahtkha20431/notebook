import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import NotebookPage from './NotebookPage';

function App() {
    const [pages, setPages] = useState([{}]);
    const pagesContainerRef = useRef(null);

    const addPage = () => {
        setPages([...pages, {}]);
    }

    const deletePage = (index) => {
        const newPages = [...pages];
        newPages.splice(index, 1);
        setPages(newPages);
    }

    // Scroll to the latest page when a new one is added
    useEffect(() => {
      if (pagesContainerRef.current) {
          pagesContainerRef.current.scrollLeft = pagesContainerRef.current.scrollWidth;
      }
    }, [pages]); // This effect runs whenever the 'pages' state changes

    return (
        <div className="app-container">
            <h2 className="title">♡nishat's journal♡</h2>
            <div className="notebook">
                <div className="pages-container" ref={pagesContainerRef}>
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
