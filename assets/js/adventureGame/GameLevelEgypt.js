// To build GameLevels, each contains GameObjects from below imports
import Background from './Background.js';
import Player from './Player.js';
import Npc from './Npc.js';
import Quiz from './Quiz.js';
import GameControl from './GameControl.js';
import GameLevelStarWars from './GameLevelStarWars.js';
import Cat from './Cat.js';

class GameLevelEgypt {
  constructor(gameEnv) {
    // Values dependent on this.gameEnv.create()
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    // Function to log
    function logImageLoadingStatus(imageSrc, id) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => console.log(`Loaded image for ${id}: ${imageSrc}`);
      img.onerror = () => console.error(`Failed to load image for ${id}: ${imageSrc}`);
    }
    // Background data
    const image_src_egypt = path + "/images/gamify/ancientegyptbackground.png"; // be sure to include the path
    const image_data_egypt = {
        name: 'Ancient Egypt',
        greeting: "Oh no! Somehow, we travelled back to Ancient Egypt! Find your way out and travel back to your original timeline!",
        src: image_src_egypt,
        pixels: {height: 580, width: 1038}
    };


    // Player data for Tourist
    const sprite_src_tourist = path + "/images/gamify/tourist.png"; // be sure to include the path
    const TOURIST_SCALE_FACTOR = 5;
    const sprite_data_tourist = {
        id: 'Tourist',
        greeting: "I'm you! And I'm definitely not in the right era...",
        src: sprite_src_tourist,
        SCALE_FACTOR: TOURIST_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 100,
        INIT_POSITION: { x: 0, y: height - (height/TOURIST_SCALE_FACTOR) }, 
        pixels: {height: 320, width: 120},
        orientation: {rows: 4, columns: 3 },
        down: {row: 0, start: 0, columns: 3 },
        downRight: {row: 1, start: 0, columns: 3, rotate: Math.PI/16 },
        downLeft: {row: 2, start: 0, columns: 3, rotate: -Math.PI/16 },
        left: {row: 2, start: 0, columns: 3 },
        right: {row: 1, start: 0, columns: 3 },
        up: {row: 3, start: 0, columns: 3 },
        upLeft: {row: 2, start: 0, columns: 3, rotate: Math.PI/16 },
        upRight: {row: 1, start: 0, columns: 3, rotate: -Math.PI/16 },
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
    };

    
    // Rat Guide data
    const sprite_src_guide = path + "/images/gamify/ratguide.png"; // be sure to include the path
    logImageLoadingStatus(sprite_src_guide, 'Rat Guide');
    const sprite_greet_guide = "Hi, I'm the Rat and I'll be your guide. Ancient Egypt was one of the most advanced and influential civilizations in history...";
    const sprite_data_guide = {
      id: 'Rat Guide',
      greeting: sprite_greet_guide,
      src: sprite_src_guide,
      SCALE_FACTOR: 5,  // Adjust this based on your scaling needs
      ANIMATION_RATE: 100,
      pixels: {width: 171.6, height: 222.2},
      INIT_POSITION: { x: (width * 1 / 4), y: (height * 3 / 4) }, // Adjusted position
      orientation: {rows: 1, columns: 1 },
      down: {row: 0, start: 0, columns: 1 },  // This is the stationary npc, down is default 
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      reaction: function() {
        alert(sprite_greet_guide);
      },
    };

    // Log the guide's data and position
    console.log("Rat Guide Data:", sprite_data_guide);
    console.log("Rat Guide Position:", sprite_data_guide.INIT_POSITION.x, sprite_data_guide.INIT_POSITION.y);

    // NPC data for Pyramid Guard 
    const sprite_src_pyramidguard = path + "/images/gamify/pyramid_guard.png"; // be sure to include the path
    const sprite_greet_pyramidguard = "I am the guardian of the pyramid. Wait--you don't look like you're from around here. I'll have to quiz you! Press 'E' to start the quiz.";
    const sprite_data_pyramidguard = {
        id: 'Pyramid Guard',
        greeting: sprite_greet_pyramidguard,
        src: sprite_src_pyramidguard,
        SCALE_FACTOR: 5,  // Adjust this based on your scaling needs
        ANIMATION_RATE: 50,
        pixels: {height: 120, width: 63},
        INIT_POSITION: { x: (width / 2), y: (height / 2)},
        orientation: {rows: 1, columns: 1 },
        down: {row: 0, start: 0, columns: 1 },  // This is the stationary npc, down is default 
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        // Ancient egypt quiz
        quiz: { 
          title: "Ancient Egypt Quiz",
          questions: [
            "Who was the first pharaoh of Egypt?\n1. Narmer\n2. Ramses II\n3. Tutankhamun\n4. Cleopatra",
            "What is the name of the ancient Egyptian writing system?\n1. Hieroglyphics\n2. Cuneiform\n3. Latin\n4. Greek",
            "Which river was crucial to the development of ancient Egyptian civilization?\n1. Nile\n2. Amazon\n3. Tigris\n4. Euphrates",
            "What structure is the Great Pyramid of Giza?\n1. Tomb\n2. Temple\n3. Palace\n4. Fortress",
            "Who was the Egyptian god of the afterlife?\n1. Osiris\n2. Ra\n3. Anubis\n4. Horus",
            "What was the primary material used in ancient Egyptian construction?\n1. Stone\n2. Wood\n3. Brick\n4. Metal",
            "Which queen was known for her beauty and political acumen?\n1. Cleopatra\n2. Nefertiti\n3. Hatshepsut\n4. Isis",
            "What was the purpose of the Sphinx?\n1. Guardian of the Giza Plateau\n2. Temple\n3. Palace\n4. Fortress",
            "Which pharaoh's tomb was discovered intact in 1922?\n1. Tutankhamun\n2. Ramses II\n3. Akhenaten\n4. Hatshepsut",
            "What was the primary purpose of the pyramids?\n1. Tombs for pharaohs\n2. Temples\n3. Palaces\n4. Fortresses" 
          ] 
        },
        reaction: function() {
          alert(sprite_greet_pyramidguard);
        },
        interact: function() {
          let quiz = new Quiz(); // Create a new Quiz instance
          quiz.initialize();
          quiz.openPanel(sprite_data_pyramidguard.quiz);
          }
    
      };

    // NPC Data for Tomb Guard
    const sprite_src_tombguard = path + "/images/gamify/tomb_guard.png"; // be sure to include the path
    const sprite_greet_tombguard = "Ah, yes I've heard of you. I am the guardian of this tomb. I don't usually do this, but I'll let you pass just this once. Don't expect it again. Beware of the cat....";
    const sprite_data_tombguard = {
      id: 'Tomb Guard',
      greeting: sprite_greet_tombguard,
      src: sprite_src_tombguard,
      SCALE_FACTOR: 5,  // Adjust this based on your scaling needs
      ANIMATION_RATE: 100,
      pixels: {width: 63, height: 120},
      INIT_POSITION: { x: ((width * 1 / 4) + 100), y: ((height * 3 / 4) - 20)}, // Adjusted position
      orientation: {rows: 1, columns: 1 },
      down: {row: 0, start: 0, columns: 1 },  // This is the stationary npc, down is default 
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      /* Reaction function
      *  This function is called when the player interacts with the NPC
      *  It displays an alert with the greeting message
      */
      reaction: function() {
        alert(sprite_greet_tombguard);
      },
    };

    const sprite_src_cat = path + "/images/gamify/catenemy.png"; // be sure to include the path
    console.log(`Loading NPC sprite from: ${sprite_src_cat}`);
    const sprite_greet_cat = "It's over!";
    const sprite_data_cat = {
      id: 'Cat Enemy',
      greeting: sprite_greet_cat,
      src: sprite_src_cat,
      SCALE_FACTOR: 5,  // Adjust this based on your scaling needs
      ANIMATION_RATE: 100,
      pixels: {width: 63, height: 120},
      INIT_POSITION: { x: ((width * 1 / 4) + 100), y: ((height * 3 / 4) - 20)}, // Adjusted position
      orientation: {rows: 1, columns: 1 },
      down: {row: 0, start: 0, columns: 1 },  // This is the stationary npc, down is default 
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        /* Reaction function
        *  This function is called when the player interacts with the NPC
        *  It displays an alert with the greeting message
        */
      reaction: function() {
        alert(sprite_greet_cat);
      },

      interact: function() {
              // Set a primary game reference from the game environment
        let primaryGame = gameEnv.gameControl;
              // Define the game in game level
        let levelArray = [GameLevelStarWars];
              // Define a new GameControl instance with the StarWars level
        let gameInGame = new GameControl(path,levelArray);
              // Pause the primary game 
        primaryGame.pause();
              // Start the game in game
        gameInGame.start();
              // Setup "callback" function to allow transition from game in gaame to the underlying game
        gameInGame.gameOver = function() {
                // Call .resume on primary game
          primaryGame.resume();
        }
      }
    };
    
        // List of objects defnitions for this level
        this.classes = [
          { class: Background, data: image_data_egypt },
          { class: Player, data: sprite_data_tourist },
          { class: Npc, data: sprite_data_pyramidguard },
          { class: Npc, data: sprite_data_tombguard },
          { class: Npc, data: sprite_data_guide },
          { class: Cat, data: sprite_data_cat}
        ];
    
        
      }
    
    }
    
    export default GameLevelEgypt;
