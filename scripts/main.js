//Initialize all element and other global variables
let viewScoresButton = document.querySelector("#view-high-scores");
let startButton = document.querySelector("#start-button");
let timerEl = document.querySelector("#timer");

let mainContainer = document.querySelector("main");
let quizContainerEl = document.querySelector("#quiz-container");
let headerEl = document.querySelector("h1");
let instructionsEl = document.querySelector("#instructions");
let choicesEl = document.querySelector("#choices-container");
let choiceButtons = document.querySelectorAll(".choice-button");

let highScoresList = document.querySelector("#high-scores-list");

let statusEl = document.querySelector("#answer-status-container");
let answerStatus = document.querySelector("#answer-status");

let initialsEl = document.querySelector("#initials-container");
let initialsInput = document.querySelector("#initials");
let initialsSubmitButton = document.createElement("button");
initialsSubmitButton.textContent = "Submit";
initialsEl.appendChild(initialsSubmitButton);

let scoresPageButtonsContainer = document.createElement("div");
let backButton = document.createElement("button");
let resetHighScoresButton = document.createElement("button");

let onHighScoresPage = false;

let gameInProgress = false;

let currentQuestion = 0;

let timeRemaining = 60;
let timerInterval;

let score;
let numScores = 0;
let allScores = [];
let nextScore;


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
viewScoresButton.addEventListener("click", function() {
    if (!onHighScoresPage && !gameInProgress) {
        viewScores();
    }
});

//Add event listener to start button
startButton.addEventListener("click", startQuiz);

//Add event listeners to all choice buttons
for (let i = 0; i < 4; i++) {
    choiceButtons[i].addEventListener("click", allowClicks);
}

//Add event listener to submit button
initialsSubmitButton.addEventListener("click", submitScore);

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
    //Return event listeners after one second, coinciding with the beginning of the next question
    setTimeout(function() {
        for (let i = 0; i < 4; i++) {
            choiceButtons[i].addEventListener("click", allowClicks);
        }
    }, 1000);
    currentQuestion++;
    setTimeout(takeQuiz, 1000);
}

//Make function for "home" screen, to be returned to by "back" button
function homeScreen() {
    onHighScoresPage = false;
    headerEl.textContent =  "Coding Quiz Challenge";
    instructionsEl.textContent = "Try to answer the following code-related questions within the time limit. Incorrect answers will incur a 10 second penalty!";
    startButton.style.display = "block";
    scoresPageButtonsContainer.style.display = "none";
    highScoresList.style.display = "none";
    timerEl.textContent = timeRemaining;
}

//When start button clicked, set up displays for quiz questions and start the timer
function startQuiz() {
    gameInProgress = true;
    startButton.style.display = "none";
    instructionsEl.style.display = "none";
    choicesEl.style.display = "flex";

    startTimer();
    takeQuiz();
}

//Function for timer
function startTimer() {
    timerInterval = setInterval(function() {
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
            //Remove previously populated choice from answerChoices array to be sure each choice is populated
            let chosenIndex = answerChoices.indexOf(randomChoice);
            answerChoices.splice(chosenIndex, 1);
        }

    } else {
        //If all questions are answered, end the quiz
        clearInterval(timerInterval);
        endQuiz();
    }

}

function endQuiz () {
    gameInProgress = false;
    currentQuestion = 0;
    timeRemaining = 60;
    instructionsEl.style.display = "flex";
    choicesEl.style.display = "none";
    initialsEl.style.display = "flex";
    
    score = parseInt(timerEl.textContent);

    headerEl.textContent = "Game over";
    instructionsEl.textContent = `Your final score was ${score}`;
}

function submitScore() {
    allScores[numScores] = {
        name: initialsInput.value.trim(),
        score: score.toString()
    };
    let newScore = allScores[numScores];
    numScores++;
    
    //Set local storage item with most recent score
    localStorage.setItem(`score${numScores}`, JSON.stringify(newScore));

    //Sort all scores in descending order by score, for better display of high scores on high scores page
    allScores.sort((a, b) => a.score < b.score ? 1 : -1);
    console.log(allScores);

    nextScore = document.createElement("li");
    highScoresList.appendChild(nextScore);
    viewScores();
}

function viewScores() {
    onHighScoresPage = true;
    startButton.style.display = "none";
    initialsEl.style.display = "none";
    backButton.textContent = "Back";
    resetHighScoresButton.textContent = "Reset High Scores";
    mainContainer.appendChild(scoresPageButtonsContainer);
    scoresPageButtonsContainer.setAttribute("style", "display: flex; align-items: center; justify-content: space-evenly; width: 500px;");
    scoresPageButtonsContainer.appendChild(backButton);
    scoresPageButtonsContainer.appendChild(resetHighScoresButton);


    instructionsEl.textContent = "";
    headerEl.textContent = "High Scores";

    backButton.addEventListener("click", homeScreen);
    resetHighScoresButton.addEventListener("click", resetHighScores);

    highScoresList.setAttribute("style", "display: flex; flex-direction: column;");

    //Set text content for each list item according to high score list
    let allListItems = document.querySelectorAll("li");
    for (let i = 0; i < allListItems.length; i++) {
        allListItems[i].textContent = `${allScores[i].name} - ${allScores[i].score}`;
    }

    //Bold top score
    allListItems[0].setAttribute("style", "font-weight: bold;");
}

function resetHighScores() {
    allScores = [];
    localStorage.clear();

    //Remove all list item children from high scores list
    highScoresList.innerHTML = "";
}

homeScreen();
