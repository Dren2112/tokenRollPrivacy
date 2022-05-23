console.log("Token Roll Privacy Init")






class TokenRollPrivacy extends FormApplication {

    static remove(ID, Array){
        let Index = Array.indexOf(ID)


        if(Index > -1){
            Array.splice(pIndex, 1)
        }

        return Array;
    }

    static _initButton(app, html, data) {
        let Private = [];
        let Blind = [];
        let Self = [];

        let ID = app.appId;
        let diaBtn = $(`<a class="open-dia" title="Roll Privacy" ><i class ="fas fa-dice-d20"></i> Roll Privacy </a>`)
        diaBtn.click(ev => {
            dia.render(true);
        })

        let titleElement = html.closest('.app').find('.window-title');
        diaBtn.insertAfter(titleElement);

        const dia = new Dialog({
            title: "Roll Privacy",
            content: 'Select the default roll privacy for this actor',
            buttons: {
                none: {
                    label: "Default",
                    callback: () => {
                        Private =this.remove(ID, Private)
                        Blind =this.remove(ID, Blind)
                        Self =this.remove(ID, Self)
                    }
                },
                Private_GM: {
                    label: "Private GM",
                    callback: () => {
                        Private =this.remove(ID, Private)
                        Blind =this.remove(ID, Blind)
                        Self =this.remove(ID, Self)

                        Private.push(ID);
                        console.log(Private[0])
                    }
                },
                Blind: {
                    label: "Blind GM",
                    callback: () => {
                        Private =this.remove(ID, Private)
                        Blind =this.remove(ID, Blind)
                        Self =this.remove(ID, Self)

                        Blind.push(ID);
                    }
                },
                self: {
                    label: "Self",
                    callback: () => {
                        Self.push(ID);
                    }
                }
            },
            default: "none",

        });
    }

}

    Hooks.on('renderActorSheet', (app, html, data) => {
    TokenRollPrivacy._initButton(app, html, data);
    });

    Hooks.on("preCreateChatMessage", (msg, options, userId) => {
        console.log("CHAT MESSAGE PRECREATED")
    });





