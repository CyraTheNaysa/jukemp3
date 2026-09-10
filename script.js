let songs =[];
const addbutton = document.getElementById("add-button");
const playlist = document.getElementById("playlist-list")
const songlist = document.getElementById("songlist")

addbutton.addEventListener("click", () =>{
    const title = prompt("Song Title : ")
    if(!title) return;
    const artist = prompt("Song Artist : ")
    if(!artist) return;

    const fileinput = document.createElement("input");
    fileinput.type = "file";
    fileinput.accept = "audio/*";
    fileinput.click();

    fileinput.addEventListener("change", ()=>{
        const file = fileinput.files[0];
        if(!file) return;
        const song = {
            id: Date.now(),
            title: title,
            artist: artist,
            file: file
        };

        songs.push(song);
        rendersongs();
    });

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

        const playlistelement = document.createElement("div");
        playlistelement.classList.add("playlist-item");
        playlistelement.innerHTML = `
        <strong>${song.title}</strong>
        <br>
        <small>${song.artist}</small>
        `
        playlist.appendChild(playlistelement);
    });
}