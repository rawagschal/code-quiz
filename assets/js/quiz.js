var questions = [
    {
        question: "What HTML tag is used to link a javascript file?",
        options: ["<link>", "<a>", "<script>", "<meta>"],
        answer: "<script>"
    },
    {
        question: "Where in your HTML should you link your javascript file?",
        options: ["at the top of the <head> section", "at the top of the <body> section", "at the bottom of the <head> section", "at the bottom of the <body> section"],
        answer: "at the bottom of the <body> section"
    },
    {
        question: "Which is the keyword used to declare a function?",
        options: ["function", "var", "declare", "if"],
        answer: "function"
    },
    {
        question: "Arrays must be wrapped in:",
        options: ["curly brackets", "square brackets", "parentheses", "quotes"],
        answer: "square brackets"
    },
    {
        question: "True or false: the window.alert() function asks the user to send information.",
        options: ["true", "false"],
        answer: "false"
    }
];

// quiz state vars
var questionIndex = 0;
var time = questions.length * 15;
var timerId;


// element vars w/ El suffix to identify as a DOM element
var quizEl = document.getElementById("quiz-screen");
var timerEl = document.getElementById("time");
var startBtnEl = document.getElementById("start-quiz");
var optionsEl = document.getElementById("options");
var hintEl = document.getElementById("hint");
var initialsEl = document.getElementById("initials");
var submitBtnEl = document.getElementById("submit");


startBtnEl.onclick = startQuiz;

// start quiz function
function startQuiz() {
    var startScreen = document.getElementById("start-screen");
    startScreen.setAttribute("class", "hide");
    
    // show quiz-screen
    quizEl.removeAttribute("class");

    // start timer
    timerId = setInterval(updateTime, 1000);

    // show time
    timerEl.textContent = time;

    getQuestion();
};

function getQuestion() {

    // get current question
    var currentQuestion = questions[questionIndex];

    // show current question
    var questionEl = document.getElementById("question");
    questionEl.textContent = currentQuestion.question

    // clear any options from previous question
    optionsEl.innerHTML = "";

    // loop over options
    currentQuestion.options.forEach(function(option) {
        // button for each option
        var optionBtn = document.createElement("button");
        optionBtn.setAttribute("value", option);
        optionBtn.setAttribute("class", "option");
        optionBtn.setAttribute("id", "option");
        optionBtn.textContent = option;

        optionBtn.onclick = optionClick;

        // append button to display with options
        optionsEl.appendChild(optionBtn);

    });
}

function optionClick() {

    //incorrect guess
    if (this.value !== questions[questionIndex].answer) {
        console.log(this.value);
        // take away time
        time -= 10;

        // handle negative time
        if (time < 0) {
            time === 0;
            setTimeout(function() {
                endQuiz();
            }, 2000);
        }

        // display new time
        timerEl.textContent = time;
        
        // change button color 
        optionBtn = this.setAttribute("class", "option wrong");
        
        // display hint
        hintEl.textContent = "Wrong Answer!"
    } else {
        optionBtn = this.setAttribute("class", "option right");
        hintEl.textContent = "Nice Job!";
    }

    // flash hint for only a second
    hintEl.setAttribute("class", "hint");
    setTimeout(function() { 
        hintEl.setAttribute("class", "hint hide");
    }, 2000);

    questionIndex++;

    // check if no more questions
    if (questionIndex === questions.length) {
        setTimeout(function() {
            endQuiz();
        }, 2000);
    } else {
        setTimeout(function() {
            getQuestion();
        }, 2000);
    }
}

function updateTime() {
    // update time every 1000ms according to setInterval() in getQuestion()
    time--;
    timerEl.textContent = time;

    // end quiz when time = 0
    if (time <= 0) {
        console.log("Time's up");
        setTimeout(function() {
            endQuiz();
        }, 2000);
    }
}

function endQuiz() {
    // stop timer 
    clearInterval(timerId);

    // show end screen
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

    // show final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    // hide quiz screen
    quizEl.setAttribute("class", "hide");
}

function saveHighscore() {
    // get initials from dom el and trim whitespace
    var initials = initialsEl.value.trim();

    // if entered, save score
    if (initials !== "") {
        // get any saved scores or save to empty array
        var highscores = 
        JSON.parse(window.localstorage.getItem("highscores")) || [];

        // new score object
        var newScore = {
            score: time,
            initials: initials
        };

        //save to local storage
        highscores.push(newScore);
        window.localstorage.setItem("highscores", JSON.stringify(highscores));

        // redirect to highscores page
        window.location.href = "scoreboard.html";

     };
    // else {
    //     window.alert("You need to enter your initials to save your score!");
    // };
}

submitBtnEl.onclick = saveHighscore;
