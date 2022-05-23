console.log("Token Roll Privacy Init")


class TokenRollPrivacy extends FormApplication {

    static _initButton(app, html, data) {

        let diaBtn = $(`<a class="open-dia" title="Roll Privacy" > Roll Privacy </a>`)
        diaBtn.onclick = console.log("Button Clicked Woo!")

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





