const Stack = require("../lib/stack");

const isPalindrome = (sentence) => {
  sentence = sentence.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  const middle = Math.floor(sentence.length / 2);
  const stack = new Stack();
  for (let i = 0; i < middle; i++){
    stack.push(sentence[i]);
  }
  for (let i = sentence.length % 2 === 0 ? middle : middle + 1; i < sentence.length; i++) {
    if (stack.pop() !== sentence[i]) return false;
  }
  return true;
};

module.exports = isPalindrome;
