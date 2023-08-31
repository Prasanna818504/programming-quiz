const questions=[
    {
        "question": "What is the difference between a nested function and a recursive function?",
        "answers": [
          {
            "text": "A nested function is a function defined within another function, while a recursive function is a function that calls itself.",
            "correct": true
          },
          {
            "text": "A nested function can access the variables of the outer function, while a recursive function cannot.",
            "correct": false
          },
          {
            "text": "A nested function can be called from anywhere in the program, while a recursive function can only be called from within itself.",
            "correct": false
          },
          {
            "text": "A nested function is always defined at the top level of the program, while a recursive function can be defined anywhere in the program.",
            "correct": false
          }
        ]
    }
      ,
    {
        question: 'What is the output of the following code?\nprint("Hello", "world!", sep="-")',
        answers: [
            { text: "Hello world!", correct: false },
            { text: "Hello-world!", correct: true },
            { text: "Hello", correct: false },
            { text: "world!", correct: false }
        ]
    },
    {
        question: "Which Python function is used to convert a value to an integer?",
        answers: [
            { text: "int()", correct: true },
            { text: "integer()", correct: false },
            { text: "to_int()", correct: false },
            { text: "str_to_int()", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'join()' method in Python?",
        answers: [
            { text: "To concatenate strings.", correct: false },
            { text: "To merge two dictionaries.", correct: false },
            { text: "To combine elements of a list into a single string.", correct: true },
            { text: "To split a string into multiple substrings.", correct: false }
        ]
    },
    {
        question: "Which of the following is used to remove all whitespace characters from the beginning and end of a string?",
        answers: [
            { text: "strip()", correct: true },
            { text: "trim()", correct: false },
            { text: "remove()", correct: false },
            { text: "clean()", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'format()' method in Python?",
        answers: [
            { text: "To convert a string to uppercase.", correct: false },
            { text: "To format and insert values into a string.", correct: true },
            { text: "To remove whitespace from a string.", correct: false },
            { text: "To replace characters in a string.", correct: false }
        ]
    },
    {
        question: "In Python, which data type is used to represent a sequence of characters?",
        answers: [
            { text: "string", correct: true },
            { text: "char", correct: false },
            { text: "text", correct: false },
            { text: "sequence", correct: false }
        ]
    },
    {
        question: "What is the difference between a range and a list comprehension in Python?",
        answers: [
          { text: "A range is a sequence of numbers, while a list comprehension is a way to create a list of values.", correct: true },
          { text: "A range is a function, while a list comprehension is a data structure.", correct: false },
          { text: "A range is used to iterate over a sequence of numbers, while a list comprehension is used to create a list of values.", correct: true },
          { text: "A range is a list of numbers, while a list comprehension is a function that returns a list of values.", correct: false },
        ],
    },
    {
        question: "How do you check if a variable is defined in Python?",
        answers: [
          { text: "Use the `in` operator.", correct: true },
          { text: "Use the `is` operator.", correct: false },
          { text: "Use the `type()` function.", correct: false },
          { text: "Use the `len()` function.", correct: false },
        ],
    },
    {
        question: "How do you create a lambda function in Python?",
        answers: [
          { text: "Use the `lambda` keyword.", correct: true },
          { text: "Use the `def` keyword.", correct: false },
          { text: "Use the `if` statement.", correct: false },
          { text: "Use the `for` loop.", correct: false },
        ],
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
    