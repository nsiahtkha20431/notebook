import Typo from "typo-js";

const dictionary = new Typo("en_US");

const autoCorrect = (textarea) => {
  textarea.addEventListener("input", () => {
    const words = textarea.value.split(/\s+/);
    const correctedWords = words.map((word) => {
      if (!dictionary.check(word)) {
        const suggestions = dictionary.suggest(word);
        return suggestions[0] || word;
      }
      return word;
    });
    textarea.value = correctedWords.join(" ");
  });
};

export default autoCorrect;
