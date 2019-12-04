// Global Variables ---------------------- //
var currentQuestion = 0,
    lastQuestion = questions.length - 1;

var local = (!document.location.hostname); // check if local
// --------------------------------------- //


// CHAT SETTINGS START ---------------------- //

function storyController(questions) {
    current = 0;

    createMessage(questions[0].question);
}

// Scrolling for the contents of chatbox__body

function smoothScrollBottom() {
    $('.chatbox__body').stop().animate({
        scrollTop: $('.chatbox__body')[0].scrollHeight
    }, 1000); // delay with 1s
}

// Recursive function that goes through the set of messages it is given
function createMessage(messagesArray, i, response) {

    // i is optional - i is the current message in the array the system is displaying
    i = typeof i !== 'undefined' ? i : 0;

    // response is optional - response is a boolean that refers to whether the set of messages is a response to a question or the question itself
    response = typeof response !== 'undefined' ? response : 0;

    // add this HTML to the front and back of the message for #style
    var htmlWrapperBeginning = "<div class=\"msg_history\"><div class=\"incoming_msg\"><div class=\"received_msg\"><div class=\"animated fadeInUp bubbleLeft received_withd_msg\"><p>",
        htmlWrapperEnding = " </p><span class=\"voice\"></span></div></div></div>";

    // If this message is not the first, use the previous to calculate a delay, otherwise use a number
    var delay = (i > 0) ? calculateDelay(messagesArray[i - 1]) : 1000;
    // delay override - Make first responses quick
    if (!response && questions[currentQuestion].intro && i == 0) {
        delay = 50;
    }

    setTimeout(function () {
        // if it's the last message in the series
        if (i >= messagesArray.length) {

            // if it's the last response to an answer
            if (response) {
                currentQuestion++;
                createMessage(questions[currentQuestion].question);
                return 1;
            }
            // If it's the last question before an answer
            else {
                createAnswerField(delay);
                return 1;
            }
        }
        // if it's not the last message, display the next one
        else {

            $('#chat-container').append(htmlWrapperBeginning + messagesArray[i] + htmlWrapperEnding);
            //Special case for chat
            if ($(".active").attr('id') == "chat") {
                smoothScrollBottom();
            }
            i++;
            createMessage(messagesArray, i, response);
        }
    }, delay);
}

// Creates an answer input bubble
function createAnswerField() {
    var htmlAnswerField = "<div class=\"outgoing_msg\" id=\"answer-container\"> <div class=\"line animated fadeInUp bubbleRight sent_msg p\"><form action=\"#\" onsubmit=\"return false;\"><label for=\"answer\"></label><input required=\"required\" novalidate=\"novalidate\" autocomplete=\"on\" min=\"2\" max=\"40\" formnovalidate=\"formnovalidate\" spellcheck=\"true\" autofocus=\"autofocus\" type=\"text\" name=\"answer\" id=\"answer\" class=\"\" value=\"\" placeholder=\"Type response…\"></form></div></div>";

    if (questions[currentQuestion].ending) {
        return 1;
    }

    $('#chat-container').append(htmlAnswerField);

    $('#answer').keyup(function (event) {
        if (event.keyCode == 13) {
            var answer = $.trim($('#answer').val());
            if (answer != "") {
                $('#answer-container').remove();
                createAnswerMessage(answer);
            } else {
                $('#answer').removeClass('shake').removeClass('fadeInUp');
                $('#answer').addClass('shake');
                $('#answer').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $(this).removeClass('shake').removeClass('fadeInUp');
                });
            }
        }
    });

    $('#answer').focus();

    //Special case for chat
    if ($(".active").attr('id') == "chat") {
        smoothScrollBottom();
    }
}

function createAnswerMessage(answer) {
    var htmlWrapperBeginning = "<div class=\"outgoing_msg\"><div class=\"animated fadeInUp bubbleRight sent_msg\"><p>",
        htmlWrapperEnding = "</p><span class=\"voice\"></span></div></div>";

    $('#chat-container').append(htmlWrapperBeginning + answer + htmlWrapperEnding);

    if (local) {
        console.log(answer);
        console.log(questions[currentQuestion]);
    }

    // --- ANALYTICS --- //
    var dimensions = {
        question: questions[currentQuestion].name, // Which question is this?
        answer: answer,
        created_at: String(Date.now())
    };

    if (!local) {
        // Send the dimensions to Parse along with the 'search' event
        Parse.Analytics.track('read', dimensions);
    } else {
        console.log(dimensions);
    }
    // ------------------ //

    createMessage(findResponseForAnswer(answer, questions[currentQuestion].answers), 0, 1);
}

function findResponseForAnswer(answer, possibleAnswers) { //responses
    //for (k = 0; k < numOfElements(possibleAnswers); k++) {
    for (key in possibleAnswers) {
        // console.log(k + " - " + responses[k][0] + " == " + answer);
        if (answer.toLowerCase().match(key)) {
            return possibleAnswers[key].replies;
        }
    }
    console.log("!= " + answer);
    return possibleAnswers["default"].replies; // Default reponse
}

// Calculates the delay based on whatever string you give it
function calculateDelay(string) {
    // 275 words per minute in milliseconds plus a constant
    let delayPerWord = 218;
    let delay = string.split(" ").length * delayPerWord;
    delay = (delay < delayPerWord * 3) ? delay + 400 : delay;
    return delay;
}


// })(); END GLOBAL

$(document).ready(function () {
    new storyController(questions);
});
