const Stack = require("../lib/stack");

const precedence = {
    "+": 0,
    "-": 0, 
    "*": 1,
    "/": 1,
}

const postfix = (expression) => {

    const result = [];
    const stack = new Stack();
    const operators = "+-*/";
    expression = expression.replace(/\s/g, "");
    // look at each character in the expression
    expression.split("").forEach((char) => {
        // if it's an open parentheses, add to stack
        if (char === "(") {
            stack.push(char);
        } else {
            // if it's a close parentheses, 
            if (char === ")") {
                // grab the top of the stack
                let top = stack.pop();
                // add from the stack to the result until reaching an open parentheses
                while (top !== "(") {
                    result.push(top);
                    top = stack.pop();
                }
            } else {
                // if it's an operator
                if (operators.includes(char)) {
                    // if the stack isn't empty
                    // or if the stack top isn't an open parentheses
                    // or if the stack top is a lower precedece than it
                    if (
                        !stack.top ||
                        stack.top.value === "(" ||
                        precedence[char] > precedence[stack.top.value]
                    ) {
                        // add it onto the stack
                        stack.push(char);
                    } else {
                        // if the stack has something on it
                        // AND that something is of greater or equal precedence
                        // repeat this until no longer true
                        while (stack.top && precedence[stack.top.value] >= precedence[char]) {
                            // take it off the stack, and add it to the result
                            result.push(stack.pop());
                        }
                        // add it onto the stack
                        stack.push(char);
                    }
                } else {
                    // else add it onto the stack
                    result.push(char);
                }
            }
        }
    });
    // put everything else on the stack into the result
    while (stack.top) {
        const popped = stack.pop();
        result.push(popped);
    }
    // return the result as a space-separated string
    return result.join(" ");
};


module.exports = postfix;
