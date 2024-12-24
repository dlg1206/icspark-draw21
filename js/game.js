import {draw_and_update_card} from "../script.js";
import {Deck} from "./deck.js";

/*
'MAX_CARD_LIMIT' is a global variable. Globals are used when we want to use the same value in multiple places in
our code. This way if we want to change it in the future, we just need to change it in one place!
 */
const MAX_CARD_LIMIT = 21;

let PLAYER_ONE_SCORE = 0;

export const HIT_BUTTON = document.getElementById('hit-btn');
export const STAY_BUTTON = document.getElementById('stay-btn');
STAY_BUTTON.addEventListener("click", function () {
    if (PLAYER_ONE_SCORE > MAX_CARD_LIMIT) {
        alert("You lost! You went over by" + PLAYER_ONE_SCORE - MAX_CARD_LIMIT + "!");
    } else {
        alert("You win with a score of " + PLAYER_ONE_SCORE + "!");
    }
    end_game();
})

export const CARD_IMAGE = document.getElementById('current_card');


export function play_game() {
    // Create a new deck to use for this game; "We are opening a new physical deck from a box"
    let deck = new Deck();
    PLAYER_ONE_SCORE = 0;
    // Reset the card back
    CARD_IMAGE.src = "../images/deck/card_back.png";
    // Update the hit button so a new card is drawn every time
    HIT_BUTTON.removeEventListener("click", draw_and_update_card);
    HIT_BUTTON.addEventListener("click", function () {
        // we can use player_one_score since only player one will be clicking the button
        PLAYER_ONE_SCORE = draw_and_update_card(deck, PLAYER_ONE_SCORE);

        if (PLAYER_ONE_SCORE > MAX_CARD_LIMIT)
            end_game();

    });
}

export function end_game() {
    HIT_BUTTON.disabled = true;
    STAY_BUTTON.disabled = true;
    alert("Refresh the page to play again!")
}