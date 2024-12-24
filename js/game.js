/**
 * @file game.js
 * @description Logic for running draw21 game and turn switching between player and 'ai'
 * @author Derek Garcia
 */
// We are 'importing' variables from other parts of code; don't need to worry about this for now
import {draw_and_update_card} from "../script.js";
import {Deck} from "./deck.js";
import {AI_ENABLED, Opponent} from "./opponent.js";

/*
'MAX_CARD_LIMIT' is a global variable. Globals are used when we want to use the same value in multiple places in
our code. This way if we want to change it in the future, we just need to change it in one place! The 'export' keyword
allows for us to 'import' the variable in different files
 */
export const MAX_CARD_LIMIT = 21;
export const HIT_BUTTON = document.getElementById('hit-btn');       // Global variable linking to the 'Draw' button
export const STAY_BUTTON = document.getElementById('stay-btn');     // Global variable linking to the 'Stay' button
export const CARD_IMAGE = document.getElementById('current_card');  // Global variable linking to the card image


/**
 *
 * Play one game of draw21
 *
 */
export function play_game() {
    // Variable setup - setup all the variables we'll need for the game
    let player_score = 0;   // Set the starting player score to 0
    let deck = new Deck();    // Create a 'new' deck; basically opening a new deck of cards to play with
    /*
    This is a 'ternary' statement; basically a condensed if-else statement that looks like
    if( AI_ENABLED == true ){
        let opponent = new Opponent();
    } else {
        let opponent = null;
    }
    We use ternary statements when if-else is too much for a simple task, like assigning a variable.
    In this case, if the AI is enabled, we create a new opponent otherwise we set the value to 'null': a special value
    that means "there's nothing here"
     */
    let opponent = AI_ENABLED ? new Opponent() : null;
    console.log("It's Player's turn!");     // print to console that it's the user's turn
    /*
     Create an event listener to the hit / draw button using the global variable we set earlier.
     We are creating a function that 'listens' to hear if the hit button has been 'clicked' and when it does, it'll
     run all the code inside the brackets ('{' and '}')
     */
    HIT_BUTTON.addEventListener("click", function () {
        player_score = draw_and_update_card(deck, player_score);    // Call a function you wrote! This draws a card and updates the player score we set in line 29
        console.log("Player's score is " + player_score);           // Print the player's score to the console
        document.getElementById('p1_current_score').innerText = player_score;   // Get the 'p1_current_score' span from the html and updated with the new player score

        /*
        This is a little complicated, but still follows the same if-else-if logic
        if (player score is over 21){
            handle player loosing
        } else if (the ai is present and not done playing){
            ai plays its turn
        }
         */
        if (player_score > MAX_CARD_LIMIT) {
            handle_player_bust(deck, player_score, opponent);   // Handle bust logic - ie let the ai finish playing
        } else if (opponent != null && !opponent.is_staying()) {
            // Don't worry about the .then() part. There's a reason for it but for now think: "ai plays its turn, THEN print a message when its turn is done"
            opponent.play_turn(deck, player_score, false).then(() => console.log("It's Player's turn!"));
        }
    });

    /*
     Create an event listener to stay button using the global variable we set earlier.
     We are creating a function that 'listens' to hear if the hit button has been 'clicked' and when it does, it'll
     run all the code inside the brackets ('{' and '}')
     */
    STAY_BUTTON.addEventListener("click", function () {
        handle_player_stay(deck, player_score, opponent);       // Handle the stay logic - ie let the ai finish playing
    });
}

/**
 * A helper function to let the AI finish playing when the player busts / goes offer 21
 * We use 'helper functions' to reuse code and keep code readable
 *
 * @param deck Deck to draw cards from
 * @param player_score Player score
 * @param opponent Opponent object that needs to finish playing
 */
function handle_player_bust(deck, player_score, opponent) {
    console.warn("Player went bust!");      // Print that the player lost
    /*
    if (there is no AI){
        Game over!
    } else {
        Let the AI finish playing, then determine who won
    }
     */
    if (opponent == null) {
        end_game("You lost! You went over by " + (player_score - MAX_CARD_LIMIT) + "!");    // Print loss message
    } else {
        // Like before, think of this as "When the ai finishes playing, THEN determine who won"
        opponent.play_until_done(deck, player_score, true).then(() => {
            determine_winner(player_score, opponent.get_score());
        });
    }
}

/**
 * A helper function to let the AI finish playing when the player stays / doesn't draw more cards
 * We use 'helper functions' to reuse code and keep code readable
 *
 * @param deck Deck to draw cards from
 * @param player_score Player score
 * @param opponent Opponent object that needs to finish playing
 */
function handle_player_stay(deck, player_score, opponent) {
    console.warn("Player is staying!");     // Print that the player is staying
    /*
    if (there is no AI){
        Game over!
    } else {
        Let the AI finish playing, then determine who won
    }
     */
    if (opponent == null) {
        end_game("You win with a score of " + player_score + "!");      // Print win message
    } else {
        // Like before, think of this as "When the ai finishes playing, THEN determine who won"
        opponent.play_until_done(deck, player_score, true).then(() => {
            determine_winner(player_score, opponent.get_score());
        });
    }

}

/**
 * When playing against an AI, determine whether the player or AI won the game
 *
 * @param player_score Player score
 * @param ai_score AI score
 */
function determine_winner(player_score, ai_score) {
    /*
    We're going to use player and ai score a lot just for the boolean (true or false), so we save the results
    to a temporary variable, so we don't have to re-calculate the variable everytime
     */
    const player_lost = player_score > MAX_CARD_LIMIT;  // Player lost if score greater than 21
    const ai_lost = ai_score > MAX_CARD_LIMIT;          // AI lost if score greate than 21

    // If both the player and ai lost, then nobody wins
    if (player_lost && ai_lost) {
        end_game("You both lost!");
        // If the player didn't lose (player won) and the ai lost, then the player wins
    } else if (!player_lost && ai_lost) {
        end_game("You win with a score of " + player_score + "!");
        // If the player lost and the ai didn't lose (ai won), then the player looses
    } else if (player_lost && !ai_lost) {
        end_game("You lost! " + " Opponent wins with a score of " + ai_score + "!");
        // If both the player and ai didn't lose (ie both < 21), then we need to check who was closed to 21
    } else if (!player_lost && !ai_lost) {
        // if the player score > ai score, that means the player score was closer to 21
        if (player_score > ai_score) {
            end_game("You win with a score of " + player_score + "!");
            // if the player score < ai score, that means the ai score was closer to 21
        } else if (player_score < ai_score) {
            end_game("You lost! " + " Opponent wins with a score of " + ai_score + "!");
            // else the player and ai scores are the same, so it's a tie!
        } else {
            end_game("It's a tie! Both you and opponent had a score of " + player_score + "!");
        }
    }
}

/**
 * Helper function that disables the playing buttons and reports the game is over
 *
 * @param msg Message to print to user once game is over
 */
function end_game(msg) {
    alert(msg);     // Create an alert popup with the provided message
    HIT_BUTTON.disabled = true;     // Disable hit / draw button
    STAY_BUTTON.disabled = true;    // Disable stay button
    alert("Refresh the page to play again!");   // Create an alert popup telling the user to refresh the page to play again
}