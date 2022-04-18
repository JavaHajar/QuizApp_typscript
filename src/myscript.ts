type Quizz = {question:string,options:string[],answer:boolean[]}
const quiz:Quizz[] =[
   {
        question:"1. What does HTML stand for?",
        options:["A. Hyper Tag Markup Language", "B. Hyper Text Markup Language", "C. Hyperlinks Text Mark Language", "D. Hyperlinking Text Marking Language"],
        answer:[false, true,false,false]
    },
    {
        question:"2. What symbol indicates a tag?",
        options:["A. Angle brackets e.g.", "B. Curved brackets e.g. {,}", "C. Commas e.g. ','", "D. Exclamation marks e.g. !"],
        answer:[true, false, false,false]
    },
    {
        question:"3. Which of these are tags keyword?",
        options:["A. Body", "B. Image", "C. main", "D. seed"],
        answer:[true, true,true,false]
    },
    {
        question:"4. What are spring moduls?",
        options:["A. spring mvc", "B. spring security", "C. spring test", " D. spring management"],
        answer:[true, true,false,false]
    },
    {
        question:"5. What is  class in oop?",
        options:["A. Can have some properties", "B. we can't create objects from", "C. Introduce in procedural programming", "D. Can have some functions"],
        answer:[true,false,false, true]
    }
   ]
  
   // const for socre
   const score:HTMLHeadingElement = document.querySelector("#score") as HTMLHeadingElement;
   const scoreArea:HTMLDivElement = document.querySelector('.scoreArea') as HTMLDivElement;
   // const for time
   const maxTime:number = 300*1000
   const timerText: HTMLSpanElement = document.querySelector("#timer") as HTMLSpanElement
   const timeOverMessage:HTMLDivElement = document.querySelector(".timeOver") as HTMLDivElement

   
   let results:boolean[]=[];

   // get inputs to insert answers
   const qst= document.getElementById("qst")! as HTMLHtmlElement;
   const ans1Input= document.getElementById("ans1Input")! as HTMLHtmlElement;
   const ans2Input= document.getElementById("ans2Input")! as HTMLHtmlElement;
   const ans3Input= document.getElementById("ans3Input")! as HTMLHtmlElement;
   const ans4Input= document.getElementById("ans4Input")! as HTMLHtmlElement;
  
   // get user's answers
   let ans1 =document.getElementById("ans1")! as HTMLInputElement;
   let ans2 =document.getElementById("ans2")! as HTMLInputElement;
   let ans3 =document.getElementById("ans3")! as HTMLInputElement;
   let ans4 =document.getElementById("ans4")! as HTMLInputElement;




   // insert questions and ansewrs into inputs
   const submit= document.getElementById("submit")! as HTMLHtmlElement;
   let activeStep: number=0;


//    function to insert data into input
   function getQuestion():boolean{  
       if(activeStep<=quiz.length-1) {
        qst.innerText=quiz[activeStep].question;
        ans1Input.innerText=quiz[activeStep].options[0];
        ans2Input.innerText=quiz[activeStep].options[1];
        ans3Input.innerText=quiz[activeStep].options[2];
        ans4Input.innerText=quiz[activeStep].options[3]; 
        return true;
       }else{
           return false;
       }      
   }
  getQuestion();


  submit.addEventListener("click", function(){
        checkUserAnswers();
        result();
        clearAnswers();        
  })

  
  function result(){
    activeStep++;
    if(!getQuestion()){
        getResult(results);
        // console.log(results);
    }
  
  }
  function getResult(results:boolean[]){ 
    const count:number = results.filter((value) => value).length*20; 
    score.innerText = count.toString();
    scoreArea.style.display = "flex"
    console.log(count);
  }

  function checkUserAnswers() {
      if(activeStep >= quiz.length){
          return
        //   getResult()
      }
    let response:boolean =  ans1.checked == quiz[activeStep].answer[0] && ans2.checked == quiz[activeStep].answer[1] && ans3.checked == quiz[activeStep].answer[2] && ans4.checked == quiz[activeStep].answer[3]
    console.log(response);  
    collectAnswers(response);   
}

function collectAnswers(response:boolean){
    results.push(response);
}

function clearAnswers():void{
    ans1.checked = false
    ans2.checked = false
    ans3.checked = false
    ans4.checked = false
}
// Time Manager
let timer:number = 0
const timeClock = setInterval(()=>{
    if(timer < maxTime){
        timer += 1000 // 1000 => 1s
        timerText.innerText = (getReadableTimer(maxTime-timer))
    }else{
        clearInterval(timeClock)
        timeOverMessage.style.display = "flex"
    }
}, 1000)

// Get Time as readble by minutes & seconds
function getReadableTimer(timer:number):string {
    let minutes:number = Math.floor(timer / 60000)
    let seconds:number = (((timer % 60000) / 1000).toFixed(0) as unknown) as number
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
}

   
    
