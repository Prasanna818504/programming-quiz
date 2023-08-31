const questions=[  
{
        "question": "What is the scope of a local variable?",
        "answers": [
          {
            "text": "The scope of a local variable is limited to the function in which it is defined.",
            "correct": true
          },
          {
            "text": "The scope of a local variable is limited to the module in which it is defined.",
            "correct": false
          },
          {
            "text": "The scope of a local variable is limited to the program in which it is defined.",
            "correct": false
          },
          {
            "text": "The scope of a local variable is global. ",
            "correct": false
          }
        ]
},      
{
    question: "What is the result of the expression `3 + 4 * 2` in Python?",
    answers: [
        { text: "14", correct: false },
        { text: "11", correct: true },
        { text: "10", correct: false },
        { text: "21", correct: false }
    ]
},
{
    question: "Which Python data type is used to store a collection of unique elements?",
    answers: [
        { text: "List", correct: false },
        { text: "Tuple", correct: false },
        { text: "Set", correct: true },
        { text: "Dictionary", correct: false }
    ]
},
{
    question: "What is the purpose of the 'in' keyword in Python?",
    answers: [
        { text: "To define a new variable.", correct: false },
        { text: "To check if an element is present in a sequence.", correct: true },
        { text: "To create a loop.", correct: false },
        { text: "To concatenate strings.", correct: false }
    ]
},
{
    question: "Which of the following methods is used to convert a string to uppercase in Python?",
    answers: [
        { text: "capitalize()", correct: false },
        { text: "upper()", correct: true },
        { text: "uppercase()", correct: false },
        { text: "casefold()", correct: false }
    ]
},
{
    question: " What is the correct way to define a function in Python?",
    answers: [
        { text: "def function_name(parameters):", correct: true },
        { text: "function_name(parameters)", correct: false },
        { text: "def function_name():", correct: false },
        { text: "function_name(parameters):", correct: false }
    ]
},
{
    question: "In Python, what does the 'range()' function return?",
    answers: [
        { text: "A list of numbers.", correct: false },
        { text: "A sequence of numbers.", correct: true },
        { text: "A dictionary of numbers.", correct: false },
        { text: "A tuple of numbers.", correct: false }
    ]
},
{
    question: "Which of the following is an example of a valid Python variable name?",
    answers: [
        { text: "my-variable", correct: false },
        { text: "_myVariable", correct: true },
        { text: "2ndVariable", correct: false },
        { text: "$variable_name", correct: false }
    ]
},
{
    question: "What does the 'ord()' function do in Python?",
    answers: [
        { text: "Converts a number to its corresponding character.", correct: false },
        { text: "Calculates the remainder of a division.", correct: false },
        { text: "Returns the ASCII value of a character.", correct: true },
        { text: "Converts a character to its corresponding number.", correct: false }
    ]
},
{
    question: "Which of the following is used to close a file after it has been opened in Python?",
    answers: [
        { text: "close()", correct: true },
        { text: "shutdown()", correct: false },
        { text: "exit()", correct: false },
        { text: "terminate()", correct: false }
    ]
},
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next Question";
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
