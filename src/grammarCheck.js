function grammarCheck(textarea) {
    textarea.addEventListener('input', function () {

      let text = this.value;

      // Capitalize the first letter of a sentence
      text = text.replace(/([.!?]\s+)([a-z])/g, function (match, p1, p2) {
        return p1 + p2.toUpperCase();
      });

      // Capitalize the first letter of the entire text
      text = text.charAt(0).toUpperCase() + text.slice(1);

      // Auto-correct 
      text = text.replace(/\bi(?=\s)/g, 'I');
      text = text.replace(/\bwont\b/gi, "won't");
      text = text.replace(/\bdont\b/gi, "don't");
      text = text.replace(/\bthats\b/gi, "that's");
      text = text.replace(/\bwhats\b/gi, "what's");
      text = text.replace(/\bwiht\b/gi, "with");
      text = text.replace(/\bte\b/gi, "the");

      this.value = text;
    });

    textarea.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        e.preventDefault();  // prevent moving focus to next element
  
        const start = this.selectionStart;
        const end = this.selectionEnd;
  
        // Insert the tab character at the current cursor position
        this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
  
        // Move the cursor to the position right after the tab character
        this.selectionStart = this.selectionEnd = start + 1;
      }
    });
  }
  
  export default grammarCheck;
  