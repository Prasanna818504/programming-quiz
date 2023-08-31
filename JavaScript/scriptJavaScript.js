const questions=[
    {
        question: "Which of the following is the correct way to declare a variable in JavaScript?",
        answers: [
            { text: "variable x;", correct: false },
            { text: "x = var;", correct: false },
            { text: "var x;", correct: true },
            { text: "x := variable;", correct: false }
        ]
    },
    {
        question: "What is the output of the following code?\nconsole.log(3 + '2');",
        answers: [
            { text: "5", correct: false },
            { text: "32", correct: true },
            { text: "6", correct: false },
            { text: "322", correct: false }
        ]
    },
    {
        question: "Which function is used to change the content of an HTML element in JavaScript?",
        answers: [
            { text: "alter()", correct: false },
            { text: "change()", correct: false },
            { text: "modify()", correct: false },
            { text: "innerHTML()", correct: true }
        ]
    },
    {
        question: "In JavaScript, which keyword is used to declare a function?",
        answers: [
            { text: "function", correct: true },
            { text: "method", correct: false },
            { text: "func", correct: false },
            { text: "def", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'typeof' operator in JavaScript?",
        answers: [
            { text: "To check if a variable is defined.", correct: false },
            { text: "To determine the data type of a value.", correct: true },
            { text: "To compare two values.", correct: false },
            { text: "To convert a value to a different type.", correct: false }
        ]
    },
    {
        question: "What is an example of an event in JavaScript?",
        answers: [
            { text: "if statement", correct: false },
            { text: "loop", correct: false },
            { text: "function call", correct: false },
            { text: "click", correct: true }
        ]
    },
    {
        question: "Which method is used to add an element to the end of an array in JavaScript?",
        answers: [
            { text: "push()", correct: true },
            { text: "append()", correct: false },
            { text: "add()", correct: false },
            { text: "insert()", correct: false }
        ]
    },
    {
        question: "What is the result of the expression '5' == 5 in JavaScript?",
        answers: [
            { text: "true", correct: true },
            { text: "false", correct: false },
            { text: "undefined", correct: false },
            { text: "None of the above", correct: false }
        ]
    },
    {
        question: "Which keyword is used to exit a loop in JavaScript?",
        answers: [
            { text: "stop", correct: false },
            { text: "exit", correct: false },
            { text: "break", correct: true },
            { text: "end", correct: false }
        ]
    },
    {
        question: "What does the 'JSON' acronym stand for in JavaScript?",
        answers: [
            { text: "JavaScript Object Namespace", correct: false },
            { text: "Java Standard Object Notation", correct: false },
            { text: "JavaScript Object Notation", correct: true },
            { text: "JavaScript Operating Network", correct: false }
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
    