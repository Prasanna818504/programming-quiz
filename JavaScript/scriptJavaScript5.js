const questions=[
    {
        question: "What is the purpose of the 'let' keyword in JavaScript?",
        answers: [
            { text: "To define a constant variable.", correct: false },
            { text: "To declare a variable with block scope.", correct: true },
            { text: "To create a global variable.", correct: false },
            { text: "To create a function.", correct: false }
        ]
    },
    {
        question: "In JavaScript, what is the role of the 'Promise' object?",
        answers: [
            { text: "To manipulate the Document Object Model (DOM).", correct: false },
            { text: "To store data in a key-value format.", correct: false },
            { text: "To represent a value that may be available now, in the future, or never.", correct: true },
            { text: "To create a dynamic user interface.", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'toLowerCase()' method in JavaScript?",
        answers: [
            { text: "To convert a string to uppercase.", correct: false },
            { text: "To remove leading and trailing whitespace from a string.", correct: false },
            { text: "To check if a string starts with a specific substring.", correct: false },
            { text: "To convert a string to lowercase.", correct: true }
        ]
    },
    {
        question: "What is the role of the 'getElementById()' method in JavaScript?",
        answers: [
            { text: "To select HTML elements by their class name.", correct: false },
            { text: "To retrieve data from an external server.", correct: false },
            { text: "To manipulate the styles of a CSS class.", correct: false },
            { text: "To select an HTML element by its ID.", correct: true }
        ]
    },
    {
        question: "Which JavaScript array method is used to remove elements from an array and replace them with new elements?",
        answers: [
            { text: "splice()", correct: true },
            { text: "slice()", correct: false },
            { text: "replace()", correct: false },
            { text: "shift()", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'async/await' syntax in JavaScript?",
        answers: [
            { text: "To create asynchronous functions.", correct: true },
            { text: "To define constants.", correct: false },
            { text: "To concatenate strings.", correct: false },
            { text: "To remove elements from an array.", correct: false }
        ]
    },
    {
        question: "Which JavaScript method is used to convert a string to lowercase?",
        answers: [
            { text: "lower()", correct: false },
            { text: "toLowerCase()", correct: true },
            { text: "caseLower()", correct: false },
            { text: "toLower()", correct: false }
        ]
    },
    {
        question: "Which operator is used to compare both value and type in JavaScript?",
        answers: [
            { text: "==", correct: false },
            { text: "===", correct: true },
            { text: "=", correct: false },
            { text: "!==", correct: false }
        ]
    },
    {
        question: "Which built-in function is used to convert a string to an integer in JavaScript?",
        answers: [
            { text: "parseInteger()", correct: false },
            { text: "toInt()", correct: false },
            { text: "parseInt()", correct: true },
            { text: "stringToNumber()", correct: false }
        ]
    },
    {
        question: "What is the role of the 'try' and 'catch' blocks in JavaScript?",
        answers: [
            { text: "To create loops.", correct: false },
            { text: "To define conditional statements.", correct: false },
            { text: "To handle exceptions and prevent program crashes.", correct: true },
            { text: "To convert data types.", correct: false }
        ]
    }    
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Attempt Next One";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score}out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }

}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
