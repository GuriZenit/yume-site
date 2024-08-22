document.addEventListener("DOMContentLoaded", function () {
  const mobileBackground = document.querySelector(".mobile-background");
  const stopButton = document.getElementById("bgm-stop-button");
  const playButton = document.getElementById("play-button");
  const bgmInfo = document.querySelectorAll(".bgm-info");
  const bgmTitle = document.getElementById("bgm-title");
  const gif = document.querySelector(".middle-gif");
  const body = document.querySelector("body");
  const audio = document.getElementById("bgm");
  
  const songNames = ["なつかしいうた", "とりはそと、おにはうち", "The End"]
  const randomTheme = Math.floor(Math.random() * songNames.length);

  mobileBackground.src = `assets/img/background-${randomTheme}.png`;
  bgmTitle.innerText = `Song: ${songNames[randomTheme]}`;
  audio.lastElementChild.src = `assets/audio/song-${randomTheme}.ogg`;
  body.style.backgroundImage = `url(assets/img/background-${randomTheme}.png)`;
  
  audio.load();
  
  playButton.addEventListener("click", async function () {
    audio.play().catch(function (error) {
      console.log("Autoplay was prevented:", error);
    });
    
    playButton.style.display = "none";
    gif.style.display = "block";
    stopButton.style.display = "block";
    bgmInfo.forEach(function (info) {
      info.style.display = "block";
    });
    
    gif.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 1000,
      fill: "forwards",
    });
  });
  

  const audioEnded = function () {
    audio.currentTime = 0;
    stopButton.style.display = "none";
    playButton.style.display = "block";
    gif.style.display = "none";
    bgmInfo.forEach(function (info) {
      info.style.display = "none";
    });
  };

  audio.addEventListener("ended", audioEnded);
  audio.addEventListener("pause", audioEnded);

  stopButton.addEventListener("click", function () {
    audio.pause();
  });
});
