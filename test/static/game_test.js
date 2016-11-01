/**
 * Created by garima05 on 31-10-2016.
 */

var expect = chai.expect;

var vDom = {
    reel1: {},
    reel2: {},
    reel3: {},
    btnSpin: {addEventListener: sinon.spy()},
    bonusBanner: {style: {}},
    winBanner: {}
};

describe("Game", function () {
    describe("constructor", function () {
        it("should be initialized with paramters and default values", function () {
            var game = new Game(vDom);
            expect(game.reel1).to.equal(vDom.reel1);
            expect(game.reel2).to.equal(vDom.reel2);
            expect(game.reel3).to.equal(vDom.reel3);

            expect(game.btnSpin).to.equal(vDom.btnSpin);
            expect(game.btnSpin.addEventListener).to.have.been.calledOnce;
            expect(game.winBanner).to.equal(vDom.winBanner);
            expect(game.bonusBanner).to.equal(vDom.bonusBanner);
            expect(game.minimumAnimationDuration).to.equal(2000);
            expect(game.showBonusBannerDuration).to.equal(1500);
        });
    });

    describe("#setStymbol", function () {
        it("Should set symbols image on the reels as passed in", function () {

            var game = new Game(vDom);
            game.setStymbol(1, 2, 3);

            expect(vDom.reel1.src).to.equal("./static/img/Symbol_1.png");
            expect(vDom.reel2.src).to.equal("./static/img/Symbol_2.png");
            expect(vDom.reel3.src).to.equal("./static/img/Symbol_3.png");

        });
    });

    describe("#enableDisableClick", function () {
        it("Should enable click of spin button", function () {
            var game = new Game(vDom);
            game.enableDisableClick();
            expect(game.btnSpin.disabled).to.equal(true);
        });
        it("Should disable click of spin button", function () {
            var game = new Game(vDom);
            game.btnSpin = {disabled: true};
            game.enableDisableClick(true);
            expect(game.btnSpin.disabled).to.equal(false);
        });
    });

    describe("#setDisplayBonus", function () {
        it("Should show bonus", function () {
            var game = new Game(vDom);
            game.setDisplayBonus(true);
            expect(game.bonusBanner.innerHTML).to.equal("You won Respin Bonus");
            expect(game.bonusBanner.style.display).to.equal("block");

        });
        it("Should clear bonus", function () {
            var game = new Game(vDom);
            game.setDisplayBonus();
            expect(game.bonusBanner.innerHTML).to.equal("");
            expect(game.bonusBanner.style.display).to.equal("none");
        });
    });
    describe("#setWinLabel", function () {
        it("Should show 'No Win' if NoWin is given", function () {
            var game = new Game(vDom);
            game.setWinLabel("NoWin");
            expect(game.winBanner.innerHTML).to.equal("No Win");
        });
        it("Should show 'Big Win' if BigWin is given", function () {
            var game = new Game(vDom);
            game.setWinLabel("BigWin");
            expect(game.winBanner.innerHTML).to.equal("Big Win");
        });
        it("Should show 'Small Win' if SmallWin is given", function () {
            var game = new Game(vDom);
            game.setWinLabel("SmallWin");
            expect(game.winBanner.innerHTML).to.equal("Small Win");
        });
    });

    describe("#triggerAnimation", function () {
        it("Should trigger setInterval", function () {
            var game = new Game(vDom);
            var spySetInterval = sinon.stub(window, "setInterval");
            game.triggerAnimation();
            expect(spySetInterval.withArgs(500)).to.have.been.calledOnce;
        });

    });

    describe("#showServerResponse", function () {
        it("Should call setStymbol with symbols array in the response", function () {
            var game = new Game(vDom);
            var response = {symbols: [1, 2, 3]};
            var spySetStymbol = sinon.stub(game, "setStymbol");
            game.showServerResponse(response);
            expect(spySetStymbol.withArgs(1, 2, 3)).to.have.been.calledOnce;
        });
        it("Should call enable enableClick if no bonus in response", function () {
            var game = new Game(vDom);
            var response = {symbols: [1, 2, 3]};
            var spySnableDisableClick = sinon.stub(game, "enableDisableClick");
            game.showServerResponse(response);
            expect(spySnableDisableClick.withArgs(true)).to.have.been.calledOnce;
        });

        it("Should call setDisplayBonus if bonus is in response", function () {
            var game = new Game(vDom);
            var response = {symbols: [1, 2, 3], respinBonus: true};
            var spySetDisplayBonus = sinon.stub(game, "setDisplayBonus");
            var spySetTimeout = sinon.stub(window, "setTimeout");
            game.showServerResponse(response);
            expect(spySetDisplayBonus.withArgs(true)).to.have.been.calledOnce;
            spySetTimeout.restore()
        });
        it("Should call setTimeout if bonus is in response", function () {
            var game = new Game(vDom);
            var response = {symbols: [1, 2, 3], respinBonus: true};
            var spySetTimeout = sinon.stub(window, "setTimeout");
            game.showServerResponse(response);
            expect(spySetTimeout.withArgs(game.showBonusBannerDuration)).to.have.been.calledOnce;
        });


    });
    describe("#triggerSpin", function () {

        it("Should call triggerAnimation and enableDisableClick ", function () {
            var game = new Game(vDom);
            var response = {symbols: [1, 2, 3]};
            var spyTriggerAnimation = sinon.stub(game, "triggerAnimation");
            var spyEnableDisableClick = sinon.stub(game, "enableDisableClick");

            game.showServerResponse(response);
            expect(spyTriggerAnimation).to.have.been.calledOnce;
            expect(spyEnableDisableClick).to.have.been.calledOnce;
        });

        it("Should call Game.utils.getJSON('/spin',success,error) ", function () {
            var game = new Game(vDom);
            var response = {symbols: [1, 2, 3]};
            var spySetStymbol = sinon.stub(game, "setStymbol");
            game.showServerResponse(response);
            expect(spySetStymbol.withArgs(1, 2, 3)).to.have.been.calledOnce;
        });

    });


});
