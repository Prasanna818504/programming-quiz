const questions=[
    {
        question: "Which keyword is used to define a class in Java?",
        answers: [
            { text: "class", correct: true },
            { text: "type", correct: false },
            { text: "struct", correct: false },
            { text: "interface", correct: false }
        ]
    },
    {
        question: "What is a Java method?",
        answers: [
            { text: "A data type used to store numbers.", correct: false },
            { text: "A block of code that performs a specific task and can be invoked when needed.", correct: true },
            { text: "A loop used for iterating over collections.", correct: false },
            { text: "A graphical user interface (GUI) component.", correct: false }
        ]
    },
    {
        question: "In Java, which data type is used to store whole numbers?",
        answers: [
            { text: "float", correct: false },
            { text: "int", correct: true },
            { text: "double", correct: false },
            { text: "number", correct: false }
        ]
    },
    {
        question: "What does the 'public' keyword mean in Java?",
        answers: [
            { text: "It declares a method that can only be accessed within the same class.", correct: false },
            { text: "It defines a private member variable.", correct: false },
            { text: "It specifies that a method can be accessed from any class.", correct: true },
            { text: "It indicates a variable is constant.", correct: false }
        ]
    },
    {
        question: "Which Java keyword is used to create an object?",
        answers: [
            { text: "make", correct: false },
            { text: "object", correct: false },
            { text: "new", correct: true },
            { text: "create", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'static' keyword in Java?",
        answers: [
            { text: "It indicates that a method should not be overridden.", correct: false },
            { text: "It specifies that a variable's value cannot be changed.", correct: false },
            { text: "It allows a method or variable to be accessed without creating an instance of the class.", correct: true },
            { text: "It prevents a class from being instantiated.", correct: false }
        ]
    },
    {
        question: "Which of the following is a valid way to declare a constant in Java?",
        answers: [
            { text: "const int VALUE = 10;", correct: false },
            { text: "int final VALUE = 10;", correct: false },
            { text: "final int VALUE = 10;", correct: true },
            { text: "int VALUE = 10;", correct: false }
        ]
    },
    {
        question: "Which access modifier provides the widest accessibility in Java?",
        answers: [
            { text: "private", correct: false },
            { text: "protected", correct: false },
            { text: "default (package-private)", correct: false },
            { text: "public", correct: true }
        ]
    },
    {
        question: "In Java, which class is the superclass for all other classes?",
        answers: [
            { text: "Parent", correct: false },
            { text: "Super", correct: false },
            { text: "Base", correct: false },
            { text: "Object", correct: true }
        ]
    },
    {
        question: "What is the purpose of the 'this' keyword in Java?",
        answers: [
            { text: "It refers to the current instance of the class.", correct: true },
            { text: "It is used to create a new instance of a class.", correct: false },
            { text: "It specifies a superclass.", correct: false },
            { text: "It indicates an abstract class.", correct: false }
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
