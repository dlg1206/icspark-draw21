/**
 * @file script.js
 * @description Javascript file the houses the turn logic to be completed by you!
 * @author Derek Garcia
 */

import {CARD_IMAGE, play_game} from "./js/game.js"; // We are 'importing' variables from other parts of code; don't need to worry about this for now

// === START #1.1 ===
// TODO #1.1: Add your with your name!
// Remove the '/*' and '*/ once you do
/*
const PLAYER_NAME ? ???;
document.getElementById('???').textContent = ???;
console.log("Let's play " + PLAYER_NAME +"!");
*/
// === END #1.1 ===

/**
 * Draw a card from the provided deck and update the card png and player score
 * This is a 'function' - We'll learn more about functions next week but for now think of it as code we can reuse
 *
 * @param deck Deck to draw a card from
 * @param player_score Score to increment
 * @returns {*} updated player score
 */
export function draw_and_update_card(deck, player_score) {
    let card = deck.draw_card();                                                    // Draw card from the deck
    console.log("../images/deck/" + card.get_file_name() + " is drawn. . .");       // Print the file going to use for png
    CARD_IMAGE.src = "/images/deck/" + card.get_file_name();                        // Update the source image to the drawn card

    let value_str = card.get_value();     // Get the string value of the card

    // === START #2 ===
    // TODO #2: Complete the if-else tree!
    // Remove the '/*' and '*/ once you do
    /*
    if(value_str == "ace"){
        player_score = player_score + 1;
    } else if(value_str == "two"){
        player_score = player_score + 2;
    } ...
     */
    // === END #2 ===

    // === START #3 ===
    // TODO #3: Did the player lose?
    // REMEMBER: The player's score is stored in the 'player_score' variable
    // Remove the '/*' and '*/ to once you do
    /*
    __(player_score ? 21){
        alert("You went over 21!");
    }
     */
    // === END #3 ===

    return player_score;
}


play_game();    // this is our entrypoint to play a game