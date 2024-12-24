/**
 * @file opponent.js
 * @description Logic for an "AI" opponent
 * @author Derek Garcia
 */
// We are 'importing' variables from other parts of code; don't need to worry about this for now
import {draw_and_update_card} from "../script.js";
import {HIT_BUTTON, MAX_CARD_LIMIT, STAY_BUTTON} from "./game.js";

// === START #4.1 ===
// TODO #4.1: Add your opponent's name!
// Remove the '/*' and '*/ once you do
export const AI_ENABLED = false;    // Change from 'false' to 'true'
const OPPONENT_NAME = "Calvin";       // Replace with your opponent's name!
/*
document.getElementById('???').textContent = ???;
*/
// === END #4.1 ===

/*
'Opponent' is a class. A class is used when we have a thing that has certain values and can do certain actions. In this
case, the Opponent class is the 'blueprint' of an opponent.
 */
export class Opponent {
    /*
    Create 'private variables' that can only be accessed from inside our class. We use private variables wherever
    possible since we want people to know as little as possible about our variables whenever possible
     */
    #name;
    #score = 0;             // AI score starts at 0
    #is_staying = false;    // AI is not staying by default

    /**
     * Called when we create a new Opponent
     */
    constructor() {
        this.#name = OPPONENT_NAME;     // Set the opponent's name using the name you set in Bonus #1.1!
        console.log(this.#name + " is your opponent!");     // Print the opponent's name
    }

    /**
     * Play a turn as the opponent.
     *
     * @param deck Deck to draw a card from
     * @param player_one_score Player one's (you!) score
     * @param is_player_one_staying Boolean, is player one staying (not drawing cards) or not?
     */
    async play_turn(deck, player_one_score, is_player_one_staying) {
        console.log("It's " + this.#name + "'s turn!");     // Print that it's the AI's turn
        HIT_BUTTON.disabled = true;     // Disable hit button until AI's turn is over
        STAY_BUTTON.disabled = true;    // Disable stay button until AI's turn is over

        // === START #5 ===
        // TODO #5: Develop your own AI!
        // Remove the '/*' and '*/ once you do
        /*
        YOUR CODE HERE
         */
        // === END #5 ===

        // If decided to stay, enable buttons and return
        if (this.#is_staying) {
            HIT_BUTTON.disabled = false;
            STAY_BUTTON.disabled = false;
            return;
        }
        // Else draw card
        await this.#sleep();    // Add some delay for AI to mimic a turn
        this.#score = draw_and_update_card(deck, this.#score);      // Draw and update the AI's score
        console.log(this.#name + "'s score is " + this.#score);     // Print the AI's new score

        // === START #6 ===
        // TODO #6: Update the score!
        // Remove the '/*' and '*/ once you do
        /*
        document.???('???').innerText = ???;
         */
        // === END #6 ===

        // Re-enable buttons for player
        HIT_BUTTON.disabled = false;
        STAY_BUTTON.disabled = false;
    }

    /**
     * Repeat the AI's turn until it either goes bust or decides to stay
     *
     * @param deck Deck to draw a card from
     * @param player_one_score Player one's (you!) score
     * @param is_player_one_staying Boolean, is player one staying (not drawing cards) or not?
     */
    async play_until_done(deck, player_one_score, is_player_one_staying) {
        /*
        We won't cover loops, but in short a loop will repeat everything inside until it's told to stop. Here it means:
        Repeat until (the ai is not staying AND the score is less than or equal to 21){
            ai plays its turn
        }
        So unless the ai decides to stop or the ai score is > 21, it'll keep playing forever!
         */
        while (!this.#is_staying && this.#score <= MAX_CARD_LIMIT) {
            await this.play_turn(deck, player_one_score, is_player_one_staying);    // Don't worry about 'await' :)
        }
        // If the loop ended because the AI lost, print that
        if (this.#score > MAX_CARD_LIMIT)
            console.warn(this.#name + " went bust!");  // Print that the AI lost
    }

    /**
     * Get AI score
     * This is known as a 'getter' function. We use getters to access our secret variables instead of accessing them directly
     *
     * @returns {number} The current AI's score
     */
    get_score() {
        return this.#score;
    }


    /**
     * Get if the AI is staying or not
     * This is known as a 'getter' function. We use getters to access our secret variables instead of accessing them directly
     *
     * @returns {boolean} Whether the AI is staying (True) or not (False)
     */
    is_staying() {
        return this.#is_staying;
    }

    /**
     * Mark that the AI is staying / done playing
     */
    #stay() {
        console.warn(this.#name + " is staying!");
        this.#is_staying = true;
    }

    /**
     * Sleep / wait for 5 seconds to mimic AI playing a turn
     */
    #sleep() {
        return new Promise(resolve => setTimeout(resolve, 500)).then();
    }

}