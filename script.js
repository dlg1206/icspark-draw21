import {CARD_IMAGE, play_game} from "./js/game.js";

// === START #1.1 ===
// TODO #1.1: Add your with your name!
// Remove the '/*' and '*/ once you do
/*
const PLAYER_NAME ? ???;
document.getElementById('???').textContent = ???;   // todo: add hint in readme
console.log("Let's play " + PLAYER_NAME +"!");
*/

// === END #1.1 ===

export function draw_and_update_card(deck, player_score) {
    let card = deck.draw_card();    // Draw card from the deck
    console.log("../images/deck/" + card.get_file_name() + " is drawn. . .");      // Print the file going to use for png
    CARD_IMAGE.src = "/images/deck/" + card.get_file_name();    // Update the source image to the drawn card

    let value_str = card.value;     // Get the string value of the card

    // === START #2.1 ===
    // TODO #2.1: Complete the if-else tree!
    // Remove the '/*' and '*/ once you do
    /*
    if(value_str == "ace"){
        player_score = player_score + 1;
    } else if(value_str == "two"){
        player_score = player_score + 2;
    } ...
     */
    // === END #2.1 ===

    // === START #3 ===
    // TODO #3: Did the player lose?
    // REMEMBER: The player's score is stored in the 'player_score' variable
    // Remove the '/*' and '*/ to once you do
    /*
    YOUR CODE HERE
     */
    // === END #3 ===

    return player_score;
}


play_game();

