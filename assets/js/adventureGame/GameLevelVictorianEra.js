import GameEnv from './GameEnv.js';
import Background from './Background.js';
import Player from './Player.js';
import Npc from './Npc.js';
import Enemy from './Enemy.js';


/**
 * GameLevelVictorianEra class manages the Victorian Era level.
 * 
 * This class initializes the game objects for the Victorian Era level, including the background,
 * player, NPCs, guards, and enemies. It also sets up the sprite data for each object.
 * 
 * @class GameLevelVictorianEra
 */
class GameLevelVictorianEra {
    /**
     * Constructor for the GameLevelVictorianEra class.
     * 
     * @param {string} path - The base path for the game assets.
     */
    constructor(path) {
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        let width = GameEnv.innerWidth;
        let height = GameEnv.innerHeight;

        const image_src_victorian_era = path + "/images/victorianerabackground.png";
        const image_data_victorian_era = {
            name: 'victorian_era',
            greeting: "Welcome to the Victorian Era! Explore the streets and learn about the history!",
            src: image_src_victorian_era,
            pixels: { height: 580, width: 1038 }
        };

        const sprite_src_player = path + "/images/player_sprite.png";
        const sprite_data_player = {
            id: 'Player',
            greeting: "Hi, I am the adventurer exploring the Victorian Era!",
            src: sprite_src_player,
            SCALE_FACTOR: 5,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 0, y: height - (height / 5) }, 
            pixels: { height: 384, width: 512 },
            orientation: { rows: 3, columns: 4 },
            down: { row: 0, start: 0, columns: 3 },
            left: { row: 2, start: 0, columns: 3 },
            right: { row: 1, start: 0, columns: 3 },
            up: { row: 3, start: 0, columns: 3 },
            hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
            keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
        };

        const sprite_src_guide = path + "/images/guide_sprite.png";
        const sprite_data_guide = {
            id: 'Guide',
            greeting: "Hi, I am your guide! I will teach you about the Victorian Era.",
            src: sprite_src_guide,
            SCALE_FACTOR: 8,
            ANIMATION_RATE: 50,
            pixels: { height: 256, width: 352 },
            INIT_POSITION: { x: (width / 2), y: (height / 2) },
            orientation: { rows: 8, columns: 11 },
            down: { row: 5, start: 0, columns: 3 },
            hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
            quiz: { 
                title: "Victorian Era Trivia",
                questions: [
                    "Who was the reigning monarch during the Victorian Era?\n1. Queen Victoria\n2. King George V\n3. Queen Elizabeth I\n4. King Edward VII",
                    "What was the primary mode of transportation in the Victorian Era?\n1. Horse-drawn carriages\n2. Automobiles\n3. Bicycles\n4. Trains",
                    "Which famous author wrote 'A Christmas Carol'?\n1. Charles Dickens\n2. Jane Austen\n3. Mark Twain\n4. Leo Tolstoy",
                    "What was the main source of lighting in Victorian homes?\n1. Gas lamps\n2. Electric lights\n3. Candles\n4. Oil lamps",
                    "Which invention is attributed to Alexander Graham Bell?\n1. Telephone\n2. Telegraph\n3. Radio\n4. Light bulb",
                    "What was the primary material used in Victorian architecture?\n1. Brick\n2. Wood\n3. Stone\n4. Glass",
                    "Which event marked the beginning of the Victorian Era?\n1. Queen Victoria's coronation\n2. The Industrial Revolution\n3. The Great Exhibition\n4. The Crimean War",
                    "What was the main purpose of the Victorian workhouses?\n1. Provide employment\n2. House the poor\n3. Educate children\n4. Manufacture goods",
                    "Which famous detective character was created by Arthur Conan Doyle?\n1. Sherlock Holmes\n2. Hercule Poirot\n3. Miss Marple\n4. Sam Spade",
                    "What was the primary role of women in Victorian society?\n1. Homemakers\n2. Business owners\n3. Politicians\n4. Scientists"
                ] 
            }
        };

        const sprite_src_soldier = path + "/images/soldier.png"; // Customize with your image path
        const sprite_data_soldier = {
            id: 'Guard',
            src: sprite_src_soldier,
            SCALE_FACTOR: 6,
            ANIMATION_RATE: 30,
            pixels: { height: 256, width: 256 },
            INIT_POSITION: { x: (width / 3), y: (height / 3) },
            orientation: { rows: 1, columns: 1 }, // Only one view
            hitbox: { widthPercentage: 0.4, heightPercentage: 0.4 },
            quiz: { 
                title: "Soldier Questions",
                questions: [
                    "What is the capital of the United Kingdom?\n1. London\n2. Edinburgh\n3. Cardiff\n4. Belfast",
                    "Who was the Prime Minister of the UK during most of the Victorian Era?\n1. Benjamin Disraeli\n2. William Gladstone\n3. Robert Peel\n4. Lord Palmerston",
                    "What was the main industry in Victorian Britain?\n1. Textile\n2. Agriculture\n3. Mining\n4. Shipbuilding",
                    "Which famous ship was launched in 1843?\n1. SS Great Britain\n2. RMS Titanic\n3. HMS Victory\n4. HMS Beagle",
                    "What was the main purpose of the Victorian railways?\n1. Transport goods\n2. Transport people\n3. Military use\n4. Postal service"
                ] 
            }
        };

        const sprite_src_chimney_sweeper = path + "/images/chimney_sweeper.png"; // Customize with your image path
        const sprite_data_chimney_sweeper = {
            id: 'Guard',
            src: sprite_src_chimney_sweeper,
            SCALE_FACTOR: 6,
            ANIMATION_RATE: 30,
            pixels: { height: 256, width: 256 },
            INIT_POSITION: { x: (width / 3), y: (height / 3) },
            orientation: { rows: 1, columns: 1 }, // Only one view
            hitbox: { widthPercentage: 0.4, heightPercentage: 0.4 },
            quiz: { 
                title: "Chimney Sweeper Questions",
                questions: [
                    "What is the capital of the United Kingdom?\n1. London\n2. Edinburgh\n3. Cardiff\n4. Belfast",
                    "Who was the Prime Minister of the UK during most of the Victorian Era?\n1. Benjamin Disraeli\n2. William Gladstone\n3. Robert Peel\n4. Lord Palmerston",
                    "What was the main industry in Victorian Britain?\n1. Textile\n2. Agriculture\n3. Mining\n4. Shipbuilding",
                    "Which famous ship was launched in 1843?\n1. SS Great Britain\n2. RMS Titanic\n3. HMS Victory\n4. HMS Beagle",
                    "What was the main purpose of the Victorian railways?\n1. Transport goods\n2. Transport people\n3. Military use\n4. Postal service"
                ] 
            }
        };

        const sprite_src_enemy = path + "/images/dog_enemy.png"; // Customize with your image path
        const sprite_data_enemy = {
            id: 'Enemy',
            src: sprite_src_enemy,
            SCALE_FACTOR: 6,
            ANIMATION_RATE: 30,
            pixels: { height: 256, width: 256 },
            INIT_POSITION: { x: (width / 4), y: (height / 4) },
            orientation: { rows: 1, columns: 2 }, // Only two views: left and right
            left: { row: 0, start: 0, columns: 2 },
            right: { row: 0, start: 0, columns: 2 },
            hitbox: { widthPercentage: 0.4, heightPercentage: 0.4 }
        };

        this.objects = [
            { class: Background, data: image_data_victorian_era },
            { class: Player, data: sprite_data_player },
            { class: Npc, data: sprite_data_guide },
            { class: Guard, data: sprite_data_soldier },
            { class: Guard, data: sprite_data_chimney_sweeper },
            { class: Enemy, data: sprite_data_enemy }
        ];
    }

    /**
     * Initializes the game objects for the level.
     */
    initialize() {
        this.objects.forEach(obj => {
            const instance = new obj.class(obj.data);
            GameEnv.addGameObject(instance);
        });
    }
}

export default GameLevelVictorianEra;