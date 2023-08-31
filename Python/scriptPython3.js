const questions=[
{
        "question": "What is the base case in a recursive function?",
        "answers": [
          {
            "text": "The base case is the condition that terminates the recursion. ",
            "correct": true
          },
          {
            "text": "The base case is the condition that returns a value.",
            "correct": false
          },
          {
            "text": "The base case is the condition that calls the function recursively.",
            "correct": false
          },
          {
            "text": "The base case is the condition that defines the function.",
            "correct": false
          }
        ]
},
    {
        question: "What is the difference between a class and an object in Python?",
        answers: [
          { text: "A class is a blueprint for an object, while an object is an instance of a class.", correct: true },
          { text: "A class is a data structure, while an object is a function.", correct: false },
          { text: "A class is a variable, while an object is a value.", correct: false },
          { text: "A class is a function, while an object is a data structure.", correct: false },
        ],
    },
    {
        question: "What is the difference between a module and a package in Python?",
        answers: [
          { text: "A module is a file that contains Python code, while a package is a collection of modules.", correct: true },
          { text: "A module is a function, while a package is a data structure.", correct: false },
          { text: "A module is a variable, while a package is a value.", correct: false },
          { text: "A module is a class, while a package is an object.", correct: false },
        ],
    },
    {
        question: "What is the difference between a list and a tuple in Python?",
        answers: [
          { text: "A list is mutable, while a tuple is immutable.", correct: true },
          { text: "A list can contain any type of object, while a tuple can only contain immutable objects.", correct: false },
          { text: "A list is a sequence of objects, while a tuple is a collection of objects.", correct: false },
          { text: "A list is a data structure, while a tuple is a function.", correct: false },
        ],
    },
    {
        question: "Which of the following is used to iterate over a sequence in reverse order in Python?",
        answers: [
            { text: "for loop", correct: false },
            { text: "while loop", correct: false },
            { text: "reverse()", correct: false },
            { text: "reversed()", correct: true }
        ]
    },
    {
        question: "What does the 'pass' statement do in Python?",
        answers: [
            { text: "Exits the current loop or function.", correct: false },
            { text: "Prints the value of a variable.", correct: false },
            { text: "Does nothing and acts as a placeholder.", correct: true },
            { text: "Raises an exception.", correct: false }
        ]
    },
    {
        question: "Which method is used to split a string into a list of substrings based on a delimiter?",
        answers: [
            { text: "divide()", correct: false },
            { text: "cut()", correct: false },
            { text: "split()", correct: true },
            { text: "separate()", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'else' clause in a 'try-except' block?",
        answers: [
            { text: "To catch and handle exceptions.", correct: false },
            { text: "To specify the type of exception to catch.", correct: false },
            { text: "To define a block of code that will always execute.", correct: true },
            { text: "To re-raise an exception.", correct: false }
        ]
    },
    {
        question: "In Python, which built-in function is used to find the length of an object?",
        answers: [
            { text: "len()", correct: true },
            { text: "length()", correct: false },
            { text: "count()", correct: false },
            { text: "size()", correct: false }
        ]
    },
    {
        "question": "What is the difference between a function and a method?",
        "answers": [
          {
            "text": "A function is a block of code that is executed when it is called, while a method is a function that is attached to an object.",
            "correct": true
          },
          {
            "text": "A function is a block of code that is executed when it is defined, while a method is a function that is executed when the object is created. ",
            "correct": false
          },
          {
            "text": "A function is a block of code that is executed when it is called, while a method is a function that is executed when the object is modified.",
            "correct": false
          },
          {
            "text": "A function is a block of code that is executed when it is imported, while a method is a function that is executed when the object is called.",
            "correct": false
          }
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
    