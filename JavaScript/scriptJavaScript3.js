const questions=[
    {
        question: "What is the purpose of the 'JSON.stringify()' method in JavaScript?",
        answers: [
            { text: "To parse a JSON string into a JavaScript object.", correct: false },
            { text: "To convert a JavaScript object to a JSON string.", correct: true },
            { text: "To create a new JSON object.", correct: false },
            { text: "To format a JSON string.", correct: false }
        ]
    },
    {
        question: "Which JavaScript array method is used to add elements to the beginning of an array?",
        answers: [
            { text: "push()", correct: false },
            { text: "unshift()", correct: true },
            { text: "add()", correct: false },
            { text: "insert()", correct: false }
        ]
    },
    {
        question: "What is the output of the following code?\nconsole.log(0.1 + 0.2 === 0.3);",
        answers: [
            { text: "true", correct: true },
            { text: "false", correct: false },
            { text: "0.1 + 0.2", correct: false },
            { text: "0.3", correct: false }
        ]
    },
    {
        question: "In JavaScript, what does the 'spread operator' (...) do?",
        answers: [
            { text: "It performs bitwise operations.", correct: false },
            { text: "It converts values to strings.", correct: false },
            { text: "It unpacks elements from an array.", correct: true },
            { text: "It creates new objects.", correct: false }
        ]
    },
    {
        question: "Which JavaScript function is used to retrieve the length of an array?",
        answers: [
            { text: "lengthOf()", correct: false },
            { text: "size()", correct: false },
            { text: "length()", correct: true },
            { text: "count()", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'localStorage' object in JavaScript?",
        answers: [
            { text: "To manage the layout and design of a webpage.", correct: false },
            { text: "To store data locally in a user's browser.", correct: true },
            { text: "To manipulate the structure of the DOM.", correct: false },
            { text: "To send HTTP requests.", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'querySelector()' method in JavaScript?",
        answers: [
            { text: "To select and modify HTML elements by their class name.", correct: false },
            { text: "To retrieve data from a server using an HTTP request.", correct: false },
            { text: "To select and modify HTML elements by their ID.", correct: false },
            { text: "To select and modify HTML elements using CSS selectors.", correct: true }
        ]
    },
    {
        question: "In JavaScript, what does the 'forEach()' method do?",
        answers: [
            { text: "It creates a new array by applying a function to each element.", correct: false },
            { text: "It modifies the elements of an array using a provided function.", correct: false },
            { text: "It loops through each element in an array and applies a function to it.", correct: true },
            { text: "It returns the first element that matches a given condition.", correct: false }
        ]
    },
    {
        question: "In JavaScript, what does the 'bind()' method do?",
        answers: [
            { text: "It creates a new function that binds to a specific object.", correct: true },
            { text: "It binds multiple functions together.", correct: false },
            { text: "It binds a variable to a function.", correct: false },
            { text: "It binds an event handler to an element.", correct: false }
        ]
    },
    {
        question: "Which JavaScript operator is used for the logical AND operation?",
        answers: [
            { text: "&&", correct: true },
            { text: "||", correct: false },
            { text: "!", correct: false },
            { text: "&", correct: false }
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
