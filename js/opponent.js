import {draw_and_update_card} from "../script.js";
import {MAX_CARD_LIMIT} from "./game.js";

// === START #1.1 ===
// TODO Bonus #1.1: Add your with your name!
// Remove the '/*' and '*/ once you do
export const AI_ENABLED = false;
const OPPONENT_NAME = "Calvin";
/*
document.getElementById('???').textContent = ???;   // todo: add hint in readme
*/
// === END #1.1 ===


export class Opponent {
    #name;
    #score = 0;
    #is_staying = false;

    constructor() {
        this.#name = OPPONENT_NAME;
        console.log(this.#name + " is your opponent!");
    }

    async play_turn(deck, player_one_score) {


        // TODO - develop your own AI!
        if (this.#score > 0) {
            this.#stay();
        }

        if (this.#is_staying)
            return;
        await this.#sleep();
        this.#score = draw_and_update_card(deck, this.#score);
        console.log(this.#name + "'s score is " + this.#score);
        // === START #2.2 ===
        // TODO #2.2: Update the score!
        // Remove the '/*' and '*/ once you do
        /*
        document.???('???').innerText = ???;    // todo: add hint in readme
         */
        // === END #2.2 ===

        document.getElementById('p2_current_score').innerText = this.#score;
    }

    async play_until_done(deck, player_one_score) {
        while (!this.#is_staying && this.#score <= MAX_CARD_LIMIT) {
            await this.play_turn(deck, player_one_score);
        }
        if (this.#score > MAX_CARD_LIMIT)
            console.warn(this.#score + " went bust!");
        if (this.#is_staying)
            console.warn(this.#name + " is staying!");

    }

    get_score() {
        return this.#score;
    }

    is_staying() {
        return this.#is_staying;
    }

    #stay() {
        console.warn(this.#name + " is staying!");
        this.#is_staying = true;
    }

    #sleep() {
        return new Promise(resolve => setTimeout(resolve, 500));
    }

}