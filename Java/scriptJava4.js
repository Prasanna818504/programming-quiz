const questions=[
    {
        question: "What is the purpose of the 'equals()' method in Java?",
        answers: [
            { text: "To check if two objects are the same instance.", correct: false },
            { text: "To compare the values of two objects for equality.", correct: true },
            { text: "To convert an object to a string representation.", correct: false },
            { text: "To determine the size of an object in memory.", correct: false }
        ]
    },
    {
        question: "What is the Java keyword used to declare a variable that can hold a reference to an object of any class?",
        answers: [
            { text: "object", correct: false },
            { text: "any", correct: false },
            { text: "instance", correct: false },
            { text: "Object", correct: true }
        ]
    },
    {
        question: "What does the 'default' keyword do in a 'switch' statement in Java?",
        answers: [
            { text: "It specifies the case to be executed when the switch expression is not provided.", correct: false },
            { text: "It defines a default value for a variable.", correct: false },
            { text: "It sets a default access modifier for a class or method.", correct: false },
            { text: "It specifies the default case to be executed when no other cases match.", correct: true }
        ]
    },
    {
        question: "Which Java keyword is used to call a method or access a variable from the superclass?",
        answers: [
            { text: "base", correct: false },
            { text: "parent", correct: false },
            { text: "super", correct: true },
            { text: "extends", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'finally' block in a Java 'try-catch-finally' statement?",
        answers: [
            { text: "To define a new exception.", correct: false },
            { text: "To specify the code that will be executed only if an exception is thrown.", correct: false },
            { text: "To handle exceptions by providing an alternative code path.", correct: false },
            { text: "To specify the code that will be executed regardless of whether an exception is thrown or not.", correct: true }
        ]
    },
    {
        question: "What is the purpose of the 'compareTo()' method in Java?",
        answers: [
            { text: "To convert an object to a string representation.", correct: false },
            { text: "To compare the memory addresses of two objects.", correct: false },
            { text: "To compare the values of two objects for equality.", correct: false },
            { text: "To compare two objects and determine their order in relation to each other.", correct: true }
        ]
    },
    {
        question: "Which of the following is not a valid access modifier in Java?",
        answers: [
            { text: "public", correct: false },
            { text: "protected", correct: false },
            { text: "private", correct: false },
            { text: "global", correct: true }
        ]
    },
    {
        question: "In Java, which method is used to read input from the console?",
        answers: [
            { text: "console()", correct: false },
            { text: "readLine()", correct: true },
            { text: "input()", correct: false },
            { text: "readConsole()", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'abstract' keyword in Java?",
        answers: [
            { text: "To indicate that a class cannot be extended.", correct: false },
            { text: "To define a class that can only be instantiated once.", correct: false },
            { text: "To define a class that cannot have any methods.", correct: false },
            { text: "To define a class that cannot be instantiated directly and serves as a blueprint for other classes.", correct: true }
        ]
    },
    {
        question: "What is the Java keyword used to prevent a class from being subclassed?",
        answers: [
            { text: "protected", correct: false },
            { text: "final", correct: true },
            { text: "static", correct: false },
            { text: "private", correct: false }
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
