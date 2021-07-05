const Stack = require("../lib/stack");

const postfix = (expression) => {
    let result = "";
    const stack = new Stack();
    const expNoSpaces = expression.replace(/\s/g, "");
    const operators = ["*", "/", "+", "-"];
    const higherOperators = ["*", "/"];
    const lowerOperators = ["+", "-"];
    for (let i = 0; i < expNoSpaces.length; i++) {
        if (!operators.includes(expNoSpaces[i])) {
            result += expNoSpaces[i];
        }
        if (operators.includes(expNoSpaces[i])) {
            const topOfStack = stack.top;
            if (topOfStack === null || (
                lowerOperators.includes(topOfStack) && higherOperators.includes(expNoSpaces[i])
                ) || topOfStack === "(") {
                stack.push(expNoSpaces[i]);
            } else {
                while (topOfStack === "(" || topOfStack === ")" || (
                    higherOperators.includes(topOfStack) && lowerOperators.includes(expNoSpaces[i])
                )) {
                    const popped = stack.pop();
                    result += popped;
                    stack.push(expNoSpaces[i]);
                }
            }
        } else if (expNoSpaces[i] === "(") {
            stack.push(expNoSpaces[i]);
        } else if (expNoSpaces[i] === ")") {
            while (topOfStack !== "(") {
                const popped = stack.pop();
                result += popped;
            }
        }
        const popped = stack.pop();
        result += popped;
    }
    return result;
};
console.log(postfix("2 + 3"))
console.log("should be 23+")
module.exports = postfix;
