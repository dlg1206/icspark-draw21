/**
 * @file deck.js
 * @description Logic for a deck of playing cards
 * @author Derek Garcia
 */

/*
'Card' is a class. A class is used when we have a thing that has certain values and can do certain actions. In this
case, the Card class is the 'blueprint' of a card. We know a card has a suite and a value BUT we don't have the actual
deck yet. When we call 'new Card("hearts", "Q")', that creates an 'instance' or actual card, in this case a queen of hearts
 */
class Card {
    /*
    Create 'private variables' that can only be accessed from inside our class. We use private variables wherever
    possible since we want people to know as little as possible about our variables whenever possible
     */
    #suite_name
    #value

    /**
     * Create new card
     *
     * @param suite_name Name of suite
     * @param value value of card
     */
    constructor(suite_name, value) {
        this.#suite_name = suite_name;
        this.#value = value;
    }

    /**
     * Get the name of the file
     *
     * @returns {string} name of card png
     */
    get_file_name() {
        return this.#suite_name + "_" + this.#value + ".png"
    }

    /**
     * Get the value of this card
     *
     * @returns {*} Value of card
     */
    get_value() {
        // === START Challenge 1 ===
        /*
         TODO - Can you move the 'if' statements from TODO 2.1 here so the number value is always returned?
         */
        return this.#value
        // === END Challenge 1 ===
    }
}

/*
'Deck' is a class. A class is used when we have a thing that has certain values and can do certain actions. In this
case, the Deck class is the 'blueprint' of a card deck. We know a deck has 52 cards, with 13 cards per suite, and we can
draw a card from the deck BUT we don't have the actual deck yet
 */
export class Deck {
    /*
    Create 'private variables' that can only be accessed from inside our class. Think about looking through a deck with
    all the backs of the cards facing you. You know that the deck has cards, but not what suites or faces are in the deck.
    We use private variables wherever possible since we want people to know as little as possible about our variables whenever
    possible
     */
    #clubs;
    #diamonds;
    #hearts;
    #spades;
    #suites;

    /**
     * When I make a new deck, make sure each suite has all the cards
     */
    constructor() {
        this.#clubs = ["ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king"];
        this.#diamonds = ["ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king"];
        this.#hearts = ["ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king"];
        this.#spades = ["ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king"];
        this.#suites = ["clubs", "diamonds", "hearts", "spades"]
    }

    /**
     * Draw a card from this deck
     *
     * @returns {*|Card} Card
     */
    draw_card() {
        /*
        Math.floor(Math.random() * this.suites.length): pick a random number between 0 and the length of the suites - 1 (4)
        Once we have our random number (0, 1, 2, 3), then we access the list of suites:

        this.suites[0] = "clubs"    // remember we start counting at 0!
        this.suites[1] = "diamonds"
        this.suites[2] = "hearts"
        this.suites[3] = "spades"

        This gets us a random suite
         */
        const suite_name = this.#suites[Math.floor(Math.random() * this.#suites.length)];

        /*
        A switch statement is a more streamlined if statement
        We check each case to see if the `card_number` matches

        if(suite == "clubs"){
            console.log("You picked clubs!");
        }

        is the same as

        switch (suite){
            case "clubs":
                console.log("You picked clubs!");
                break;
        }

        Here we're using it to make the name of the suite to the actual list of cards
         */
        let suite;
        switch (suite_name) {
            // if (suite == "clubs")
            case "clubs":
                suite = this.#clubs;
                break;
            // if (suite == "diamonds")
            case "diamonds":
                suite = this.#diamonds;
                break;
            // if (suite == "hearts")
            case "hearts":
                suite = this.#hearts;
                break;
            // if (suite == "spades")
            case "spades":
                suite = this.#spades;
                break;
        }

        const value = this.#remove_card(suite);     // attempt to remove a card from the suite
        // If there are no cards left to draw from that suite, draw another card
        if (value === null) {
            // === Start Challenge 2 ===
            /*
            TODO - What happens if the deck is completely empty?
             (Hint: Will draw forever until get a card, so if there's no cards left. . .)
             Can you add a check / handle that case?
             */
            return this.draw_card()
            // === End Challenge 2 ==
        }
        // return a new card with the suite name and value of the card
        // This represents a real card
        return new Card(suite_name, value)
    }

    /**
     * Remove a card from a provided suite
     *
     * We use a 'function' to follow DRY (Don't Repeat Yourself). Instead of putting the content this in each
     * switch statement, we can write it once a call it when we need it
     *
     * @param suite Suite to draw the card from
     * @returns {*|null} Card value, null if no cards left to draw
     */
    #remove_card(suite) {
        // if there are no cards left to draw, return null / indicate that there are no cards left to draw
        if (suite.length === 0)
            return null

        const card_index = Math.floor(Math.random() * suite.length);    // pick a random card
        return suite.splice(card_index, 1)[0];      // Remove the card from the deck and return the card drawn
    }

}