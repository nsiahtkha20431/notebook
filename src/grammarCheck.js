function grammarCheck(textarea) {
    textarea.addEventListener('input', function () {
      let text = this.value;
      text = text.replace(/([.!?]\s+)([a-z])/g, function (match, p1, p2) {
        return p1 + p2.toUpperCase();
      });
      text = text.charAt(0).toUpperCase() + text.slice(1);
      this.value = text;
    });
  }
  
  export default grammarCheck;
  