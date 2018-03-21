'use strict';
let quizScore = 0;
let quizQuestionCounter = 0;

// Call function
$(function(){
   loadStartPage();
   resetQuiz();
   renderAnswers();
   answerCounter();
});



// Reset default form behavior
$('form-ski-lingo-quiz').on('submit', function(event){
    event.preventDefault();
   
  });
  
  // Load the start quiz start package
function loadStartPage(){
    startTheGame();
    renderFirstPage();
  }
  
  // 
function renderFirstPage(){
    $('.mainQuizPage').hide();
    $('#startAgainButton').hide();
  }
  
   //press submit button to start the quiz
  // hide start button load question, answers ans submit buttons.
  // Start button action
function startTheGame(){
    $('#startButton').on('click' , function(event){
    $(event.target).hide();
    $('.mainQuizPage').show();
    $('#startAgainButton').hide();
    renderQestions();
    renderAnswers();
    $(".bg-image").css("background-image", "none")
    });
    
  }
  
  // render the questions
function renderQestions(){
   let curentQuestion = SKIQUESTIONS[quizQuestionCounter].question;
   $("#questions").text(curentQuestion);
   
  }
  
  
  // each button asigned the questioncfrom DB
function renderAnswers(){
    let answer = SKIQUESTIONS[quizQuestionCounter].answers.map
    ((theAnswer) => {
      return `<div class="col-12 centerItem">
      <button class="answerButton buttonMargins">
         ${theAnswer}
      </button>
      </div>`
    });
    $("#answerButtons").html(answer);
    answerCounter();
   
  }
  
  
  // Calculate the result  and display andsers and feedback
  // changes color having 3 sec dispaly timer
function calculateResult(selectedAnswer){
     let processedSelectedAnswer = selectedAnswer.trim();
     let correctAnswer = SKIQUESTIONS[quizQuestionCounter].correct;
     //console.log(correctAnswer, processedSelectedAnswer);
     if(correctAnswer === processedSelectedAnswer){
         $(".bg-image").css("background-color", "orange")
         $("#answerStatus").show();
         $("#answerStatus").text(`WOO HOO  You DIG IT!`);
         $("#answerStatus").css("color","green");
            quizScore++;
     }
     else{
       $(".bg-image").css("background-color", "red")
       $("#answerStatus").show();
       $("#answerStatus").text(`You are wrong!  The right answer is : ${correctAnswer}`);
       $("#answerStatus").css("color","yellow");
   
     }
     setTimeout(() => {
          $(".bg-image").css("background-color", "maroon")
          $("#answerStatus").hide() 
       
     }, 3000);
     
    render();
    
  }
  
  // counting answers 
function answerCounter(){
    $(".answerButton").on("click", function(event){
    event.preventDefault();
    let selectedAnswer = $(event.target).text();
    
    calculateResult(selectedAnswer);
    if(quizQuestionCounter < 9)
    {
       quizQuestionCounter++;
       render();
    }
    else{
      
        quizQuestionCounter = 0;
        $('.mainQuizPage').hide();
        saveTheResult();
        $('#startAgainButton').show();
       
        render();
        
        return;
    }
  });
    
}
  
  // function Listener will reset the quiz
function resetQuiz(){
    $('#startAgainButton').on('click' , function(event){
      quizScore = 0;
      quizQuestionCounter = 0;
      updateScores();
        $("#endResult").hide();
      $(event.target).hide();
      $('.mainQuizPage').show();
    
    });
  }
  
  // rendering the score and question count
function updateScores(){
    $("#currentQuestion").text(quizQuestionCounter+1); 
    $("#quizScore").text(quizScore); 
  }
  
// Total score result display at the end of the quiz
function totalScore(myAnswer){
    let rightAnswer = 0;
    return rightAnswer;
    
  }
  
  // Print the quiz result in the file  
function saveTheResult(){
    let finalScore = quizScore;
    // alert(`The final score of the Quiz is: ${finalScore}`);
       $("#endResult").show();
       $("#endResult").text(`Total score is :${finalScore}`);
       $("#endResult").css("color","white");
   
    
  }
  
  function render(){
      updateScores();
      renderQestions();
      renderAnswers();
  }
  
    
    

  
  