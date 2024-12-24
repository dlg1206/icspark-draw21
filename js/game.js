import {draw_and_update_card} from "../script.js";
import {Deck} from "./deck.js";

/*
'MAX_CARD_LIMIT' is a global variable. Globals are used when we want to use the same value in multiple places in
our code. This way if we want to change it in the future, we just need to change it in one place!
 */
export const MAX_CARD_LIMIT = 21;

export const HIT_BUTTON = document.getElementById('hit-btn');

export const CARD_IMAGE = document.getElementById('current_card');


export function play_game() {
    // Create a new deck to use for this game; "We are opening a new physical deck from a box"
    let deck = new Deck();
    let player_one_score = 0;

    // Update the hit button so a new card is drawn every time
    HIT_BUTTON.removeEventListener("click", draw_and_update_card);
    HIT_BUTTON.addEventListener("click", function () {
        // we can use player_one_score since only player one will be clicking the button
        player_one_score = draw_and_update_card(deck, player_one_score);
    });

}