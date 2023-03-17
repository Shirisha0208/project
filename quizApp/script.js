
const start_btn = document.querySelector('.start-btn');
const info_box = document.querySelector('.info-box');
const quit_btn = info_box.querySelector('.buttons .quit');
const continue_btn =info_box.querySelector('.buttons .restart');
const quiz_box =document.querySelector('.quiz-box');
const option_list = document.querySelector('.option-list');
const timeCount = quiz_box.querySelector('.timer .timer-sec');
const timeLine = quiz_box.querySelector('header .time-line');
const timeText =  quiz_box.querySelector('.timer .time-text');


//creating an array and passing the number, questions, options, and answers

let questions = [
    {
        numb: 1,
        question: 'what does HTML stands for?',
        answer:  'Hyper Text Markup language',
        options: [
            'Hyper Text Preprocessor',
            'Hyper Text Markup language',
            'Hyper Text Multiple language',
            'Hyper Tool Multi language'
        ]
    },
    {
        numb: 2,
        question: 'what does CSS stands for?',
        answer:  'cascading style sheet',
        options: [
            'common style sheet',
            'colorful style sheet',
            'computer style sheet',
            'cascading style sheet'
        ]
    },
    {
        numb: 3,
        question: 'what does PHP stands for?',
        answer:   'hyperText programming',
        options: [
            'hyperText preprocessor',
            'hyperText programming',
            'hyperText preprogrammed',
            'hyperText preprocessor'
        ]
    },
    {
        numb: 4,
        question: 'what does SQL stands for?',
        answer:  'structured query language',
        options: [
            'stylish Question language',
            'stylesheet query language',
            'statement question language',
            'structured query language'
        ]
    },
    {
        numb: 5,
        question: 'what does XML stands for?',
        answer:   'extensible markup language',
        options: [
            'extensible markup language',
            'executable multiple language ',
            'extra multiple-program language',
            'examine multiple language'
        ]
    },
]





// is start click button clicked

start_btn.onclick = () =>{
    info_box.classList.add('activeInfo') //show the info box
}


//if exit button clicked
quit_btn.onclick = () =>{
    info_box.classList.remove('activeInfo') //hide the info box
}

//if continue button clicked
continue_btn.onclick = () =>{
    info_box.classList.remove('activeInfo'); //hide the info box
    quiz_box.classList.add('activeQuiz'); //show the quiz box
    showQuestion(0);
    queCounter(1);
    startTimer(15)
    startTimerLine(0)
}

let que_count = 0;
let que_numb = 1;
let counter;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector('.next-btn');
const result_box = document.querySelector('.result-box')
const restart_quiz = result_box.querySelector('.buttons .restart');
const quit_quiz = result_box.querySelector('.buttons .quit');

restart_quiz.onclick = () =>{
    quiz_box.classList.add('activeQuiz');
    result_box.classList.remove('activeResult');
    

    let que_count = 0;
    let que_numb = 1;
    let counter;
    let counterLine;
    let timeValue = 15;
    let widthValue = 0;
    let userScore = 0;

    showQuestion(que_count)
    queCounter(que_numb);
    clearInterval(counter)
    startTimer(timeValue)
    clearInterval(counterLine)
    startTimerLine(widthValue)
    next_btn.style.display = 'none';
    timeText.textContent = 'Time Left';

}

quit_quiz.onclick = () =>{
    window.location.reload();
}


next_btn.onclick = () =>{
   if (que_count < questions.length - 1){
    que_count++;
    que_numb++;
    showQuestion(que_count)
    queCounter(que_numb);
    clearInterval(counter)
    startTimer(timeValue)
    clearInterval(counterLine)
    startTimerLine(widthValue);
    // next_btn.style.display = 'none'
    timeText.textContent = 'Time Left'

   }else{
    // console.log('questions complected');
    clearInterval(counter)
    // startTimer(timeValue)
    clearInterval(counterLine)
    showResultBox();
   }
}

//getting questions and answers from an array
function showQuestion(index){
    const que_text = document.querySelector('.que-text');
   
    let que_tag = `<span>${questions[index] .numb}.${questions[index] .question} </span>`;
    // console.log(que_tag)
    let option_tag = `<div class="option">${questions[index].options[0]}<span></span></div>` 
                     + `<div class="option">${questions[index].options[1]}<span></span></div>`
                     + `<div class="option">${questions[index].options[2]}<span></span></div>`
                     + `<div class="option">${questions[index].options[3]}<span></span></div>`;
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
   
    const option = option_list.querySelectorAll('.option');
    for(let i = 0; i < option.length; i++){
        option[i].setAttribute('onclick', 'optionSelected(this)')
    }
    
   
}

let tickIcon = '<div class="icon tick"><span class="material-symbols-outlined">done</span></div>'
let crossIcon = '  <div class="icon cross"><span class="material-symbols-outlined">close</span></div>'

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine)
     let userAns = answer.textContent;
     let correctAns = questions[que_count].answer;
     let allOptions = option_list.children.length;

     if(userAns == correctAns){
        userScore += 1;
        console.log(userScore)
          answer.classList.add('correct')
          console.log('answer is correct')
          answer.insertAdjacentHTML('beforeend', tickIcon);
        //   next_btn.style.display = 'block'
    }else{
          answer.classList.add('incorrect')
          console.log('answer is wrong')
          answer.insertAdjacentHTML('beforeend', crossIcon);
          for(let i = 0; i < allOptions; i++){
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute('class', 'option correct')
                option_list.children[i].insertAdjacentHTML('beforeend', tickIcon);
            }
            
          }
          next_btn.style.display = 'block'
    }

    //once user selected disabled all options
    for(let i = 0; i < allOptions; i++){
        option_list.children[i].classList.add('disabled')
    }
    next_btn.style.display = 'block'
}

    
    function showResultBox(){
        info_box.classList.remove('activeInfo'); //hide the info box
        quiz_box.classList.remove('activeQuiz'); //hide the quiz box
        result_box.classList.add('activeResult'); //show result

        const scoreText = result_box.querySelector('.score-text');
        if(userScore > 3){
            let scoreTag = `<span>and congrats!, you got <p> ${userScore} </p> out of <p>${questions.length}</p></span>`;
            scoreText.innerHTML = scoreTag;
        }
        else if(userScore > 1){
            let scoreTag = `<span>and nice, you got <p> ${userScore} </p> out of <p>${questions.length}</p></span>`;
            scoreText.innerHTML = scoreTag;
        }
        else{
            let scoreTag = `<span>and sorry, you got only <p> ${userScore} </p> out of <p>${questions.length}</p></span>`;
            scoreText.innerHTML = scoreTag;
        }
    }



function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = '0' + addZero;
        }

        if(time < 0){
            clearInterval(counter)
            timeCount.textContent = '00';
            timeText.textContent = 'Time Out'

            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for(let i = 0; i < allOptions; i++){
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute('class', 'option correct')
                    option_list.children[i].insertAdjacentHTML('beforeend', tickIcon);
                }
                
              }
              for(let i = 0; i < allOptions; i++){
                option_list.children[i].classList.add('disabled')
            }
            next_btn.style.display = 'block'

              
        }

        
    }
}



function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
     time += 1;
     timeLine.style.width = time + 'px'
      

        if(time > 549){
            clearInterval(counterLine)
         
        }

        
    }
}













function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector('.total-que');
    let totalQuesCounter = `<span><p>${index}</p> of <p>${questions.length}</p></span>`

    bottom_ques_counter .innerHTML = totalQuesCounter

    
}





