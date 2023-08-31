const questions=[
    {
        question: "Which Java keyword is used to implement method overloading?",
        answers: [
            { text: "overload", correct: false },
            { text: "method", correct: false },
            { text: "override", correct: false },
            { text: "static", correct: false },
            { text: "none of the above", correct: true }
        ]
    },
    {
        question: "Which Java keyword is used to explicitly indicate that a method does not return any value?",
        answers: [
            { text: "void", correct: true },
            { text: "null", correct: false },
            { text: "return", correct: false },
            { text: "none", correct: false }
        ]
    },
    {
        question: "Which Java keyword is used to explicitly indicate that a method or class can be accessed without the need to create an instance of the class?",
        answers: [
            { text: "import", correct: false },
            { text: "static", correct: true },
            { text: "public", correct: false },
            { text: "new", correct: false }
        ]
    },
    {
        question: "In Java, what is a constructor?",
        answers: [
            { text: "A keyword used to define classes.", correct: false },
            { text: "A method that is used to create and initialize objects.", correct: true },
            { text: "A type of loop used for iterating over arrays.", correct: false },
            { text: "A way to access static members of a class.", correct: false }
        ]
    },
    {
        question: "What does the 'trim()' method do in Java?",
        answers: [
            { text: "Converts a string to uppercase.", correct: false },
            { text: "Removes leading and trailing whitespace from a string.", correct: true },
            { text: "Extracts a substring from a string.", correct: false },
            { text: "Replaces characters in a string.", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'synchronized' keyword in Java?",
        answers: [
            { text: "To define a method as static.", correct: false },
            { text: "To indicate that a variable is constant and cannot be changed.", correct: false },
            { text: "To specify that a class cannot be subclassed.", correct: false },
            { text: "To ensure thread safety by allowing only one thread to access a block of code at a time.", correct: true }
        ]
    },
    {
        question: "What is the purpose of the 'volatile' keyword in Java?",
        answers: [
            { text: "It indicates that a variable's value cannot be changed.", correct: false },
            { text: "It ensures that a variable is initialized with a default value.", correct: false },
            { text: "It provides synchronization between multiple threads accessing the variable.", correct: true },
            { text: "It defines a variable with a constant value.", correct: false }
        ]
    },
    {
        question: "In Java, what is the role of the 'protected' access modifier?",
        answers: [
            { text: "To indicate that a method can only be accessed within the same class.", correct: false },
            { text: "To allow a method to be overridden by subclasses.", correct: false },
            { text: "To specify that a method is static and belongs to the class.", correct: false },
            { text: "To allow access to a method within the same package and by subclasses.", correct: true }
        ]
    },
    {
        question: "What is the purpose of the 'return' keyword in Java?",
        answers: [
            { text: "To terminate the program.", correct: false },
            { text: "To define a new method.", correct: false },
            { text: "To exit the current loop iteration.", correct: false },
            { text: "To exit a method and return a value to the caller.", correct: true }
        ]
    },
    {
        question: "Which Java operator is used to compare two values for equality?",
        answers: [
            { text: "==", correct: true },
            { text: "=", correct: false },
            { text: "!=", correct: false },
            { text: "<>", correct: false }
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
