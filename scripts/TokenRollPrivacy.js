class TokenRollPrivacy extends FormApplication {

    static _initButton(app, html, data) {
        console.log("Token Roll Privacy Init")
        let diaBtn = $(`<a class="open-dia" title="Roll Privacy" > "Roll Privacy" </a>`)
        diaBtn.onclick = console.log("Button Clicked Woo!")
    }
}

    Hooks.on('renderActorSheet', (app, html, data) => {
    TokenRollPrivacy._initButton(app, html, data);
    });




