const questions=[
    {
        question: "In HTML, what does the 'figure' element represent?",
        answers: [
            { text: "A container for navigation links.", correct: false },
            { text: "A block of preformatted text.", correct: false },
            { text: "A standalone content that is referenced from the main content.", correct: true },
            { text: "A special type of header element.", correct: false }
        ]
    },
    {
        question: "Which HTML attribute is used to set a value for uniquely identifying an element?",
        answers: [
            { text: "name", correct: false },
            { text: "id", correct: true },
            { text: "value", correct: false },
            { text: "identifier", correct: false }
        ]
    },
    {
        question: "What is the purpose of the HTML &lt;details&gt element?",
        answers: [
            { text: "To define a list of details or items.", correct: false },
            { text: "To create a collapsible container for content.", correct: true },
            { text: "To display metadata about a document.", correct: false },
            { text: "To insert a video player.", correct: false }
        ]
    },
    {
        question: "In HTML, what is the role of the 'fieldset' element?",
        answers: [
            { text: "To group related form elements together.", correct: true },
            { text: "To create a field for entering URLs.", correct: false },
            { text: "To style the text inside a form.", correct: false },
            { text: "To define a set of data records.", correct: false }
        ]
    },
    {
        question: "What is the purpose of the HTML &ltblockquote&gt element?",
        answers: [
            { text: "To highlight text with a bold font.", correct: false },
            { text: "To create a section of quoted text.", correct: true },
            { text: "To create a link to an external stylesheet.", correct: false },
            { text: "To format text as italic.", correct: false }
        ]
    },
    {
        question: "What does the HTML 'bdo' element stand for?",
        answers: [
            { text: "Block Definition Overlay", correct: false },
            { text: "Bidirectional Override", correct: true },
            { text: "Bold Display Override", correct: false },
            { text: "Bidi Order", correct: false }
        ]
    },
    {
        question: "In HTML, what is the purpose of the 'mark' element?",
        answers: [
            { text: "To highlight important sections of text.", correct: true },
            { text: "To create a new section in a document.", correct: false },
            { text: "To insert a mathematical formula.", correct: false },
            { text: "To indicate a break in the content.", correct: false }
        ]
    },
    {
        question: "What is the purpose of the HTML &lt;output&gt element?",
        answers: [
            { text: "To display the browser's output log.", correct: false },
            { text: "To create a list of output values.", correct: false },
            { text: "To define a container for output values from a calculation or script.", correct: true },
            { text: "To display a progress indicator.", correct: false }
        ]
    },
    {
        question: "Which HTML element is used to represent computer code?",
        answers: [
            { text: "&lt;code&gt", correct: true },
            { text: "&lt;computer&gt", correct: false },
            { text: "&lt;script&gt", correct: false },
            { text: "&lt;pre&gt", correct: false }
        ]
    },
    {
        question: "In HTML, what is the purpose of the 'wbr' element?",
        answers: [
            { text: "To create a line break.", correct: false },
            { text: "To define a word break.", correct: true },
            { text: "To insert a web browser rendering.", correct: false },
            { text: "To create a break for weak browsers.", correct: false }
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
