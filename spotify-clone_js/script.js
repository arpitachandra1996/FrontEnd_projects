//Initialize variables
let songIndex = 0;
let audioElement = new Audio('mp3/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "mp3/1.mp3" ,coverPath: "covers/2.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "mp3/2.mp3" ,coverPath: "covers/3.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "mp3/3.mp3" ,coverPath: "covers/4.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "mp3/4.mp3" ,coverPath: "covers/5.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "mp3/5.mp3" ,coverPath: "covers/6.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "mp3/6.mp3" ,coverPath: "covers/7.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "mp3/7.mp3" ,coverPath: "covers/8.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "mp3/8.mp3" ,coverPath: "covers/9.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "mp3/9.mp3" ,coverPath: "covers/10.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "mp3/10.mp3" ,coverPath: "covers/2.jpg"},
]

songItems.forEach((element, i)=>{
    
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})

//audioElement.play();

//handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause-circle');
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-circle-play');
    }
})

//listen to events
audioElement.addEventListener('timeupdate', ()=>{

    //update seekbar
   progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
   myProgressBar.value = progress;
})

myProgressBar.addEventListener(`change`, ()=>{
    audioElement.currentTime=myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-circle-play');
    })
   
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
    element.addEventListener('click', (e)=>{
       makeAllPlays();
       index = parseInt(e.target.id);
       e.target.classList.remove('fa-circle-play');
       e.target.classList.add('fa-pause-circle');
       masterSongName.innerText = songs[index].songName;
       audioElement.src = `mp3/${index+1}.mp3`;
       audioElement.currentTime = 0;
       audioElement.play();
       masterPlay.classList.remove('fa-circle-play');
       masterPlay.classList.add('fa-pause-circle');
    })
    
}) 

document.getElementById(`next`).addEventListener(`click`, ()=>{
    if(index>=9){
        index = 0
    }
    else{
        index += 1 ;
    }
    audioElement.src = `mp3/${index+1}.mp3`;
    masterSongName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById(`prev`).addEventListener(`click`, ()=>{
    if(index<=0){
        index = 0
    }
    else{
        index -= 1 ;
    }
    audioElement.src = `mp3/${index+1}.mp3`;
    masterSongName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-pause-circle');
})