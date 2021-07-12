//Initialize all element and other global variables
let viewScoresButton = document.querySelector("#view-high-scores");
let startButton = document.querySelector("#start-button");
let timerEl = document.querySelector("#timer");

//Main quiz section elements
let mainContainer = document.querySelector("main");
let quizContainerEl = document.querySelector("#quiz-container");
let headerEl = document.querySelector("h1");
let instructionsEl = document.querySelector("#instructions");
let choicesEl = document.querySelector("#choices-container");
let choiceButtons = document.querySelectorAll(".choice-button");

let highScoresList = document.querySelector("#high-scores-list");

let statusEl = document.querySelector("#answer-status-container");
let answerStatus = document.querySelector("#answer-status");

//Elements related to high scores
let initialsEl = document.querySelector("#initials-container");
let initialsInput = document.querySelector("#initials");
let initialsSubmitButton = document.querySelector("#initials-submit-button");

//Buttons for high scores page
let highScoresPageButtons = document.querySelector("#high-scores-buttons");
let backButton = document.querySelector("#back");
let resetHighScoresButton = document.querySelector("#reset");

//To be sure the "view high scores" button can't be activated if already on the high scores page or if game is in progress
let onHighScoresPage = false;
let gameInProgress = false;

let currentQuestion = 0;
let timeRemaining = 60;
let timerInterval;


//Retrieve numScores and allScores from local storage if present, set to 0 and [] if not
let numScores = localStorage.getItem("numScores") || 0;
let allScores = JSON.parse(localStorage.getItem("allScores") || "[]");

let score;
let nextScore;


//Add event listeners to buttons (view high scores, start, answer choices, initials submit, back, and reset)
viewScoresButton.addEventListener("click", function() {
    if (!onHighScoresPage && !gameInProgress) {
        viewScores();
    }
});

startButton.addEventListener("click", startQuiz);

for (let i = 0; i < 4; i++) {
    choiceButtons[i].addEventListener("click", chooseAnswer);
}

initialsSubmitButton.addEventListener("click", submitScore);

backButton.addEventListener("click", homeScreen);
resetHighScoresButton.addEventListener("click", resetHighScores);


//Make function for "home" screen, to be returned to by "back" button
function homeScreen(event) {
    event.preventDefault();

    onHighScoresPage = false;
    headerEl.textContent =  "Coding Quiz Challenge";
    instructionsEl.textContent = "Try to answer the following code-related questions within the time limit. Incorrect answers will incur a 10 second penalty!";
    startButton.style.display = "block";
    highScoresPageButtons.style.display = "none";
    highScoresList.style.display = "none";
    //Remove all high scores list elements, which will be added back upon calling viewScores
    highScoresList.innerHTML = "";
    timerEl.textContent = timeRemaining;
}

//When start button clicked, set up displays for quiz questions, start the timer, and begin quiz
function startQuiz(event) {
    event.preventDefault();

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


//Show questions and answer choice buttons
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

            //Remove previously populated choice from answerChoices array to be sure each choice is populated and none are populated twice
            let chosenIndex = answerChoices.indexOf(randomChoice);
            answerChoices.splice(chosenIndex, 1);
        }

    } else {
        //If all questions are answered, end the quiz
        clearInterval(timerInterval);
        endQuiz();
    }

}

//For when an answer choice is clicked
function chooseAnswer(event) {
    event.preventDefault();

    //Check if the button clicked is the correct answer, and if not, deduct time
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
        choiceButtons[i].removeEventListener("click", chooseAnswer);
    }
    //Return event listeners after one second, coinciding with the beginning of the next question
    setTimeout(function() {
        for (let i = 0; i < 4; i++) {
            choiceButtons[i].addEventListener("click", chooseAnswer);
        }
    }, 1000);
    currentQuestion++;
    setTimeout(takeQuiz, 1000);
}

//For when all questions are answered or timer has run out
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

//Enter initials and high score, and set this info to local storage
function submitScore(event) {
    //Check if input contains actual characters, alerting if not and proceeding if so
    if (initialsInput.value.trim().length === 0) {
        event.preventDefault();
        alert("Please enter your initials!");
    } else {
        allScores[numScores] = {
            name: initialsInput.value.trim(),
            score: score
        };
        let newScore = allScores[numScores];
        numScores++;
        initialsInput.value = "";
        
        //Set local storage item with most recent score
        localStorage.setItem(`score${numScores}`, JSON.stringify(newScore));
        localStorage.setItem("numScores", numScores);
    
        //Sort all scores in descending order by score, for better display of high scores on high scores page
        allScores.sort((a, b) => a.score < b.score ? 1 : -1);
        localStorage.setItem("allScores", JSON.stringify(allScores));

        event.preventDefault();
    
        viewScores();
    
    }
}

//Show high scores page
function viewScores() {

    onHighScoresPage = true;
    startButton.style.display = "none";
    initialsEl.style.display = "none";

    //Show back and reset buttons
    highScoresPageButtons.style.display = "flex";

    instructionsEl.textContent = "";
    headerEl.textContent = "High Scores";

    highScoresList.style.display = "flex";

    if (numScores !== 0) {
        //Add list elements in this function to be sure they appear from view high scores button even after page reload
        for (let i = 0; i < numScores; i++) {
            nextScore = document.createElement("li");
            highScoresList.appendChild(nextScore);
        }

        //Set text content for each list item according to high score list
        let allListItems = document.querySelectorAll("li");
        for (let i = 0; i < allListItems.length; i++) {
            allListItems[i].textContent = `${allScores[i].name}: ${allScores[i].score}`;
        }

        //Bold highest score
        allListItems[0].setAttribute("style", "font-weight: bold;");
    }

}

//Remove all high scores from local storage and allScores array
function resetHighScores() {
    allScores = [];
    localStorage.clear();
    numScores = 0;

    //Remove all list item children from high scores list
    highScoresList.innerHTML = "";
}