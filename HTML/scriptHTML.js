const questions=[
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyperlink and Text Markup Language", correct: false },
            { text: "Hypertext Markup Language", correct: true },
            { text: "High-Level Text Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        answers: [
            { text: "&lt;link&gt;", correct: false },
            { text: "&lt;a&gt;", correct: true },
            { text: "&lt;hlink&gt;", correct: false },
            { text: "&lt;hyperlink&gt;", correct: false }
        ]
    },
    {
        question: "What is the purpose of the &lt;head&gt; element in HTML?",
        answers: [
            { text: "To define the main content of the page.", correct: false },
            { text: "To include external styles and scripts.", correct: true },
            { text: "To display the header of the page.", correct: false },
            { text: "To create a navigation menu.", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to create an unordered list?",
        answers: [
            { text: "&lt;ol&gt;", correct: false },
            { text: "&lt;li&gt;", correct: false },
            { text: "&lt;ul&gt;", correct: true },
            { text: "&lt;list&gt;", correct: false }
        ]
    },
    {
        question: "What is the purpose of the &lt;img&gt; element in HTML?",
        answers: [
            { text: "To display a video.", correct: false },
            { text: "To create a table.", correct: false },
            { text: "To embed an image.", correct: true },
            { text: "To define a hyperlink.", correct: false }
        ]
    },
    {
        question: "Which attribute is used to specify the URL of an external stylesheet in HTML?",
        answers: [
            { text: "style", correct: false },
            { text: "src", correct: false },
            { text: "href", correct: true },
            { text: "link", correct: false }
        ]
    },
    {
        question: "What does the HTML element &lt;br&gt; represent?",
        answers: [
            { text: "A bold text.", correct: false },
            { text: "A line break.", correct: true },
            { text: "A bullet point.", correct: false },
            { text: "A button.", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to define a table row?",
        answers: [
            { text: "&lt;td&gt;", correct: false },
            { text: "&lt;th&gt;", correct: false },
            { text: "&lt;tr&gt;", correct: true },
            { text: "&lt;table&gt;", correct: false }
        ]
    },
    {
        question: "What does the HTML element &lt;p&gt; stand for?",
        answers: [
            { text: "Paragraph", correct: true },
            { text: "Position", correct: false },
            { text: "Pixel", correct: false },
            { text: "Property", correct: false }
        ]
    },
    {
        question: "Which attribute is used to provide additional information about an element in HTML?",
        answers: [
            { text: "alt", correct: false },
            { text: "title", correct: true },
            { text: "src", correct: false },
            { text: "href", correct: false }
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
