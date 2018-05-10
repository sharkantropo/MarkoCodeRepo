/*jshint esversion: 6 */

var patt_chain = [], pst = document.getElementById("subtxtB"), rst = document.getElementById("subtxtC");
var sel = document.getElementsByClassName("color_pad"), is_on = false, strM = document.getElementById("subtxtA");

Array.from(sel).forEach(element => {
    element.addEventListener("click", () => {
        setting_game.color_select(element.children[0].innerHTML);
    }, true);
});

const set_game =
    {
        add_patt: function () {
            let new_patt;
            new_patt = Math.round(Math.random() * 3);
            patt_chain.push(new_patt);
            this.beep_button(patt_chain);
        },
        beep_button: function (chain_sig) {
            var stk = 0;
            let beepat = function (chain_sig) {
                var darkColor, liteColor;
                darkColor = document.getElementById("litebut_" + chain_sig[stk]).style.backgroundColor;
                liteColor = darkColor.slice(4);
                document.getElementById("litebut_" + chain_sig[stk]).style.backgroundColor = liteColor;
                document.getElementById("play_" + chain_sig[stk]).play();
                const atimer = setTimeout(() => {
                    console.log(chain_sig[stk]);
                    document.getElementById("litebut_" + chain_sig[stk]).style.backgroundColor = darkColor;
                    if (stk < chain_sig.length - 1) {
                        stk++;
                        beepat(chain_sig);
                    }
                }, 1000);
            };
            beepat(chain_sig);
        },
        game_counter: 0,
        game_started: "off",
        stacks: 0
    };

const setting_game = Object.create(set_game);

setting_game.init = function () {
    if (!is_on) {
        this.game_started = "on";
        this.add_patt();
        this.game_counter++;
        pst.style.left="40px";
        pst.innerText = "0"+this.game_counter;
        is_on = true;
    }
};

setting_game.color_select = function (fig) {
    if (this.game_started == "on") {
        this.beep_button(fig);
        this.game_started = "off";
        setTimeout(() => {
            if (fig == patt_chain[this.stacks]) 
            {
                if (this.stacks == 19) 
                {
                    pst.style.left="16px";
                    pst.innerText = "winner!";
                    patt_chain=[];
                    setTimeout(() => {
                        this.add_patt();
                        this.game_counter = 1;
                        pst.style.left="40px";
                        pst.innerText =this.game_counter;
                        setTimeout(() => {
                            this.game_started = "on";
                        }, 1300);
                        this.stacks = 0;
                    }, 900);
                    return;     
                }
                this.stacks++;
                if (this.stacks == this.game_counter) {
                    this.add_patt();
                    this.game_counter++;
                    rst.innerText = "";
                    if (this.game_counter<10) {
                        pst.innerText = "0"+this.game_counter;
                    }
                    else
                    {
                        pst.innerText = this.game_counter;
                    }
                    let val = this.game_counter * 900;
                    setTimeout(() => {
                        this.game_started = "on";
                        rst.innerText = "RESET";
                    }, val);
                    this.stacks = 0;
                    return;
                }
                this.game_started = "on";
            }
            else if( strM.innerText == "strict mode: on")
            {
                pst.style.left="16px";
                pst.innerText = "wrong!";
                patt_chain=[];
                setTimeout(() => {
                    this.add_patt();
                    this.game_counter = 1;
                    pst.style.left="40px";
                    pst.innerText = "0"+this.game_counter;
                    setTimeout(() => {
                        this.game_started = "on";
                    }, 1000);
                    this.stacks = 0;
                }, 900);
            }
            else {
                pst.style.left="16px";
                pst.innerText = "wrong!";
                setTimeout(() => {
                    this.beep_button(patt_chain);
                    let val = this.game_counter * 1000;
                    pst.style.left="40px";
                    pst.innerText = "0"+this.game_counter;
                    rst.innerText = "";
                    setTimeout(() => {
                        this.game_started = "on";
                        rst.innerText="RESET";
                    }, val);
                    this.stacks = 0;
                }, 900);
            }
        }, 1050);
    }
    else {
        return;
    }
};

setting_game.reset = function () {
    if (this.game_started == "on") 
    {
        patt_chain = [];
        this.game_counter = 1;
        this.game_started="off";
        setTimeout(() => {
            pst.innerText = "0"+this.game_counter;
            this.add_patt();
            this.game_started="on";
        }, 900);
    }
};

pst.addEventListener("click", () => { setting_game.init(); }, false);
rst.addEventListener("click", () => { setting_game.reset(); }, false);
strM.addEventListener("click", () => 
{ 
    if (strM.innerText=="strict mode: off") {
        strM.innerText = "strict mode: on"; 
    }
    else
    {
        strM.innerText="strict mode: off";
    }
}, false);