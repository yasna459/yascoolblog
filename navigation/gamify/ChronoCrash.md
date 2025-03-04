---
layout: base
title: Chrono - Crash
permalink: /gamify/ChronoCrash
---

<div id="gameContainer">
    <div id="promptDropDown" class="promptDropDown" style="z-index: 9999"></div>
    <img src="{{site.baseurl}}/images/gamify/chronocrash.png" alt="Chrono Crash" id="overlayImage">
    <canvas id='gameCanvas'></canvas>
</div>

<script type="module">
    import GameControl from '{{site.baseurl}}/assets/js/adventureGame/GameControl.js';
    const path = "{{site.baseurl}}";
    new GameControl(path).start();
</script>

<style>
    #gameContainer {
        position: relative;
        text-align: center;
        min-height: 60vh; /* Ensure the game container takes up most of the viewport height */
        margin-bottom: 20vh; /* Add space at the bottom for the footer */
    }

    #overlayImage {
        width: 300px; /* Set a specific width to make the image smaller */
        height: auto;
        margin-bottom: 10px; /* Reduce space between the image and the canvas */
    }

    #gameCanvas {
        display: block;
        margin: 0 auto; /* Center the canvas */
    }
</style>