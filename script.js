let songs =[];
let currentsong = null;

const addbutton = document.getElementById("add-button");
const playlist = document.getElementById("playlist-list")
const songlist = document.getElementById("songlist")

const currenttitle = document.getElementById("current-title")
const currentauthor = document.getElementById("current-artist")

const audioplayer = document.getElementById("audio-player")
const playbutton = document.getElementById("play-button")
const prevbutton = document.getElementById("prev-button")
const nextbutton = document.getElementById("next-button")

const fileinput = document.getElementById("fileinput");
addbutton.addEventListener("click", () =>{
    fileinput.click();
});

fileinput.addEventListener("change",() =>{
    const file = fileinput.files[0];
    if(!file) return;
    const title = prompt("Song Title : ")
    if(!title) return;
    const artist = prompt("Song Artist : ")
    if(!artist) return;
    
    const song = {
        id: Date.now(),
        title: title,
        artist: artist,
        file: file
    };

    songs.push(song);
    rendersongs();
    fileinput.value = "";
});

function rendersongs(){
    songlist.innerHTML = "";
    playlist.innerHTML = "";

    songs.forEach(song => {
        const songelement = document.createElement("div");
        songelement.classList.add("song-item");
        songelement.innerHTML = `
        <strong>${song.title}</strong>
        <br>
        <small>${song.artist}</small>`;
        songlist.appendChild(songelement);
        songelement.addEventListener("click", () => {
            playsong(song);
        });

        const playlistelement = document.createElement("div");
        playlistelement.classList.add("playlist-item");
        playlistelement.innerHTML = `
        <strong>${song.title}</strong>
        <br>
        <small>${song.artist}</small>
        `
        playlist.appendChild(playlistelement);
        playlistelement.addEventListener("click", () => {
            playsong(song);
        });
    });
}



function playsong(song){
    currentsong = song;
    const songurl = URL.createObjectURL(song.file);
    audioplayer.src = songurl;

    currenttitle.textContent = song.title;
    currentauthor.textContent = song.artist;
    
    audioplayer.play();
}

playbutton.addEventListener("click", () =>{
    if(!currentsong) return;
    if(audioplayer.paused){
        audioplayer.play();
    }else{
        audioplayer.pause();
    }
})

audioplayer.addEventListener("play",() =>{
    playbutton.textContent = "II";
});

audioplayer.addEventListener("pause",() =>{
    playbutton.textContent = "O";
});

function nextsong(){
    if(!currentsong) return;

    const currentindex = songs.indexOf(currentsong);
    const nextindex = currentindex + 1;
    if(nextindex >= songs.length) return;
    playsong(songs[nextindex]);
}

nextbutton.addEventListener("click", () =>{
    nextsong();
});

function prevsong(){
    if(!currentsong) return;

    const currentindex = songs.indexOf(currentsong);
    const previousindex = currentindex - 1;
    if(previousindex < 0) return;
    playsong(songs[previousindex]);
}

prevbutton.addEventListener("click", () =>{
    prevsong();
});

audioplayer.addEventListener("ended", ()=>{
    nextsong();
});
