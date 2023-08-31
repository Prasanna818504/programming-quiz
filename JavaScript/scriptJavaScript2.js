const questions=[
    {
        question: "Which JavaScript keyword is used to declare a constant variable?",
        answers: [
            { text: "const", correct: true },
            { text: "let", correct: false },
            { text: "var", correct: false },
            { text: "constant", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'map' method in JavaScript?",
        answers: [
            { text: "To create a new array with the results of calling a provided function on every element in the array.", correct: true },
            { text: "To remove elements from an array.", correct: false },
            { text: "To sort the elements of an array.", correct: false },
            { text: "To concatenate arrays.", correct: false }
        ]
    },
    {
        question: "What is the output of the following code?\nconsole.log(typeof NaN);",
        answers: [
            { text: "number", correct: true },
            { text: "NaN", correct: false },
            { text: "string", correct: false },
            { text: "undefined", correct: false }
        ]
    },
    {
        question: "In JavaScript, what is the purpose of the 'document' object?",
        answers: [
            { text: "To manipulate HTML elements.", correct: true },
            { text: "To declare variables.", correct: false },
            { text: "To perform mathematical calculations.", correct: false },
            { text: "To store user input.", correct: false }
        ]
    },
    {
        question: "Which JavaScript function is used to generate a random number?",
        answers: [
            { text: "randomNumber()", correct: false },
            { text: "generateRandom()", correct: false },
            { text: "random()", correct: true },
            { text: "rand()", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'parseInt()' function in JavaScript?",
        answers: [
            { text: "To parse JSON data.", correct: false },
            { text: "To convert a number to a string.", correct: false },
            { text: "To convert a string to an integer.", correct: true },
            { text: "To round a number to the nearest integer.", correct: false }
        ]
    },
    {
        question: "What does the 'NaN' stand for in JavaScript?",
        answers: [
            { text: "New Array Notation", correct: false },
            { text: "Not a Name", correct: false },
            { text: "Null or Nothing", correct: false },
            { text: "Not-a-Number", correct: true }
        ]
    },
    {
        question: "Which JavaScript function is used to convert a value to a string?",
        answers: [
            { text: "toString()", correct: true },
            { text: "convertToString()", correct: false },
            { text: "stringify()", correct: false },
            { text: "toStr()", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'includes' method in JavaScript?",
        answers: [
            { text: "To remove elements from an array.", correct: false },
            { text: "To check if an array contains a specific element.", correct: true },
            { text: "To sort the elements of an array.", correct: false },
            { text: "To concatenate arrays.", correct: false }
        ]
    },
    {
        question: "Which JavaScript event is triggered when an HTML element loses focus?",
        answers: [
            { text: "onfocus", correct: false },
            { text: "onblur", correct: true },
            { text: "onchange", correct: false },
            { text: "onlosefocus", correct: false }
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
