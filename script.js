document.addEventListener("DOMContentLoaded", function () {
  const gif = document.querySelector(".image");
  const playButton = document.getElementById("play-button");
  const audio = document.getElementById("bgm");
  const bgmInfo = document.querySelectorAll(".bgm-info");

  playButton.addEventListener("click", function () {
    audio.play().catch(function (error) {
      console.log("Autoplay was prevented:", error);
    });

    playButton.style.display = "none";
    gif.style.display = "block";
    bgmInfo.forEach(function (info) {
      info.style.display = "block";
    });

    gif.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 1000,
      fill: "forwards",
    });
  });

  audio.addEventListener("ended", function () {
    playButton.style.display = "block";
    gif.style.display = "none";
    bgmInfo.forEach(function (info) {
      info.style.display = "none";
    });
  });
});
