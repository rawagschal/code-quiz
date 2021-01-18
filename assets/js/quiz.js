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



// element vars w/ El suffix to identify as a DOM element
var quizEl = document.getElementById("quiz-screen");
var startBtnEl = document.getElementById("start-quiz");
var timerEl = document.getElementById("time");
var questionEl = document.getElementById("question");
var optionsEl = document.getElementById("options");
var initialsEl = document.getElementById("initials");
var submitBtnEl = document.getElementById("submit");


startBtnEl.onclick = startQuiz;

// start quiz function
function startQuiz() {
    var startScreen = document.getElementById("start-screen");
    startScreen.setAttribute("class", "hide");

    quizEl.removeAttribute("class");
};




