document.addEventListener("DOMContentLoaded", function () {
  const mobileBackground = document.querySelector(".mobile-background");
  const nextButton = document.getElementById("bgm-next-button");
  const stopButton = document.getElementById("bgm-stop-button");
  const prevButton = document.getElementById("bgm-prev-button");
  const playButton = document.getElementById("play-button");
  const hideButton = document.getElementById("hide-button");
  const mainPage = document.querySelector(".main-page");
  const bgmInfo = document.querySelectorAll(".bgm-info");
  const bgmTitle = document.getElementById("bgm-title");
  const gif = document.querySelector(".middle-gif");
  const body = document.querySelector("body");
  const audio = document.getElementById("bgm");

  const songNames = [
    "なつかしいうた",
    "とりはそと、おにはうち",
    "The End",
    "さむくてあったかい、ふゆ〜雪の世界〜",
    "ゆめのはじまり",
    "FEVER",
    "それで、どっちからきたっけ",
    "ひなたぼっこ",
  ];
  let randomTheme = Math.floor(Math.random() * songNames.length);

  const setTheme = (theme) => {
    mobileBackground.src = `assets/img/background-${theme}.png`;
    bgmTitle.innerText = `${songNames[theme]}`;
    audio.lastElementChild.src = `assets/audio/song-${theme}.ogg`;
    body.style.backgroundImage = `url(assets/img/background-${theme}.png)`;
  };

  setTheme(randomTheme);

  audio.load();

  playButton.addEventListener("click", async function () {
    audio.play().catch(function (error) {
      console.log("Autoplay was prevented:", error);
    });

    playButton.style.display = "none";
    gif.style.display = "block";
    stopButton.style.display = "block";
    prevButton.style.display = "block";
    nextButton.style.display = "block";
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
    nextButton.style.display = "none";
    prevButton.style.display = "none";
    playButton.style.display = "block";
    gif.style.display = "none";
    bgmInfo.forEach(function (info) {
      info.style.display = "none";
    });
  };

  const nextSong = () => {
    randomTheme = (randomTheme + 1) % songNames.length;
    setTheme(randomTheme);

    audio.load();
    audio.play();
  };

  const prevSong = () => {
    randomTheme = (randomTheme - 1 + songNames.length) % songNames.length;
    setTheme(randomTheme);

    audio.load();
    audio.play();
  };

  nextButton.addEventListener("click", nextSong);
  prevButton.addEventListener("click", prevSong);
  audio.addEventListener("ended", nextSong);


  stopButton.addEventListener("click", function () {
    audio.pause();
    audioEnded();
  });

  const hideMainPage = () => {
    mainPage.style.display =
      mainPage.style.display === "none" ? "flex" : "none";
  };

  hideButton.addEventListener("mouseenter", hideMainPage);
  hideButton.addEventListener("mouseleave", hideMainPage);
});
