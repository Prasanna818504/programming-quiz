const questions=[
    {
        question: "Which Java keyword is used to define a subclass?",
        answers: [
            { text: "sub", correct: false },
            { text: "class", correct: false },
            { text: "extends", correct: true },
            { text: "inherits", correct: false }
        ]
    },
    {
        question: "Which access modifier is more restrictive than 'protected' but allows access within the same package?",
        answers: [
            { text: "private", correct: true },
            { text: "public", correct: false },
            { text: "default (package-private)", correct: false },
            { text: "static", correct: false }
        ]
    },
    {
        question: "Which Java data type is used to store a single Unicode character?",
        answers: [
            { text: "char", correct: true },
            { text: "string", correct: false },
            { text: "character", correct: false },
            { text: "chr", correct: false }
        ]
    },
    {
        question: "What is the output of the following code snippet?\nint x = 10;\nif (x > 5) {\n    System.out.println(\"Hello\");\n} else {\n    System.out.println(\"World\");\n}",
        answers: [
            { text: "Hello", correct: true },
            { text: "World", correct: false },
            { text: "Hello\nWorld", correct: false },
            { text: "No output", correct: false }
        ]
    },
    {
        question: "Which Java keyword is used to exit out of a loop?",
        answers: [
            { text: "break", correct: true },
            { text: "exit", correct: false },
            { text: "return", correct: false },
            { text: "stop", correct: false }
        ]
    },
    {
        question: "In Java, which method is automatically called when an object is created?",
        answers: [
            { text: "create()", correct: false },
            { text: "init()", correct: false },
            { text: "construct()", correct: false },
            { text: "constructor()", correct: true }
        ]
    },
    {
        question: "What does the 'implements' keyword mean in Java?",
        answers: [
            { text: "It indicates a method that can be overridden.", correct: false },
            { text: "It defines a new interface.", correct: false },
            { text: "It specifies a class that provides an implementation of an interface.", correct: true },
            { text: "It declares a variable with a specific data type.", correct: false }
        ]
    },
    {
        question: "Which Java keyword is used to prevent a method from being overridden in a subclass?",
        answers: [
            { text: "sealed", correct: false },
            { text: "private", correct: false },
            { text: "final", correct: true },
            { text: "locked", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'super' keyword in Java?",
        answers: [
            { text: "It refers to the superclass of a class.", correct: true },
            { text: "It creates a new instance of a class.", correct: false },
            { text: "It indicates a static method.", correct: false },
            { text: "It defines a higher-level access modifier.", correct: false }
        ]
    },
    {
        question: "What is method overloading in Java?",
        answers: [
            { text: "Using the same method name but with different return types.", correct: false },
            { text: "Using the same method name and parameters but with different access modifiers.", correct: false },
            { text: "Creating a new method with a different name.", correct: false },
            { text: "Using the same method name but with different parameters.", correct: true }
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
