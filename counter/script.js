const increase = document.querySelector('.increase')
const value = document.querySelector('#value');
const btns = document.querySelectorAll('.btn');


let count = 0;
btns.forEach(function(btn){
   
    btn.addEventListener('click', function(e){
        const style =e.currentTarget.classList
        if(style.contains('decrease')){
            count--
        }
        value.textContent = count;

        if(style.contains('increase')){
            count++
        }
        value.textContent = count;

        if(style.contains('reset')){
            value.textContent = 0;
        }
        // value.textContent = count;

    })
    
})

