const questions=[
    {
        question: "What is the output of the following code snippet? x='Python';print(x[1:4])",
        
        answers: [
            { text: "'yth'", correct: true },
            { text: "'ytho'", correct: false },
            { text: "'ython'", correct: false },
            { text: "'Pyth'", correct: false }
        ]
    },
    {
        question:"What is the len() in Python?",
        answers:[
            { text: "Converts a value to an integer.",correct: false},
            {text: " Returns the square root of a number.", correct:false},
            { text: "Returns the length (number of items) of an object.", correct:true},
            {text:"Rounds a floating-point number to the nearest integer", correct:false},
    
        ]
    },
    {
        question:" Which of the following data structures stores elements in an ordered, mutable sequence?",
        answers:[
            { text: "Tuple",correct: false},
            {text: " List" ,correct:true},
            { text: "Set", correct:false},
            {text:"Dictionary", correct:false},
    
        ]
    },
    {
        question: "What is the purpose of the `import` keyword in Python?",
        answers: [
            { text: "To define a new function.", correct: false },
            { text: "To create a new module.", correct: false },
            { text: "To include external libraries or modules.", correct: true },
            { text: "To declare a new variable.", correct: false }
        ]
    },
    {
        question: "Which Python keyword is used to define a block of code that can be called later using a function call?",
        answers: [
            { text: "class", correct: false },
            { text: "method", correct: false },
            { text: "def", correct: true },
            { text: "function", correct: false }
        ]
    },
    {
        question: "Which of the following is used to find the index of the first occurrence of a value in a list?",
        answers: [
            { text: "find()", correct: false },
            { text: "search()", correct: false },
            { text: "index()", correct: true },
            { text: "locate()", correct: false }
        ]
    },
    {
        question: "What is a tuple in Python?",
        answers: [
            { text: "A collection of elements that can be modified after creation.", correct: false },
            { text: "An ordered and immutable collection of elements.", correct: true },
            { text: "A data structure used for defining classes.", correct: false },
            { text: "A special type of loop in Python.", correct: false }
        ]
    },
    
    {
        question: "What does the 'enumerate()' function do in Python?",
        answers: [
            { text: "Returns the sum of all elements in a list.", correct: false },
            { text: "Generates an index-value pair for each element in a sequence.", correct: true },
            { text: "Counts the number of elements in a list.", correct: false },
            { text: "Converts a list of tuples into a dictionary.", correct: false }
        ]
    },
    {
        question: "Which operator is used for floor division in Python?",
        answers: [
            { text: "//", correct: true },
            { text: "/", correct: false },
            { text: "÷", correct: false },
            { text: "%", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'with' statement in Python?",
        answers: [
            { text: "To create a new instance of a class.", correct: false },
            { text: "To define a loop.", correct: false },
            { text: "To ensure proper handling of resources, such as files.", correct: true },
            { text: "To execute code only if a condition is met.", correct: false }
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
    