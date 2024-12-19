---
layout: base
title: Home Page
description: Yasna's Blog
hide: true
---

<audio id="background-audio" preload="auto">
  <source src="audio/videoplayback (1).ogg" type="audio/ogg">
  <source src="audio/videoplayback (1).mp3" type="audio/mpeg">
</audio>

<!-- Custom Play/Pause Button -->
<button id="play-button">Play Audio</button>

<script>
  const playButton = document.getElementById("play-button");
  const audio = document.getElementById("background-audio");

  // Ensure audio is fully loaded before attempting to play
  audio.addEventListener("canplaythrough", function() {
    console.log("Audio is ready to play");
  });

  playButton.addEventListener("click", function() {
    if (audio.paused) {
      // Play the audio and ensure it is loaded
      audio.play().then(() => {
        playButton.textContent = "Pause Audio";  // Change to "Pause Audio"
      }).catch(error => console.error("Audio play failed: ", error));
    } else {
      audio.pause();
      playButton.textContent = "Play Audio"; // Change to "Play Audio"
    }
  });

  // Ensure the audio starts from the beginning when played
  audio.addEventListener("play", function() {
    console.log("Audio started playing");
    // Reset to start (in case of previous playback stopping prematurely)
    audio.currentTime = 0;
  });
</script>



Hi! I'm Yasna Ahmadi, a freshman at Del Norte High School. I love to bake, cook, draw, and play tennis. My favorite color is pink, lavender, and navy blue.

<div style="display: flex; justify-content: space-evenly; gap: 10px; flex-wrap: wrap;">
  <img src="images/image-removebg-preview.png" alt="alt text" style="width: 150px; height: auto; margin-top: 60px;">
  <img src="images/lavender panton2.png" alt="alt text" style="width: 200px; height: auto;">
  <img src="images/navy blue pantone.png" alt="alt text" style="width: 200px; height: auto;">
  <img src="images/pinkpantone.png" alt="alt text"
  style="width: 200px; height:auto;">
</div>

[GITHUB](https://github.com/yasna459/yascoolblog)

[TOOLS CHECK](https://yasna459.github.io/yascoolblog/devops/tools/verify)

