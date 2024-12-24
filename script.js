import {CARD_IMAGE, play_game} from "./js/game.js";

// TODO #1: Add your with your name!
// Remove the '/*' and '*/ once you do
/*
const PLAYER_NAME = ???;
document.getElementById('???').textContent = ???;   // todo: add hint in readme
console.log("Let's play " + PLAYER_NAME +"!");
*/

export function draw_and_update_card(deck, player_score) {
    let card = deck.draw_card();    // Draw card from the deck
    console.log("../images/deck/" + card.get_file_name());      // Print the file going to use for png
    CARD_IMAGE.src = "/images/deck/" + card.get_file_name();    // Update the source image to the drawn card

    let value_str = card.value;     // Get the string value of the card
    // TODO #3.1: Update the score!
    // Remove the '/*' and '*/ once you do
    /*
    if(value_str === "ace"){
        PLAYER_ONE_SCORE += 1;
    } else if(value_str === "two"){
        PLAYER_ONE_SCORE += 2;
    } ...
     */
    console.log("Player One's score is " + player_score);
    // TODO #3.2: Update the score!
    // Remove the '/*' and '*/ once you do
    /*
    document.???('???').innerText = ???;    // todo: add hint in readme
     */

    // TODO #4: Did the player lose?
    // REMEMBER: The player's score is stored in the 'PLAYER_ONE_SCORE' variable
    // Remove the '/*' and '*/ to once you do
    /*
    YOUR CODE HERE
     */

    return player_score;
}

play_game();
