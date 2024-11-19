/*
'MAX_CARD_LIMIT' is a global variable. Globals are used when we want to use the same value in multiple places in
our code. This way if we want to change it in the future, we just need to change it in one place!
 */
const MAX_CARD_LIMIT = 21;

function draw_card() {
    let card_number = Math.floor(Math.random() * 12)    // draw a card from 0 (Ace) to 12 (King)

    /*
    A switch statement is a more streamlined if statement
    We check each case to see if the `card_number` matches

    if(card_number == 0){
        return "ace";
    }

    is the same as

    switch (card_number){
        case 0:
            return "ace";
    }

    Here we're using it to convert 0, 11, 12, and 13 to their face equivalents
     */
    switch (card_number) {
        // if (card_number == 0)
        case 0:
            return "ace";
        // if (card_number == 10)
        case 10:
            return "jack";
        // if (card_number == 11)
        case 11:
            return "queen";
        // if (card_number == 12)
        case 12:
            return "king";
        /*
        A 'default' case is the case we use if `card_number` doesn't match any of the previous cases
        Here, if the number is a normal card, we just return the number
         */
        default:
            return card_number + 1;     // we add 1 because we started at 0, not 1
    }

}

function main() {
    // start button
    let total = 0;
    let card_image = document.getElementById('current_card');
    const card_button = document.getElementById('hit-btn')

    card_button.addEventListener("click", function () {
        let card = draw_card();
        console.log("../images/cards/hearts_" + card + ".png")
        card_image.src = "/images/cards/hearts_" + card + ".png";
    });

    // while(total < MAX_CARD_LIMIT){
    //     // 1. Update html
    //     let card = draw_card();
    //     card_image.src = "../assets/cards/hearts_" + card + ".png";
    //
    //     // 2. get user input to hit or stay
    //     // 3. check if win or loose
    // }
}

main()