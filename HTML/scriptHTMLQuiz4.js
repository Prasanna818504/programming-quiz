const questions=[
    {
        question: "What is the purpose of the HTML &lt;textarea&gt element?",
        answers: [
            { text: "To create a hyperlink to another webpage.", correct: false },
            { text: "To display user input fields.", correct: false },
            { text: "To create a container for external scripts.", correct: false },
            { text: "To create a multiline text input area.", correct: true }
        ]
    },
    {
        question: "What is the purpose of the HTML &lt;meter&gt element?",
        answers: [
            { text: "To define a progress bar.", correct: false },
            { text: "To display a measurement in a predefined range.", correct: true },
            { text: "To add a timer to the webpage.", correct: false },
            { text: "To insert an image placeholder.", correct: false }
        ]
    },
    {
        question: "Which HTML element is used to group elements and apply styles or scripting to them?",
        answers: [
            { text: "&lt;group&gt", correct: false },
            { text: "&lt;div&gt", correct: true },
            { text: "&lt;sec&gt", correct: false },
            { text: "&lt;container&gt", correct: false }
        ]
    },
    {
        question: "In HTML, which attribute is used to specify the relationship between the current document and a linked resource?",
        answers: [
            { text: "link", correct: false },
            { text: "relation", correct: false },
            { text: "rel", correct: true },
            { text: "connect", correct: false }
        ]
    },
    {
        question: "What is the purpose of the HTML &lt;time&gt element?",
        answers: [
            { text: "To define a specific time of day.", correct: false },
            { text: "To display the current date and time.", correct: false },
            { text: "To represent a date and/or time value.", correct: true },
            { text: "To create a countdown timer.", correct: false }
        ]
    },
    {
        question: "In HTML, which element is used to create a drop-down list?",
        answers: [
            { text: "&lt;select&gt", correct: true },
            { text: "&lt;dropdown&gt", correct: false },
            { text: "&lt;list&gt", correct: false },
            { text: "&lt;menu&gt", correct: false }
        ]
    },
    {
        question: "What does the HTML 'canvas' element allow you to do?",
        answers: [
            { text: "Embed external content like videos.", correct: false },
            { text: "Create 3D animations.", correct: false },
            { text: "Draw graphics and animations using JavaScript.", correct: true },
            { text: "Capture webcam input.", correct: false }
        ]
    },
    {
        question: "In HTML, which attribute is used to specify a URL for long descriptions of an image?",
        answers: [
            { text: "url", correct: false },
            { text: "longdesc", correct: true },
            { text: "link", correct: false },
            { text: "href", correct: false }
        ]
    },
    {
        question: "What is the purpose of the HTML &lt;datalist&gt element?",
        answers: [
            { text: "To create a list of data records.", correct: false },
            { text: "To display a dropdown with predefined options.", correct: true },
            { text: "To define a table structure.", correct: false },
            { text: "To list references to external scripts.", correct: false }
        ]
    },
    {
        question: "In HTML, what does the 'sandbox' attribute do when applied to an iframe?",
        answers: [
            { text: "It blocks all access to external resources.", correct: false },
            { text: "It restricts the iframe's content from certain actions.", correct: true },
            { text: "It forces the iframe to be displayed in full-screen mode.", correct: false },
            { text: "It enables the iframe to execute JavaScript code.", correct: false }
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
