import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import NotebookPage from './NotebookPage';

function App() {
    const [pages, setPages] = useState([{}]);
    const pagesContainerRef = useRef(null);

    const addPage = () => {
        setPages([...pages, {}]);
    }

    // const deletePage = (index) => {
    //     const newPages = [...pages];
    //     newPages.splice(index, 1);
    //     setPages(newPages);
    // }

    const deletePage = (index) => {
      const isLastPage = index === pages.length - 1;
      const newPages = [...pages];
      newPages.splice(index, 1);
      
      setPages(newPages);
  
      // Introduce a slight delay to ensure React has completed its rendering
      setTimeout(() => {
          if (isLastPage && pagesContainerRef.current) {
              const pageWidth = 550; // Adjust this to the actual width of your NotebookPage component
              const newScrollPosition = pagesContainerRef.current.scrollLeft - pageWidth;
  
              pagesContainerRef.current.scrollTo({
                  left: newScrollPosition,
                  behavior: 'smooth'
              });
          }
      }, 0);
    }
  
  

    // Scroll to the latest page when a new one is added
    useEffect(() => {
      if (pagesContainerRef.current) {
          pagesContainerRef.current.scrollTo({
              left: pagesContainerRef.current.scrollWidth,
              behavior: 'smooth'
          });
      }
    }, [pages]);

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
