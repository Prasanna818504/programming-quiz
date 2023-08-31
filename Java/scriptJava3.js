const questions=[
    {
        question: "What is the Java Virtual Machine (JVM) responsible for?",
        answers: [
            { text: "Handling keyboard input in Java programs.", correct: false },
            { text: "Executing Java bytecode on the target machine.", correct: true },
            { text: "Translating Java source code into machine code.", correct: false },
            { text: "Managing database connections in Java applications.", correct: false }
        ]
    },
    {
        question: "What is the main purpose of Java interfaces?",
        answers: [
            { text: "To define a class that cannot be instantiated.", correct: false },
            { text: "To provide a blueprint for creating objects.", correct: false },
            { text: "To define a set of constants for a class.", correct: false },
            { text: "To define a contract for classes to implement certain methods.", correct: true }
        ]
    },
    {
        question: "In Java, which method is automatically called when an object is about to be garbage collected?",
        answers: [
            { text: "finalize()", correct: true },
            { text: "dispose()", correct: false },
            { text: "clean()", correct: false },
            { text: "destroy()", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'StringBuilder' class in Java?",
        answers: [
            { text: "To create a new instance of a class.", correct: false },
            { text: "To build HTML documents.", correct: false },
            { text: "To efficiently manipulate strings.", correct: true },
            { text: "To format numbers.", correct: false }
        ]
    },
    {
        question: "Which Java keyword is used to create an instance of an anonymous inner class?",
        answers: [
            { text: "new", correct: true },
            { text: "instance", correct: false },
            { text: "anon", correct: false },
            { text: "create", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'instanceof' operator in Java?",
        answers: [
            { text: "To check if an object is of a specific class or interface type.", correct: true },
            { text: "To create a new instance of a class.", correct: false },
            { text: "To compare two objects for equality.", correct: false },
            { text: "To convert an object to a different type.", correct: false }
        ]
    },
    {
        question: "Which Java keyword is used to define a block of code that should be executed in the event of an exception?",
        answers: [
            { text: "catch", correct: false },
            { text: "try", correct: true },
            { text: "handle", correct: false },
            { text: "except", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'throws' keyword in a method declaration in Java?",
        answers: [
            { text: "To indicate that the method is overloaded.", correct: false },
            { text: "To define a custom exception class.", correct: false },
            { text: "To specify the type of exception that the method might throw.", correct: true },
            { text: "To indicate that the method is deprecated.", correct: false }
        ]
    },
    {
        question: "What is the difference between '== ' and ' .equals()' when comparing objects in Java?",
        answers: [
            { text: "'==' compares object references for equality, while '.equals()' compares object contents for equality.", correct: true },
            { text: "'==' compares object contents for equality, while '.equals()' compares object references for equality.", correct: false },
            { text: "'==' and '.equals()' are used interchangeably to compare object references.", correct: false },
            { text: "'==' and '.equals()' are both used to compare object contents for equality.", correct: false }
        ]
    },
    {
        question: "What does the 'break' statement do in a loop in Java?",
        answers: [
            { text: "It terminates the program.", correct: false },
            { text: "It skips the rest of the loop and continues with the next iteration.", correct: false },
            { text: "It exits the loop entirely.", correct: true },
            { text: "It restarts the loop from the beginning.", correct: false }
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
