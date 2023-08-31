const questions=[
    {
        question: "Which HTML tag is used to define a definition list?",
        answers: [
            { text: "&lt;ul&gt;", correct: false },
            { text: "&lt;dl&gt;", correct: true },
            { text: "&lt;list&gt;", correct: false },
            { text: "&lt;def&gt;", correct: false }
        ]
    },
    {
        question: "What does the HTML 'meta' tag's 'viewport' attribute control?",
        answers: [
            { text: "The background color of the webpage.", correct: false },
            { text: "The visibility of elements on the page.", correct: false },
            { text: "The scaling and responsiveness of the webpage on different devices.", correct: true },
            { text: "The order of elements in the page's source code.", correct: false }
        ]
    },
    {
        question: "In HTML, what does the 'abbr' element stand for?",
        answers: [
            { text: "Abbreviation", correct: true },
            { text: "Abstract", correct: false },
            { text: "Aberration", correct: false },
            { text: "Abacus", correct: false }
        ]
    },
    {
        question: "Which HTML attribute is used to define inline styles for an element?",
        answers: [
            { text: "style", correct: true },
            { text: "class", correct: false },
            { text: "format", correct: false },
            { text: "display", correct: false }
        ]
    },
    {
        question: "What is the purpose of the HTML &lt;figcaption&gt; element?",
        answers: [
            { text: "To specify the font size of an image's caption.", correct: false },
            { text: "To create a figure caption for an image.", correct: true },
            { text: "To set the alignment of an image on the page.", correct: false },
            { text: "To define the background color of an image caption.", correct: false }
        ]
    },
    {
        question: "Which HTML attribute specifies an image to be shown while the video is downloading, or until the user hits the play button?",
        answers: [
            { text: "preload", correct: false },
            { text: "thumbnail", correct: false },
            { text: "poster", correct: true },
            { text: "preview", correct: false }
        ]
    },
    {
        question: "In HTML, which attribute specifies the media file for audio?",
        answers: [
            { text: "src", correct: true },
            { text: "media", correct: false },
            { text: "audio", correct: false },
            { text: "sound", correct: false }
        ]
    },
    {
        question: "What is the purpose of the HTML &lt;ruby&gt; element?",
        answers: [
            { text: "To insert a small image or icon.", correct: false },
            { text: "To create a scrolling marquee.", correct: false },
            { text: "To represent small side notes or annotations.", correct: true },
            { text: "To display a tooltip when hovering over an element.", correct: false }
        ]
    },
    {
        question: "Which HTML element is used to define navigation links within a document or across multiple documents?",
        answers: [
            { text: "&lt;nav&gt;", correct: true },
            { text: "&lt;link&gt;", correct: false },
            { text: "&lt;navigate&gt;", correct: false },
            { text: "&lt;goto&gt;", correct: false }
        ]
    },
    {
        question: "In HTML, what is the purpose of the 'contenteditable' attribute?",
        answers: [
            { text: "To specify the background color of an element.", correct: false },
            { text: "To make an element editable by the user.", correct: true },
            { text: "To define the content of an element.", correct: false },
            { text: "To hide the element's content from view.", correct: false }
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
