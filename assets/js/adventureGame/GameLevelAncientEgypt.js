import GameEnv from './GameEnv.js';
import Background from './Background.js';
import Player from './Player.js';
import Npc from './Npc.js';
import Guard from './Guard.js';
import Enemy from './Enemy.js';

/**
 * GameLevelAncientEgypt class manages the Ancient Egypt level.
 * 
 * This class initializes the game objects for the Ancient Egypt level, including the background,
 * player, NPCs, guards, and enemies. It also sets up the sprite data for each object.
 * 
 * @class GameLevelAncientEgypt
 */
class GameLevelAncientEgypt {
    /**
     * Constructor for the GameLevelAncientEgypt class.
     * 
     * @param {string} path - The base path for the game assets.
     */
    constructor(path) {
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        let width = window.innerWidth;
        let height = window.innerHeight;

        const image_src_ancient_egypt = path + "/images/gamify2/ancientegyptbackground.png";
        const image_data_ancient_egypt = { 
            id: 'ancient_egypt',
            greeting: "Welcome to Ancient Egypt! Explore the pyramids and learn about the history!",
            src: image_src_ancient_egypt,
            pixels: { height: 580, width: 1038 }
        };

        const sprite_src_player = path + "/images/gamify2/player.png";
        const sprite_data_player = {
            id: 'Player',
            greeting: "Hi, I am the adventurer exploring Ancient Egypt!",
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

        const sprite_src_guide = path + "/images/gamify2/ratguide.png";
        const sprite_data_guide = {
            id: 'Guide',
            greeting: "Hi, I am your guide! I will teach you about Ancient Egypt.",
            src: sprite_src_guide,
            SCALE_FACTOR: 8,
            ANIMATION_RATE: 50,
            pixels: { height: 256, width: 352 },
            INIT_POSITION: { x: (width / 2), y: (height / 2) },
            orientation: { rows: 8, columns: 11 },
            down: { row: 5, start: 0, columns: 3 },
            hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
            quiz: { 
                title: "Ancient Egypt Trivia",
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
            }
        };


        const sprite_src_tomb_guard = path + "/images/gamify2/tombguard.png";
        const sprite_data_tomb_guard = {
            id: 'Tomb Guard',
            guardType: 'tomb',
            src: sprite_src_tomb_guard,
            SCALE_FACTOR: 6,
            ANIMATION_RATE: 30,
            pixels: { height: 256, width: 256 },
            INIT_POSITION: { x: (width / 3), y: (height / 3) },
            orientation: { rows: 1, columns: 1 }, // Only one view
            hitbox: { widthPercentage: 0.4, heightPercentage: 0.4 },
            quiz: { 
                title: "Tomb Guard Questions",
                questions: [
                    "What is the capital of Egypt?\n1. Cairo\n2. Alexandria\n3. Luxor\n4. Aswan",
                    "Who was the longest-reigning pharaoh?\n1. Ramses II\n2. Thutmose III\n3. Hatshepsut\n4. Akhenaten",
                    "What was the primary purpose of the pyramids?\n1. Tombs for pharaohs\n2. Temples\n3. Palaces\n4. Fortresses",
                    "Which god was considered the king of the gods?\n1. Ra\n2. Osiris\n3. Anubis\n4. Horus",
                    "What was the main writing material used by ancient Egyptians?\n1. Papyrus\n2. Parchment\n3. Clay\n4. Stone"
                ] 
            }
        };

        const sprite_src_pyramid_guard = path + "/images/gamify2/pyramidguard.png";
        const sprite_data_pyramid_guard = {
            id: 'Pyramid Guard',
            guardType: 'pyramid',
            src: sprite_src_pyramid_guard,
            SCALE_FACTOR: 6,
            ANIMATION_RATE: 30,
            pixels: { height: 256, width: 256 },
            INIT_POSITION: { x: (width / 2), y: (height / 2) },
            orientation: { rows: 1, columns: 1 }, // Only one view
            hitbox: { widthPercentage: 0.4, heightPercentage: 0.4 },
            quiz: { 
                title: "Pyramid Guard Questions",
                questions: [
                    "What is the capital of Egypt?\n1. Cairo\n2. Alexandria\n3. Luxor\n4. Aswan",
                    "Who was the longest-reigning pharaoh?\n1. Ramses II\n2. Thutmose III\n3. Hatshepsut\n4. Akhenaten",
                    "What was the primary purpose of the pyramids?\n1. Tombs for pharaohs\n2. Temples\n3. Palaces\n4. Fortresses",
                    "Which god was considered the king of the gods?\n1. Ra\n2. Osiris\n3. Anubis\n4. Horus",
                    "What was the main writing material used by ancient Egyptians?\n1. Papyrus\n2. Parchment\n3. Clay\n4. Stone"
                ] 
            }
        };

        const sprite_src_enemy = path + "/images/gamify2/catenemy.png";
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
            { class: Background, data: image_data_ancient_egypt },
            { class: Player, data: sprite_data_player },
            { class: Npc, data: sprite_data_guide },
            { class: Guard, data: sprite_data_tomb_guard },
            { class: Guard, data: sprite_data_pyramid_guard},
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
 
export default GameLevelAncientEgypt;