const wrapper=document.querySelector('.wrapper'),
musicImg=wrapper.querySelector(".img_area img"),
musicName=wrapper.querySelector(".song-det .name"),
Artist=wrapper.querySelector(".song-det .artist"),
mainAudio=wrapper.querySelector('#main-audio'),
playpausebtn=wrapper.querySelector('.play_pause'),
prevbtn=wrapper.querySelector('#prev'),
nextbtn=wrapper.querySelector('#next'),
progressArea=wrapper.querySelector('.progress-area'),
progressBar=wrapper.querySelector('.progress-bar');




var musicIndex=1;

window.addEventListener('load',()=>{
loadMusic(musicIndex);
});

function loadMusic(indexnum){
    musicName.innerHTML=Allmusic[indexnum-1].name;
    Artist.innerHTML=Allmusic[indexnum-1].artist;
    musicImg.src= "images/"+Allmusic[indexnum-1].img+".jpg";
     mainAudio.src="songs/"+Allmusic[indexnum-1].src+".mp3"
   // console.log(musicImg.src);
}
function playMusic(){
    wrapper.classList.add('paused')
   // mainAudio.src="songs/"+Allmusic[indexnum-1].src+".mp3";
    playpausebtn.querySelector('i').innerText='pause';
    mainAudio.play();
}

function pauseMusic(){
    wrapper.classList.remove('paused')
    //mainAudio.src="songs/"+Allmusic[indexnum-1].src+".mp3";
    playpausebtn.querySelector('i').innerText='play_arrow';
    mainAudio.pause();
}

playpausebtn.addEventListener('click',()=>{
    const ispaused=wrapper.classList.contains('paused');
    ispaused ?  pauseMusic():playMusic();
        
});
function nextMusic(){
 musicIndex++;
    if(musicIndex>Allmusic.length){
        musicIndex=1;
    }else{
        musicIndex=musicIndex;
    }
    loadMusic(musicIndex)
    playMusic();
}
function prevMusic(){
    musicIndex--;
    if(musicIndex<1){
        musicIndex=Allmusic.length;
    }else{
        musicIndex=musicIndex;
    }
    loadMusic(musicIndex)
    playMusic();
}
nextbtn.addEventListener('click',()=>{
   nextMusic();
})

prevbtn.addEventListener('click',()=>{
   prevMusic();
});



mainAudio.addEventListener('timeupdate',(e)=>{
    const currentime=e.target.currentTime;
    const durationTime=e.target.duration;
    let progresswidth=(currentime/durationTime)*100;
    progressBar.style.width=progresswidth+'%';

if(progresswidth==100){
    nextMusic();
}
    let musiccurrenttime=wrapper.querySelector('.current'),
     musicduration=wrapper.querySelector('.duration');
    mainAudio.addEventListener('loadeddata',()=>{
       
        let audioduration=mainAudio.duration;
        let totalmin=Math.floor(audioduration/60);
        let totalsec=Math.floor(audioduration%60);
        if(totalsec<10){
            totalsec='0'+totalsec;
        }
        musicduration.innerHTML=totalmin+':'+totalsec;


    //   let audiocurrent=mainAudio.currentTime;
        
    });
     let currentmin=Math.floor(currentime / 60);
        let currentsec=Math.floor(currentime % 60);
        if(currentsec<10){
            currentsec='0'+currentsec;
        }
        musiccurrenttime.innerHTML=currentmin+':'+currentsec;
});

progressArea.addEventListener('click',(e)=>{
    let progresswidth=progressArea.clientWidth;
    let clickedoffset=e.offsetX;
    let songduration=mainAudio.duration;
    mainAudio.currentTime=(clickedoffset/progresswidth)*songduration;
    playMusic();
})