console.log("Token Roll Privacy Init")






class TokenRollPrivacy extends FormApplication {

    Private = [];
    Blind = [];
    Self = [];

    static remove(ID, Array){
        let Index = Array.indexOf(ID)


        if(Index > -1){
            Array.splice(pIndex, 1)
        }

        return Array;
    }

    static _initButton(app, html, data) {


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
                        TokenRollPrivacy.Private =this.remove(ID, Private)
                        TokenRollPrivacy.Blind =this.remove(ID, Blind)
                        TokenRollPrivacy.Self =this.remove(ID, Self)
                    }
                },
                Private_GM: {
                    label: "Private GM",
                    callback: () => {
                        TokenRollPrivacy.Private =this.remove(ID, Private)
                        TokenRollPrivacy.Blind =this.remove(ID, Blind)
                        TokenRollPrivacy.Self =this.remove(ID, Self)

                        TokenRollPrivacy.Private.push(ID);
                        console.log(Private[0])
                    }
                },
                Blind: {
                    label: "Blind GM",
                    callback: () => {
                        TokenRollPrivacy.Private =this.remove(ID, Private)
                        TokenRollPrivacy.Blind =this.remove(ID, Blind)
                        TokenRollPrivacy.Self =this.remove(ID, Self)

                        TokenRollPrivacy.Blind.push(ID);
                    }
                },
                self: {
                    label: "Self",
                    callback: () => {
                        TokenRollPrivacy.Private =this.remove(ID, Private)
                        TokenRollPrivacy.Blind =this.remove(ID, Blind)
                        TokenRollPrivacy.Self =this.remove(ID, Self)

                        TokenRollPrivacy.Self.push(ID);
                    }
                }
            },
            default: "none",

        });

    }
    static override(msg){
        if(TokenRollPrivacy.Private.includes(number(msg.speaker.actor))){
            let GMs = ChatMessage.getWhisperRecipients("GM");
            let GMIds = GMs.map((u) => u.data._id);
            let updates = {
                whisper: GMIds,
            };
            msg.data.update(updates);
            console.log("message made private")
        }
        if(TokenRollPrivacy.Blind.includes(number(msg.speaker.actor))){
            let GMs = ChatMessage.getWhisperRecipients("GM");
            let GMIds = GMs.map((u) => u.data._id);
            let updates = {
                blind: true,
                whisper: GMIds,
            };
            msg.data.update(updates);
            console.log("message made blind")
        }
        if(TokenRollPrivacy.Self.includes(number())){
            let updates = {
                blind: true,
                whisper: msg.user,
            };
            msg.data.update(updates);
            console.log("message made to self")
        }
    }

}

    Hooks.on('renderActorSheet', (app, html, data) => {
    TokenRollPrivacy._initButton(app, html, data);
    });

    Hooks.on("preCreateChatMessage", (msg, options, userId) => {
        TokenRollPrivacy.override(msg);
    });





