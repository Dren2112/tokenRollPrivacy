console.log("Token Roll Privacy Init")



class TokenRollPrivacy extends FormApplication {

    static _initButton(app, html, data) {

        let dia = new Dialog({
            title: "Roll Privacy",
            content: "<p>Select the default roll privacy for this actor</p>",
            buttons: {
                none: {
                    label: "Default",
                    callback: () => {console.log("default selected")}
                },
                Private_GM: {
                    label: "Private GM",
                    callback: () => {console.log("Private GM selected")}
                },
                Blind: {
                    label: "Blind GM",
                    callback: () => {console.log("Blind GM selected")}
                },
                self: {
                    label: "Self",
                    callback: () => {console.log("Self selected")}
                },
                default: "none",
                render: html => console.log("Register interactivity in the rendered dialog"),
                close: html => console.log("This always is logged no matter which option is chosen")
            }
        });
        dia.render(true);

        let diaBtn = $(`<a class="open-dia" title="Roll Privacy" ><i class ="fas fa-dice-d20"></i> Roll Privacy </a>`)
        diaBtn.click(ev => {
            Dialog.prompt(dia)
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





