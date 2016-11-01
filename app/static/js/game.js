/**
 * Created by garima05 on 31-10-2016.
 */


(function (exports) {
    "use strict";

    function Game(obj) {
        var me = this;
        me.reel1 = obj.reel1;
        me.reel2 = obj.reel2;
        me.reel3 = obj.reel3;
        me.btnSpin = obj.btnSpin;
        me.winBanner = obj.winBanner;
        me.btnSpin.addEventListener("click", me.triggerSpin.bind(this));
        me.bonusBanner = obj.bonusBanner;
        me.minimumAnimationDuration = 2000;
        me.showBonusBannerDuration = 1500;
    }

    exports.Game = Game;

    Game.prototype = {
        setStymbol: function (sym1, sym2, sym3) {
            this.reel1.src = "./static/img/Symbol_" + sym1 + ".png";
            this.reel2.src = "./static/img/Symbol_" + sym2 + ".png";
            this.reel3.src = "./static/img/Symbol_" + sym3 + ".png";

        },
        enableDisableClick: function (enable) {
            if (enable) {
                this.btnSpin.disabled = false;
            } else {
                this.btnSpin.disabled = true;
            }
        },
        setWinLabel: function (winType) {
            var winTypeText = {
                NoWin: "No Win",
                BigWin: "Big Win",
                SmallWin: "Small Win"
            };
            this.winBanner.innerHTML = winTypeText[winType];
        },
        setDisplayBonus: function (show) {
            if (show) {
                this.bonusBanner.innerHTML = "You won Respin Bonus";
                this.bonusBanner.style.display = "block";
            } else {
                this.bonusBanner.innerHTML = "";
                this.bonusBanner.style.display = "none";
            }
        },
        triggerAnimation: function () {
            var me = this;
            return setInterval(function () {
                me.setStymbol(Utils.getRandomIntInclusive(0, 5), Utils.getRandomIntInclusive(0, 5), Utils.getRandomIntInclusive(0, 5));
            }, 500);
        },
        showServerResponse: function (response) {
            var me = this;
            me.setWinLabel(response.win)
            me.setStymbol(response.symbols[0], response.symbols[1], response.symbols[2]);
            if (response.respinBonus) {
                me.setDisplayBonus(true);
                setTimeout(function () {
                    me.setDisplayBonus();
                    me.triggerSpin();
                }, me.showBonusBannerDuration);
            } else {
                me.enableDisableClick(true);
            }
        },
        triggerSpin: function () {
            var me = this,
                antomationInterval = me.triggerAnimation();
            me.enableDisableClick();
            Utils.getJSON('/spin', function (data) {
                var serverResponse = data;
                setTimeout(function () {
                    clearInterval(antomationInterval);
                    me.showServerResponse(serverResponse);
                }, me.minimumAnimationDuration);
            }, function () {
                alert('Something went wrong.');
            });
        }
    };

})(this);

