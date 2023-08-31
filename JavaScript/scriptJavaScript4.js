const questions=[
    {
        question: "What is the purpose of the 'async' keyword in JavaScript?",
        answers: [
            { text: "To declare a variable as asynchronous.", correct: false },
            { text: "To create an asynchronous function.", correct: true },
            { text: "To define a variable as constant.", correct: false },
            { text: "To indicate an anonymous function.", correct: false }
        ]
    },
    {
        question: "Which JavaScript method is used to remove the first element from an array?",
        answers: [
            { text: "shift()", correct: true },
            { text: "remove()", correct: false },
            { text: "delete()", correct: false },
            { text: "splice()", correct: false }
        ]
    },
    {
        question: "What does the 'NaN' value indicate when used in a mathematical operation?",
        answers: [
            { text: "It indicates a negative value.", correct: false },
            { text: "It indicates a null value.", correct: false },
            { text: "It indicates a non-numeric value.", correct: true },
            { text: "It indicates a no-action-needed value.", correct: false }
        ]
    },
    {
        question: "In JavaScript, what is the purpose of the 'call()' method?",
        answers: [
            { text: "To invoke a function.", correct: true },
            { text: "To create a new function.", correct: false },
            { text: "To log a message to the console.", correct: false },
            { text: "To define a new object.", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'reduce()' method in JavaScript?",
        answers: [
            { text: "To remove elements from an array.", correct: false },
            { text: "To filter an array based on a condition.", correct: false },
            { text: "To apply a function to each element in an array and accumulate a single result.", correct: true },
            { text: "To sort the elements of an array.", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'setTimeout()' function in JavaScript?",
        answers: [
            { text: "To immediately execute a function.", correct: false },
            { text: "To create a new thread for concurrent execution.", correct: false },
            { text: "To delay the execution of a function for a specified time interval.", correct: true },
            { text: "To set up an interval for repetitive execution of a function.", correct: false }
        ]
    },
    {
        question: "Which JavaScript method is used to join the elements of an array into a string?",
        answers: [
            { text: "concat()", correct: false },
            { text: "join()", correct: true },
            { text: "merge()", correct: false },
            { text: "combine()", correct: false }
        ]
    },
    {
        question: "In JavaScript, what is the role of the 'addEventListener()' method?",
        answers: [
            { text: "To append new elements to the DOM.", correct: false },
            { text: "To attach event handlers to HTML elements.", correct: true },
            { text: "To modify the CSS styles of an element.", correct: false },
            { text: "To create asynchronous functions.", correct: false }
        ]
    },
    {
        question: "What does the 'isNaN()' function in JavaScript check for?",
        answers: [
            { text: "Whether a value is not a number.", correct: true },
            { text: "Whether a value is an integer.", correct: false },
            { text: "Whether a value is a string.", correct: false },
            { text: "Whether a value is a positive number.", correct: false }
        ]
    },
    {
        question: "Which JavaScript operator is used for the logical OR operation?",
        answers: [
            { text: "||", correct: true },
            { text: "&&", correct: false },
            { text: "!", correct: false },
            { text: "|", correct: false }
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
