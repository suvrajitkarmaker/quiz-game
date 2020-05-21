const message = document.querySelector('.message');
const game = {};
const output = document.querySelector('.que');
const nx = document.querySelector('.next');

nx.addEventListener('click', createQuestion);
const url= 'https://script.google.com/macros/s/AKfycbx_wYcooFqPYUiEonFTUnLpVkBMqTxsx8J0FAX8wcTMhf8M8cMU/exec';

fetch(url).then(function(res){
    return res.json();
}).then(function(data){
    //console.log(data.data);
    game.total = data.data.length;
    game.val = 0;
    game.score = 0;
    game.arr = data.data;
    // data.data.forEach(function(el){
    //     //console.log(el);
    // })
    createQuestion();
})
function createQuestion(){
    nx.style.display = "none";
    if(game.val+1 > game.total){
        message.textContent = 'your score was '+ game.score + ' out of '+game.total;
        output.textContent = 'Game over';
        output.classList.add('gameover');
    }else{

        message.textContent = 'Question #'+(game.val + 1) + ' out of '+game.total;
        output.innerHTML = ' ';
        let q = game.arr[game.val];
        const main = document.createElement('div');
        main.textContent = q.question;
        main.classList.add('question');
        output.appendChild(main);
        arrayRandom(q.opt);
        q.opt.forEach(function(el){
            let span = document.createElement('span');
            span.textContent = el;
            span.classList.add('answer');
            span.classList.add('btn');
            output.appendChild(span);
            span.ans = q.answer;
            span.addEventListener('click',checker);
        })
    }
}
function arrayRandom(arr){
    arr.sort(function(){
        return .5 - Math.random();
    });
}
function checker(e){
    // console.log(e.target.textContent);
    // console.log(this.ans);
    const selAns = document.querySelectorAll('.answer');
    selAns.forEach(function(ele){
        ele.classList.remove('answer');
        ele.classList.add('afterChoseAnswer');
        ele.removeEventListener('click',checker);
    })

    let sel = e.target;
    if(sel.textContent == sel.ans){
        console.log('correct');
        sel.style.color = 'limegreen';
        nx.textContent = 'Correct ans. Please click to move to the next question';
        nx.style.background='limegreen';
        game.score++;
    } else {
        console.log('wrong');
        sel.style.color = 'red';
        nx.textContent = 'Wrong ans. Please click to move to the next question';
        nx.style.background='red';
    }
    game.val++;
    nx.style.display = "block";
}
