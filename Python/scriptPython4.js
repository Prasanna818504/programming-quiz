const questions=[
    {
        question: "What is the purpose of the 'continue' statement in Python?",
        answers: [
            { text: "To exit the current loop.", correct: false },
            { text: "To skip the rest of the current iteration and continue with the next one.", correct: true },
            { text: "To raise an exception.", correct: false },
            { text: "To print a message to the console.", correct: false }
        ]
    },
    {
        question: "Which module in Python is used for working with regular expressions?",
        answers: [
            { text: "regex", correct: false },
            { text: "re", correct: true },
            { text: "regexp", correct: false },
            { text: "rex", correct: false }
        ]
    },
    {
        question: "What is the output of the following code?\nprint('Hello, world!')",
        answers: [
            { text: "Hello, world!", correct: true },
            { text: "print('Hello, world!')", correct: false },
            { text: "Nothing, it will cause an error.", correct: false },
            { text: "None", correct: false }
        ]
    },
    {
        question: "What is the purpose of a 'try-except' block in Python?",
        answers: [
            { text: "To define a new function.", correct: false },
            { text: "To create a loop.", correct: false },
            { text: "To handle exceptions and prevent program crashes.", correct: true },
            { text: "To comment out code.", correct: false }
        ]
    },
    {
        question: "Which method is used to remove a specific item from a list in Python?",
        answers: [
            { text: "remove()", correct: true },
            { text: "delete()", correct: false },
            { text: "discard()", correct: false },
            { text: "pop()", correct: false }
        ]
    },
    {
        question: "What is the result of the expression `5 / 2` in Python?",
        answers: [
            { text: "2", correct: false },
            { text: "2.5", correct: true },
            { text: "2.0", correct: false },
            { text: "3.0", correct: false }
        ]
    },
    {
        question: "Which operator is used for exponentiation in Python?",
        answers: [
            { text: "**", correct: true },
            { text: "^", correct: false },
            { text: "//", correct: false },
            { text: "*", correct: false }
        ]
    },
    {
        question: "What does the `append()` method do in Python?",
        answers: [
            { text: "Adds an item to the end of a list.", correct: true },
            { text: "Creates a new list.", correct: false },
            { text: "Removes an item from a list.", correct: false },
            { text: "Sorts the items in a list.", correct: false }
        ]
    },
    {
        question: "Which built-in function is used to find the highest value in a sequence in Python?",
        answers: [
            { text: "max()", correct: true },
            { text: "high()", correct: false },
            { text: "largest()", correct: false },
            { text: "peak()", correct: false }
        ]
    },
    {
        question: "In Python, which data structure is used to store a collection of elements as key-value pairs?",
        answers: [
            { text: "List", correct: false },
            { text: "Set", correct: false },
            { text: "Tuple", correct: false },
            { text: "Dictionary", correct: true }
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
    