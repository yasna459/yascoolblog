---
layout: base
title: Home Page
description: Yasna's Blog
hide: true
---

<audio id="background-audio" preload="auto" muted>
  <source src="audio/videoplayback (1).ogg" type="audio/ogg">
  <source src="audio/videoplayback (1).mp3" type="audio/mpeg">
</audio>

<script>
  const audio = document.getElementById("background-audio");

  document.addEventListener("click", () => {
    if (audio.paused) {
      audio.muted = false;
      audio.play().catch(() => console.log("Autoplay failed"));
    }
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

