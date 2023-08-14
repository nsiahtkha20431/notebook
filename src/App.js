import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import NotebookPage from './NotebookPage';

function App() {
    const [pages, setPages] = useState([{}]);
    const pagesContainerRef = useRef(null);

    const textareaRefs = useRef([]);
    const justifyContentStyle = pages.length <= 3 ? { justifyContent: 'center' } : {};

    // Ensure the length of textareaRefs matches the pages
    if (textareaRefs.current.length !== pages.length) {
      textareaRefs.current = [...new Array(pages.length)].map(
          (_, i) => textareaRefs.current[i] || React.createRef()
      );
    }

    const getCurrentDate = () => {
      const date = new Date();
      // Format date as "YYYY-MM-DD"
      return date.toISOString().split('T')[0];
    }

    const currentDate = getCurrentDate();

    const addPage = () => {
        setPages([...pages, {}]);
    }

    const deletePage = (index) => {
      const isLastPage = index === pages.length - 1;
      const newPages = [...pages];
      newPages.splice(index, 1);
      
      setPages(newPages);
  
      setTimeout(() => {
          if (isLastPage && pagesContainerRef.current) {
              const pageWidth = 612; // Adjust this to the actual width of your NotebookPage component
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

    useEffect(() => {
      textareaRefs.current.forEach((ref, index) => {
          const handleInput = () => {
              if (ref.current.scrollHeight > ref.current.clientHeight) {
                  if (index === pages.length - 1) {  // If it's the last page
                      addPage();
                  } else {
                      textareaRefs.current[index + 1].current.focus();
                  }
              }
          };

          if (ref.current) {
              ref.current.addEventListener('input', handleInput);
          }
          
          return () => {
              if (ref.current) {
                  ref.current.removeEventListener('input', handleInput);
              }
          };
      });
  }, [pages]);

  function handleSave() {
    const textToSave = pages.map((_, index) => {
      if (textareaRefs.current[index] && textareaRefs.current[index].current) {
        return textareaRefs.current[index].current.value;
      }
      return "";
    }).join("\n\n");  // This separates each page with two newline characters
  
    const blob = new Blob([textToSave], { type: "text/plain;charset=utf-8" });
    const href = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = href;
    link.download = 'journalentries.txt';
    link.click(); // This simulates a click
  
    // Revoking the created URL to free up resources
    URL.revokeObjectURL(href);
  }
  

    return (
        <div className="app-container">
            <h2 className="title">♡nishat's journal♡</h2>
            <div className="notebook">
              <span className="current-date">{currentDate}</span>
              <div 
                className="pages-container" 
                ref={pagesContainerRef} 
                style={justifyContentStyle}
              >
                {pages.map((_, index) => (
                    <NotebookPage 
                      key={index} 
                      onDelete={() => deletePage(index)} 
                      textareaRef={textareaRefs.current[index]}
                    />
                ))}
              </div>
              <button onClick={addPage} className="add-page-btn">→</button>
              <button onClick={handleSave} className="save-btn">Save</button>
            </div>
        </div>
    );
}

export default App;
