// This is in a separate file to better allow for future expansion of the quiz without taking up too much space in main.js


//Create array of objects containing all questions and their answers
let questions = [

    {
        question: "What is the official name of JavaScript?",
        correctAnswer: "ECMAScript",
        wrongOne: "TypeScript",
        wrongTwo: "CoffeeScript",
        wrongThree: "Java",
    },

    {
        question: "Inside which HTML element do we link a JavaScript file?",
        correctAnswer: "<script>",
        wrongOne: "<javascript>",
        wrongTwo: "<scripting>",
        wrongThree: "<js>",
    },

    {
        question: `How do you write "Hello, World" in an alert box?`,
        correctAnswer: `alert("Hello, World");`,
        wrongOne: `alertBox("Hello, World");`,
        wrongTwo: `console.log("Hello, World");`,
        wrongThree: `msg("Hello, World");`,
    },

    {
        question: `What method is used to add an element to a JavaScript array?`,
        correctAnswer: `push()`,
        wrongOne: `pop()`,
        wrongTwo: `concat()`,
        wrongThree: `splice()`,
    },

    {
        question: `Which of these is a correct way to declare a function?`,
        correctAnswer: `function funkyTown() {};`,
        wrongOne: `let funkyTown = [];`,
        wrongTwo: `var funkyTown = function {};`,
        wrongThree: `function.funkyTown = () {}`,
    }

];