const questions=[
    {
        question: "What is the purpose of the HTML '<input>' element?",
        answers: [
            { text: "To create a link to an external stylesheet.", correct: false },
            { text: "To define a paragraph of text.", correct: false },
            { text: "To display user input fields.", correct: true },
            { text: "To add a header to a section of content.", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to create a bulleted list?",
        answers: [
            { text: "<ul>", correct: true },
            { text: "<ol>", correct: false },
            { text: "<li>", correct: false },
            { text: "<list>", correct: false }
        ]
    },
    {
        question: "In HTML, which tag is used to create a horizontal rule?",
        answers: [
            { text: "&lt;hr&gt;", correct: true },
            { text: "&lt;line&gt;", correct: false },
            { text: "&lt;rule&gt;", correct: false },
            { text: "&lt;hl&gt;", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'target' attribute in the &lt;a&gt; tag?",
        answers: [
            { text: "To specify the link's style.", correct: false },
            { text: "To set the link's text.", correct: false },
            { text: "To open the linked document in a new window or tab.", correct: true },
            { text: "To underline the link text.", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to define a table?",
        answers: [
            { text: "&lt;table&gt;", correct: true },
            { text: "&lt;tab&gt;", correct: false },
            { text: "&lt;tb&gt;", correct: false },
            { text: "&lt;tbl&gt;", correct: false }
        ]
    },
    {
        question: "What does the 'alt' attribute in the <img> tag provide?",
        answers: [
            { text: "Alternative text for screen readers and when the image can't be displayed.", correct: true },
            { text: "A tooltip text when the image is hovered over.", correct: false },
            { text: "Alignment settings for the image.", correct: false },
            { text: "A caption for the image.", correct: false }
        ]
    },
    {
        question: "In HTML, what is the purpose of the 'button' element?",
        answers: [
            { text: "To define a clickable button.", correct: true },
            { text: "To create a new section.", correct: false },
            { text: "To insert a form element.", correct: false },
            { text: "To add a line break.", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to define the largest heading?",
        answers: [
            { text: "<h2>", correct: false },
            { text: "<h3>", correct: false },
            { text: "<h1>", correct: true },
            { text: "<heading>", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'placeholder' attribute in an input element?",
        answers: [
            { text: "To set the input field's width.", correct: false },
            { text: "To define the type of input expected.", correct: false },
            { text: "To align the input element within its container.", correct: false },
            { text: "To add a brief description of the input.", correct: true }
        ]
    },
    {
        question: "Which HTML tag is used to define an italic text style?",
        answers: [
            { text: "&lt;i&gt;", correct: true },
            { text: "&lt;italic&gt;" ,correct: false },
            { text: "&lt;style&gt;" , correct: false },
            { text: "&lt;strong&gt;", correct: false }
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
