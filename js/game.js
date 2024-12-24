import {draw_and_update_card} from "../script.js";
import {Deck} from "./deck.js";
import {AI_ENABLED, Opponent} from "./opponent.js";

/*
'MAX_CARD_LIMIT' is a global variable. Globals are used when we want to use the same value in multiple places in
our code. This way if we want to change it in the future, we just need to change it in one place!
 */
export const MAX_CARD_LIMIT = 21;

const HIT_BUTTON = document.getElementById('hit-btn');
const STAY_BUTTON = document.getElementById('stay-btn');

export const CARD_IMAGE = document.getElementById('current_card');


export function play_game() {

    let player_score = 0;
    let deck = new Deck();
    let opponent = AI_ENABLED ? new Opponent() : null;

    // Event listener for the HIT button
    HIT_BUTTON.addEventListener("click", function () {
        player_score = draw_and_update_card(deck, player_score);
        console.log("Player's score is " + player_score);
        document.getElementById('p1_current_score').innerText = player_score;

        if (player_score > MAX_CARD_LIMIT) {
            handle_player_bust(deck, player_score, opponent); // Handle bust logic
        } else if (opponent != null && !opponent.is_staying()) {
            opponent.play_turn(deck, player_score).then();
        }
    });

    // Event listener for the STAY button
    STAY_BUTTON.addEventListener("click", function () {
        handle_player_stay(deck, player_score, opponent); // Handle the stay logic
    });
}

// A helper function to handle the logic after Player One's turn
function handle_player_bust(deck, player_score, opponent) {
    console.warn("Player went bust!");
    if (opponent == null) {
        end_game("You lost! You went over by " + (player_score - MAX_CARD_LIMIT) + "!");
    } else {
        opponent.play_until_done(deck, player_score).then(() => {
            determine_winner(player_score, opponent.get_score());
        });

    }
}

// A function to handle the "stay" logic for both buttons
function handle_player_stay(deck, player_score, opponent) {
    console.warn("Player is staying!");
    if (opponent == null) {
        end_game("You win with a score of " + player_score + "!");
    } else {
        opponent.play_until_done(deck, player_score).then(() => {
            determine_winner(player_score, opponent.get_score());
        });
    }

}

function determine_winner(player_score, ai_score) {
    const player_lost = player_score > MAX_CARD_LIMIT;
    const ai_lost = ai_score > MAX_CARD_LIMIT;

    if (player_lost && ai_lost) {
        end_game("You both lost!");
    } else if (!player_lost && ai_lost) {
        end_game("You win with a score of " + player_score + "!");
    } else if (player_lost && !ai_lost) {
        end_game("You lost! " + " Opponent wins with a score of " + ai_score + "!");
    } else if (!player_lost && !ai_lost) {
        if (player_score > ai_score) {
            end_game("You win with a score of " + player_score + "!");
        } else if (player_score < ai_score) {
            end_game("You lost! " + " Opponent wins with a score of " + ai_score + "!");
        } else {
            end_game("It's a tie! Both you and opponent had a score of " + player_score + "!");
        }
    }
}

function end_game(msg) {
    alert(msg)
    HIT_BUTTON.disabled = true;
    STAY_BUTTON.disabled = true;
    alert("Refresh the page to play again!")
}