console.log("Token Roll Privacy Init")


class TokenRollPrivacy extends FormApplication {

    static _initButton(app, html, data) {

        let diaBtn = $(`<a class="open-dia" title="Roll Privacy" ><i class ="fas fa-dice-d20"></i> Roll Privacy </a>`)
        diaBtn.click(ev => {
            console.log("BUTTON CLICKED WOO!")
        })

        let titleElement = html.closest('.app').find('.window-title');
        diaBtn.insertAfter(titleElement);
    }
}




    Hooks.on('renderActorSheet', (app, html, data) => {
    TokenRollPrivacy._initButton(app, html, data);
    });

    Hooks.on("preCreateChatMessage", (msg, options, userId) => {
        console.log("CHAT MESSAGE PRECREATED")
    });





