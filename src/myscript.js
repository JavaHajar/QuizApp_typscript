"use strict";
const quiz = [
    {
        question: "1. What does HTML stand for?",
        options: ["A. Hyper Tag Markup Language", "B. Hyper Text Markup Language", "C. Hyperlinks Text Mark Language", "D. Hyperlinking Text Marking Language"],
        answer: [false, true, false, false]
    },
    {
        question: "2. What symbol indicates a tag?",
        options: ["A. Angle brackets e.g.", "B. Curved brackets e.g. {,}", "C. Commas e.g. ','", "D. Exclamation marks e.g. !"],
        answer: [true, false, false, false]
    },
    {
        question: "3. Which of these are tags keyword?",
        options: ["A. Body", "B. Image", "C. main", "D. seed"],
        answer: [true, true, true, false]
    },
    {
        question: "4. What are spring moduls?",
        options: ["A. spring mvc", "B. spring security", "C. spring test", " D. spring management"],
        answer: [true, true, false, false]
    },
    {
        question: "5. What is  class in oop?",
        options: ["A. Can have some properties", "B. we can't create objects from", "C. Introduce in procedural programming", "D. Can have some functions"],
        answer: [true, false, false, true]
    }
];
// const for socre
const score = document.querySelector("#score");
const scoreArea = document.querySelector('.scoreArea');
// const for time
const maxTime = 300 * 1000;
const timerText = document.querySelector("#timer");
const timeOverMessage = document.querySelector(".timeOver");
let results = [];
// get inputs to insert answers
const qst = document.getElementById("qst");
const ans1Input = document.getElementById("ans1Input");
const ans2Input = document.getElementById("ans2Input");
const ans3Input = document.getElementById("ans3Input");
const ans4Input = document.getElementById("ans4Input");
// get user's answers
let ans1 = document.getElementById("ans1");
let ans2 = document.getElementById("ans2");
let ans3 = document.getElementById("ans3");
let ans4 = document.getElementById("ans4");
// insert questions and ansewrs into inputs
const submit = document.getElementById("submit");
let activeStep = 0;
//    function to insert data into input
function getQuestion() {
    if (activeStep <= quiz.length - 1) {
        qst.innerText = quiz[activeStep].question;
        ans1Input.innerText = quiz[activeStep].options[0];
        ans2Input.innerText = quiz[activeStep].options[1];
        ans3Input.innerText = quiz[activeStep].options[2];
        ans4Input.innerText = quiz[activeStep].options[3];
        return true;
    }
    else {
        return false;
    }
}
getQuestion();
submit.addEventListener("click", function () {
    checkUserAnswers();
    result();
    clearAnswers();
});
function result() {
    activeStep++;
    if (!getQuestion()) {
        getResult(results);
        // console.log(results);
    }
}
function getResult(results) {
    const count = results.filter((value) => value).length * 20;
    score.innerText = count.toString();
    scoreArea.style.display = "flex";
    console.log(count);
}
function checkUserAnswers() {
    if (activeStep >= quiz.length) {
        return;
        //   getResult()
    }
    let response = ans1.checked == quiz[activeStep].answer[0] && ans2.checked == quiz[activeStep].answer[1] && ans3.checked == quiz[activeStep].answer[2] && ans4.checked == quiz[activeStep].answer[3];
    console.log(response);
    collectAnswers(response);
}
function collectAnswers(response) {
    results.push(response);
}
function clearAnswers() {
    ans1.checked = false;
    ans2.checked = false;
    ans3.checked = false;
    ans4.checked = false;
}
// Time Manager
let timer = 0;
const timeClock = setInterval(() => {
    if (timer < maxTime) {
        timer += 1000; // 1000 => 1s
        timerText.innerText = (getReadableTimer(maxTime - timer));
    }
    else {
        clearInterval(timeClock);
        timeOverMessage.style.display = "flex";
    }
}, 1000);
// Get Time as readble by minutes & seconds
function getReadableTimer(timer) {
    let minutes = Math.floor(timer / 60000);
    let seconds = ((timer % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
