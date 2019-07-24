var questions = ['Q. Which videogame holds the record for having the highest budget ever to produce?', 
'Q. What is the name of the racing series that is a spinoff of "Super Mario Brothers"?', 
'Q. What does Mario jump on when he completes a level?', 
'Q. The original designer behind the game "Tetris" is from which nation?', 
'Q. The most-popular American football videogame franchise is named after which individual?', 
'Q. Which item made Mario invincible in "Super Mario Bros."?', 
'Q. What is the date setting of the original "Call of Duty"?', 
'Q. What is the main character of Metal Gear Solid 2?', 
'Q. Who are the original creators of Rachet & Clank?', 
'Q. What was the name of the company that created “The Last of Us”?'];

var wrongAnswers = ["A. Grand Theft Auto V", 
"A. Mario Kart", 
"A. A flag pole", 
"A. Russia", 
"A. John Madden", 
"A. Starman", 
"A. World War II", 
"A. Raiden", 
"A. Insomniac Games", 
"A. Naughty Dog"];                 


var questionMap = new Map([
['Q. Which videogame holds the record for having the highest budget ever to produce?',
    'A. Grand Theft Auto V'],
['Q. What is the name of the racing series that is a spinoff of "Super Mario Brothers"?',
    'A. Mario Kart'],
['Q. What does Mario jump on when he completes a level?',
    "A. A flag pole"],
['Q. The original designer behind the game "Tetris" is from which nation?',
    'A. Russia'],
['Q. The most-popular American football videogame franchise is named after which individual?',
    'A. John Madden'],
['Q. Which item made Mario invincible in "Super Mario Bros."?',
    'A. Starman'],
['Q. What is the date setting of the original "Call of Duty"?',
    'A. World War II'],
['Q. What is the main character of Metal Gear Solid 2?', 
    'A. Raiden'],
['Q. Who are the original creators of Rachet & Clank?',
    'A. Insomniac Games'],
['Q. What was the name of the company that created “The Last of Us”?',
    'A. Naughty Dog']]); 


     
     
     

var playing = false;


// var intervalId;
// var clockRunning = false;
var time = 60;
var correct = 0;
var incorrect = 0;
var unanswered = 0;

function initializeTriviaGame() {
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    // start timer here
    // start appending questions 
    $("#start-btn").remove();
    
    
    setInterval(countDown, 1000);
    playing = true;

    setTimeout(function() {
        if(playing) {
            gameResult();
        }
        
    }, 60000);

    for(var i = 0; i < questions.length; i++) {
        var questionP = $("<p>");
        questionP.attr("value", questions[i]);
        questionP.attr("id", "eachQuestion");
        questionP.text((i + 1) + " " + questions[i]);
        $("#questions").append(questionP);

        for(var j = 0; j < wrongAnswers.length; j++) {
            var answerBtn = $("<input> " + wrongAnswers[j] + "</input>");
            answerBtn.attr("type", "radio");
            answerBtn.attr("value", wrongAnswers[j]);
            answerBtn.attr("name", "questionName_" + i);
            answerBtn.attr("id", "questionId_" + i);
            $("#questions").append(answerBtn).append("<br>");
        }
        $("#questions").append("<br>");
    }
    var doneBtn = $("<button>");
    doneBtn.attr("id", "done-btn");
    doneBtn.attr("onclick", "gameResult()");
    doneBtn.text("Done!");
    $("#questions").append("<br>").append("<br>").append(doneBtn);


    // Generating random indices for the trivia questions
    /* var usedIndices = [];
    for(var i = 0; i < questionMap.size; i++) {
        var randNum = Math.floor(Math.random() * questionMap.size);    
        while(usedIndices.includes(randNum)) {
            randNum = Math.floor(Math.random() * questionMap.size);
        }
        usedIndices.push(randNum);
    }
    console.log(usedIndices); */
    
} 

function countDown() {
    
    


    time--;
    var currentTime = timeConverter(time);
    
    $("#display").text(currentTime);
}


function timeConverter(t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
  
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
  
    if (minutes === 0) {
      minutes = "00";
    }
  
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }
  
    return minutes + ":" + seconds;
}

function gameResult() {
    playing = false;
    
    // Between Here Comes Calculating Correct Answers
    for(var i = 0; i < 10; i++) {
        // returns the answers
        if($('input:radio[name = questionName_' + i + ']:checked').val() == null) {
            unanswered++;
        } else if(questionMap.get(questions[i]) === $('input:radio[name = questionName_' + i + ']:checked').val()) {
            correct++;
        } else {
            incorrect++;
        }
        


    }

    $("#time_tag").remove();
    $("#questions").remove();

    var resultDiv = $('<div id="result-div">');
    resultDiv.append('<h2 id="result">All Done!</h2>');
    
    var correctCount = $('<p id="correct_result">');
    correctCount.text("Correct: " + correct);
    resultDiv.append(correctCount);
    
    var wrongCount = $('<p id="wrong_result">');
    wrongCount.text("Inccorrect: " + incorrect);
    resultDiv.append(wrongCount);

    var unansweredCount = $('<p id="unanswered_result">');
    unansweredCount.text("Unanswered: " + unanswered);
    resultDiv.append(unansweredCount);

    $("#initialize").append("<br>").append(resultDiv);
}