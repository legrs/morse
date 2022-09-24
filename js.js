let range = [ //スライダー
    document.querySelector("#frequency"),
    document.querySelector("#longDecision"),
    document.querySelector("#volume")
];
let frequency = range[0].value;
let longDecision = range[1].value;
let volume = range[2].value;
let rangehtml = [ //スライダーを数値化したもの(String型)
    document.querySelector("#frequencyhtml"),
    document.querySelector("#longDecisionhtml"),
    document.querySelector("#volumehtml")
];
let keyinput = document.querySelector("#keyinput");
let nyuryoku = document.querySelector("#nyuryoku");
let t = document.querySelector("#textarea");
let t2 = document.querySelector("#textarea2");
let remove = document.querySelector("#remove");
let t3 = "";
let m1 = document.querySelector("#mode1");
let m2 = document.querySelector("#mode2");
let em1 = document.querySelector("#exportmode1");
let em2 = document.querySelector("#exportmode2");
let savecookie = document.querySelector("#save");
let removecookie = document.querySelector("#removecookie");
m2.checked = true;
em1.checked = true;
let firstflg = true;
let audioCtx;
let oscillator;
let gain;
let play1 = false;
let keycode1 = "";
let keycodeArr = [17,16,13,32,65];
let keyArr = ["Ctrl","Shift","Enter","Space","A"];

let moji = "";
let alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0",  ".",",","?","-","/","@",":",";","(",")","SOS","OK",'"'];
let morseCode = ["・ー",
"ー・・・",
"ー・ー・",
"ー・・",
"・",
"・・ー・",
"ーー・",
"・・・・",
"・・",
"・ーーー",
"ー・ー",
"・ー・・",
"ーー",
"ー・",
"ーーー",
"・ーー・",
"ーー・ー",
"・ー・",
"・・・",
"ー",
"・・ー",
"・・・ー",
"・ーー",
"ー・・ー",
"ー・ーー",
"ーー・・", //z

"・ーーーー",
"・・ーーー",
"・・・ーー",
"・・・・ー",
"・・・・・",
"ー・・・・",
"ーー・・・",
"ーーー・・",
"ーーーー・",
"ーーーーー", //0

"・ー・ー・ー",
"ーー・・ーー",
"・・ーー・・",
"ー・・・・ー",
"ー・・ー・",
"・ーー・ー・",
"ーーー・・・",
"・・・・・ー",
"ー・ーー・",
"ー・ーー・ー",
"・・・ーーー・・・",
"・・・ー・",
"・ー・・ー・"
];
let alphabet2 = ["い","ろ","は","に","ほ","へ","と","ち","り","ぬ","る","を","わ","か","よ","た","れ","そ","つ","ね","な","ら","む","う","ゐ","の","お","く","や","ま","け","ふ","こ","え","て","あ","さ","き","ゆ","め","み","し","ゑ","ひ","も","せ","す","ん",  "゛","゜","ー","、","（","）"];
let morseCode2 = [
"・ー",
"・ー・ー",
"ー・・・",
"ー・ー・",
"ー・・",
"・",
"・・ー・・",
"・・ー・",
"ーー・",
"・・・・",
"ー・ーー・",
"・ーーー",
"ー・ー",
"・ー・・",
"ーー",
"ー・",
"ーーー",
"ーーー・",
"・ーー・",
"ーー・ー",
"・ー・",
"・・・",
"ー",
"・・ー",
"・ー・・ー",
"・・ーー",
"・ー・・・",
"・・・ー",
"・ーー",
"ー・・ー",
"ー・ーー",
"ーー・・",
"ーーーー",
"ー・ーーー",
"・ー・ーー",
"ーー・ーー",
"ー・ー・ー",
"ー・ー・・",
"ー・・ーー",
"ー・・・ー",
"・・ー・ー",
"ーー・ー・",
"・ーー・・",
"ーー・・ー",
"ー・・ー・",
"・ーーー・",
"ーーー・ー",
"・ー・ー・",

"・・",
"・・ーー・",
"・ーー・ー",
"・ー・ー・ー",
"ー・ーー・ー",
"・ー・・ー・"
];
let alphabet3 = [];
let morseCode3= [];
let tr200,tr300,tr400;
let long1 = false;
let long2 = false;
let long3 = false;
if(document.cookie="data="){
    console.log(document.cookie);
    let cookiee= document.cookie.replace("data=", "");
    let cookieee = cookiee.split("/");
    let cookieeee = [Boolean(cookieee[0]),Boolean(cookieee[1])];
    let cookieeeee = [Number(cookieee[2]),Number(cookieee[3]),Number(cookieee[4]),Number(cookieee[5])];
    console.log(cookieee);
    m1.checked = cookieeee[0];
    em1.checked = cookieeee[1];
    keycode1 = cookieeeee[0];
    frequency = cookieeeee[1];
    longDecision = cookieeeee[2];
    volume = cookieeeee[3];
}

range.forEach((element, index)=>{  //数値をスライダーの値にする
    element.addEventListener('input',()=>{
        rangehtml[index].value = element.value;
        frequency = range[0].value;
        longDecision = range[1].value;
        volume = range[2].value;
    });
});
rangehtml.forEach((element, index)=>{  //数値をスライダーの値にする
    element.addEventListener('input',()=>{
        range[index].value = element.value;
        frequency = range[0].value;
        longDecision = range[1].value;
        volume = range[2].value;
    });
});
function play(){
    stop();
    if(firstflg){
        audioCtx =  new AudioContext(); 
        firstflg = false;  
    }
    oscillator = audioCtx.createOscillator();
    oscillator.type="sine";
    oscillator.frequency.value = frequency;
    gain = audioCtx.createGain();
    gain.gain.value = volume /100;
    oscillator.connect(gain);
    gain.connect(audioCtx.destination);
    oscillator.start();  
}
function stop(){
    if(oscillator){
        oscillator.stop(); 
        gain.disconnect();
        oscillator.disconnect();
    }
}


//上


function push(){
    nyuryoku.style.backgroundColor = "rgb(255, 255, 255)";
    nyuryoku.style.color = "#000";
    play();

    t.value+="・";
    moji+="・";

    clearTimeout(tr300);
    clearTimeout(tr400);
    long1 = false;

    clearTimeout(tr200);
    tr200 = setTimeout(()=>{
        long1=true;

        t.value = t.value.slice(0,-1);
        moji = moji.slice(0,-1);
        t.value+="ー";
        moji+="ー";
    },longDecision);  //長さ判定
}
function decision(){
    nyuryoku.style.backgroundColor = "rgb(54, 134, 255)";
    nyuryoku.style.color = "#fff";
    stop();
    clearTimeout(tr200);
    long2 = true;

    clearTimeout(tr300);
    tr300 = setTimeout(() => {
        long2 = false;
        let tttt = t.value;
        if(alphabet[morseCode.indexOf(moji)]==undefined){
            t2.value+="█";
            t3+="█";
        }else{
            t2.value+=alphabet[morseCode.indexOf(moji)];
            t3+=alphabet[morseCode.indexOf(moji)];
        }
        moji="";
        console.log("kuria");
        t.value+="　";
        long3 = false;
        if(em2.checked==true){
            t.value = t3;
            t2.value = "";
        }
        clearTimeout(tr400);
        tr400 = setTimeout(() => {
            long3 = true;
            console.log("addsp");
            t2.value+=" ";
            t3+=" ";
            t.value+="　";
            if(em2.checked==true){
                t.value = t3;
                t2.value = "";
            }
        }, 4 * longDecision); //単語間
    }, 2 * longDecision); //文字間
}


//下


function changeMode(){
    if(m1.checked==true){
        alphabet3=alphabet;
        morseCode3=morseCode;
        alphabet=alphabet2;
        morseCode=morseCode2;
    }else{
        alphabet2=alphabet;
        morseCode2=morseCode;
        alphabet=alphabet3;
        morseCode=morseCode3;
    }
}
function zeroPadding(num){
    let str = ('000' + num).slice(-3);
    return Number(str);
}
nyuryoku.addEventListener("mousedown",()=>{
    push();
});
nyuryoku.addEventListener("mouseup",()=>{
    decision();
});
document.addEventListener("keydown",(e)=>{
    if(play1==false && keycode1==e.keyCode){
        play1 = true;
        push();
    }
});
document.addEventListener("keyup",(e)=>{
    if(keycode1==e.keyCode){
        play1 = false;
        decision();
    }
});
document.addEventListener("Blur",()=>{
    stop()
});
keyinput.addEventListener("keydown", (e)=>{
    keycode1 = e.keyCode;
    keyinput.value = "";
    if(keyArr[keycodeArr.indexOf(keycode1)] != undefined){
        keyinput.value = keyArr[keycodeArr.indexOf(keycode1)];
        keyinput.style.backgroundColor = "#fff";
        keyinput.style.caretColor = "#fff";
    }else{
        keycode1 =  -1;
        keyinput.style.backgroundColor = "rgb(255, 130, 130)";
        keyinput.style.caretColor = "rgb(255, 130, 130)";
    }
    
});
keyinput.addEventListener("input", ()=>{
    if(keycode1== -1){
        keyinput.value = "";
    }else{
        if(keycode1==65){
            keyinput.value = "A";
        }
    }
});
remove.addEventListener("click",()=>{
    clearTimeout(tr200);
    clearTimeout(tr300);
    clearTimeout(tr400);
    t.value="";
    t2.value="";
    t3="";
});
m1.addEventListener("click",changeMode);
m2.addEventListener("click",changeMode);
em1.addEventListener("click",()=>{
    t2.style.backgroundColor = "rgb(255, 255, 255)";
    t2.placeholder = "結果";
    t2.value = t3;
});
em2.addEventListener("click",()=>{
    t2.style.backgroundColor = "rgb(222, 222, 222)";
    t2.placeholder = "結果は上で上書きされます";
    t2.value = "";
});
savecookie.addEventListener("click",()=>{
    document.cookie = `data=${m1.checked}/${em1.checked}/${keycode1}/${frequency}/${longDecision}/${volume};max-age=31536000`;
});
removecookie.addEventListener("click",()=>{
    document.cookie = "data=; max-age=31536000";
});
