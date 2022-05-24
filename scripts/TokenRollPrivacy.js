console.log("Token Roll Privacy Init")






class TokenRollPrivacy extends FormApplication {

    static Private = [];
    static Blind = [];
    static Self = [];

    static remove(ID, Array){
        let Index = Array.indexOf(ID)


        if(Index > -1){
            Array.splice(Index, 1)
        }

        return Array;
    }

    static _initButton(app, html, data) {

        let Icon = '"fas fa-eye"';
        let ID = app.actor.data._id;
        let BtnString = '`<a class="open-dia" title="Roll Privacy" ><i class =' + Icon + '></i> Roll Privacy </a>`'
        let diaBtn = $(BtnString)
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
                    icon: '<i class="fas fa-eye"></i>',
                    label: "Default",
                    callback: () => {
                        TokenRollPrivacy.Private = this.remove(ID, TokenRollPrivacy.Private)
                        TokenRollPrivacy.Blind = this.remove(ID, TokenRollPrivacy.Blind)
                        TokenRollPrivacy.Self = this.remove(ID, TokenRollPrivacy.Self)
                        Icon = '"fas fa-eye"'
                    }
                },
                Private_GM: {
                    icon: '<i class="fas fa-eye-slash"></i>',
                    label: "Private GM",
                    callback: () => {
                        TokenRollPrivacy.Private = this.remove(ID, TokenRollPrivacy.Private)
                        TokenRollPrivacy.Blind = this.remove(ID, TokenRollPrivacy.Blind)
                        TokenRollPrivacy.Self = this.remove(ID, TokenRollPrivacy.Self)

                        TokenRollPrivacy.Private.push(ID);
                        Icon = '"fas fa-eye-slash"'
                    }
                },
                Blind: {
                    icon: '<i class="fas fa-eye-low-vision"></i>',
                    label: "Blind GM",
                    callback: () => {
                        TokenRollPrivacy.Private = this.remove(ID,TokenRollPrivacy.Private)
                        TokenRollPrivacy.Blind = this.remove(ID, TokenRollPrivacy.Blind)
                        TokenRollPrivacy.Self = this.remove(ID, TokenRollPrivacy.Self)

                        TokenRollPrivacy.Blind.push(ID);
                        Icon = '"fas fa-eye-low-vision"'
                    }
                },
                self: {
                    icon: '<i class="fas fa-arrows-to-eye"></i>',
                    label: "Self",
                    callback: () => {
                        TokenRollPrivacy.Private =this.remove(ID, TokenRollPrivacy.Private)
                        TokenRollPrivacy.Blind =this.remove(ID, TokenRollPrivacy.Blind)
                        TokenRollPrivacy.Self =this.remove(ID, TokenRollPrivacy.Self)

                        TokenRollPrivacy.Self.push(ID);
                        Icon = '"fas fa-arrows-to--eye"'
                    }
                }
            },
            default: "none",

        });

    }
    static override(msg){
        console.log(msg.data.speaker.actor)

        if(TokenRollPrivacy.Private.includes(msg.data.speaker.actor)){
            let GMs = ChatMessage.getWhisperRecipients("GM");
            let GMIds = GMs.map((u) => u.data._id);
            let updates = {
                whisper: GMIds,
            };
            msg.data.update(updates);
            console.log("message made private")
        }
        if(TokenRollPrivacy.Blind.includes(msg.data.speaker.actor)){
            let GMs = ChatMessage.getWhisperRecipients("GM");
            let GMIds = GMs.map((u) => u.data._id);
            let updates = {
                blind: true,
                whisper: GMIds,
            };
            msg.data.update(updates);
            console.log("message made blind")
        }
        if(TokenRollPrivacy.Self.includes(msg.data.speaker.actor)){
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





