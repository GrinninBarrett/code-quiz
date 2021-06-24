let viewScoresButton = document.querySelector("#view-high-scores");
let startButton = document.querySelector("#start-button");
let timerEl = document.querySelector("#timer");
let headerEl = document.querySelector("h1");
let instructionsEl = document.querySelector("#instructions");
let choicesEl = document.querySelector("#choices-container");
let choiceButtons = document.querySelectorAll(".choice-button");

let statusEl = document.querySelector("#answer-status-container");
let answerStatus = document.querySelector("#answer-status");

let initialsEl = document.querySelector("#initials-container");
let initialsInput = document.querySelector("#initials");
let initialsSubmitButton = document.createElement("button");

let currentQuestion = 0;

let timeRemaining = 60;


//Create array of objects of all questions, including their answers
let questions = [

    {
        question: "What is the official name of JavaScript?",
        correctAnswer: "ECMAScript",
        wrongOne: "TypeScript",
        wrongTwo: "CoffeeScript",
        wrongThree: "Java",
    },

    {
        question: "Inside which HTML element do we link the JavaScript?",
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


//Add event listener to the "view high scores" button
// viewScoresButton.addEventListener("click", viewScores);

//Add event listener to start button
startButton.addEventListener("click", startQuiz);

//Add event listeners to all choice buttons
for (let i = 0; i < 4; i++) {
    choiceButtons[i].addEventListener("click", allowClicks);
}

function allowClicks(event) {
    event.preventDefault();

    //Check if the button clicked is the correct answer, and if not, deduct points
    if (event.target.textContent === questions[currentQuestion].correctAnswer) {
        answerStatus.textContent = "Correct!";
        event.target.setAttribute("style", "background-color: #59DD9B;");
        setTimeout(function() {
            answerStatus.textContent = "";
            event.target.setAttribute("style", "background-color: #6E7F76;")
        }, 1000);
    } else {
        timeRemaining -= 10;
        answerStatus.textContent = "Wrong!";
        event.target.setAttribute("style", "background-color: #FFAE8D;");
        setTimeout(function() {
            answerStatus.textContent = "";
            event.target.setAttribute("style", "background-color: #6E7F76;")
        }, 1000);        
    }
    //Temporarily remove event listeners for choice buttons to avoid users clicking multiple answers for the same question
    for (let i = 0; i < 4; i++) {
        choiceButtons[i].removeEventListener("click", allowClicks);
    }
    //Return event listeners
    setTimeout(function() {
        for (let i = 0; i < 4; i++) {
            choiceButtons[i].addEventListener("click", allowClicks);
        }
    }, 1000);
    currentQuestion++;
    setTimeout(takeQuiz, 1000);
}

//When start button clicked, set up displays for quiz questions and start the timer
function startQuiz() {
    startButton.style.display = "none";
    instructionsEl.style.display = "none";
    choicesEl.style.display = "flex";

    startTimer();
    takeQuiz();
}

function startTimer() {
    let timerInterval = setInterval(function() {
        timeRemaining--;
        timerEl.textContent = timeRemaining;

        //If timer reaches 0, end quiz
        if (timeRemaining === 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function takeQuiz() {

    if (currentQuestion <= 4) {

        //Display current question
        headerEl.textContent = questions[currentQuestion].question;

        //Form new array with current question's answer choices
        let answerChoices = [
            questions[currentQuestion].correctAnswer, 
            questions[currentQuestion].wrongOne, 
            questions[currentQuestion].wrongTwo, 
            questions[currentQuestion].wrongThree
        ];
    
        //Randomly populate choice buttons with answer choices for increased retake value
        let  populated = [];
    
        for (let i = 0; i < 4; i++) {
            let randomChoice = answerChoices[Math.floor(Math.random() * answerChoices.length)];
    
            choiceButtons[i].textContent = randomChoice;
            populated.push(randomChoice);
            //Remove previously populated choice from answerChoices array
            let chosenIndex = answerChoices.indexOf(randomChoice);
            answerChoices.splice(chosenIndex, 1);
        }

    } else {
        //If all questions are answered, end the quiz
        endQuiz();
    }

}

function endQuiz () {
    instructionsEl.style.display = "flex";
    choicesEl.style.display = "none";
    initialsEl.style.display = "flex";

    initialsSubmitButton.textContent = "Submit";
    // initialsSubmitButton.setAttribute("style", "margin: 15px auto;")
    initialsEl.appendChild(initialsSubmitButton);
    initialsSubmitButton.addEventListener("click", submitScore);
    
    let score = parseInt(timerEl.textContent);
    instructionsEl.textContent = `Your final score was ${score}`;
    headerEl.textContent = "Game over";
}

function submitScore() {

}
