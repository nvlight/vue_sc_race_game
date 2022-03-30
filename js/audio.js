let audio = new Audio('./audio/soundtrack.mp3')
let audio_btn  = document.querySelector('.btn__sound')
let audio_icon = document.querySelector('.btn__sound i')

audio.muted = true;
audio.autoplay = true;
audio.volume = 0.2;

audio.addEventListener('loadmetadata', function () {
    audio.currentTime = 0 + Math.random() * (audio.duration + 1 - 0);
});

audio_btn.addEventListener('click', function () {
    if (audio.muted){
        audio.muted = false;
        audio_icon.classList.add('fa-volume-up');
        audio_icon.classList.remove('fa-volume-off');
    }else{
        audio.muted = true;
        audio_icon.classList.remove('fa-volume-up');
        audio_icon.classList.add('fa-volume-off');
    }
});