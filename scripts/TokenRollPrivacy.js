console.log("Token Roll Privacy Init - 0.07")
Hooks.on("ready", function(){
    test.Test();
});

class TokenRollPrivacy extends FormApplication {

    static _initButton(app, html, data) {

        let diaBtn = $(`<a class="open-dia" title="Roll Privacy" > Roll Privacy </a>`)
        diaBtn.onclick = console.log("Button Clicked Woo!")

        let titleElement = html.closest('.app').find('.window-title');
        diaBtn.insertAfter(titleElement);
    }
}

class test extends Actor{
    static Test(){
        console.log(JDON.stringify(this.getRollData()))
}
}

    Hooks.on('renderActorSheet', (app, html, data) => {
    TokenRollPrivacy._initButton(app, html, data);
    });




