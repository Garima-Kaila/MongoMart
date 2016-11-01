/**
 * Created by garima05 on 31-10-2016.
 */

var ctrlGame = require('../../../app/controllers/game');
var chai = require('chai');
var expect = chai.expect;

describe('Game Controller', function () {
    describe('#spin()', function () {

        it('should return json with symbols, win and bonus', function () {
            var spinResult = ctrlGame.spin();
            expect(spinResult).to.be.a('object');
            expect(spinResult.symbols).to.be.a('array');
            expect(spinResult.respinBonus).to.be.a('boolean');
            expect(spinResult.win).to.be.a('string');
        });

        it('should have all different symbols for "No Win" ', function () {
            var spinResult;
            for (; ;) { // since its a random outome so make infinite loop till "No Win"
                spinResult = ctrlGame.spin();
                if (spinResult.win === "NoWin") {
                    break;
                }
            }
            expect((spinResult.symbols[0] !== spinResult.symbols[1]) && (spinResult.symbols[0] !== spinResult.symbols[2]) && (spinResult.symbols[2] !== spinResult.symbols[1])).to.be.true;
        });

        it('should have one different symbols for "Small Win" ', function () {
            var spinResult;
            for (; ;) { // since its a random outome so make infinite loop till "Small Win"
                spinResult = ctrlGame.spin();
                if (spinResult.win === "SmallWin") {
                    break;
                }
            }
            expect((spinResult.symbols[0] === spinResult.symbols[1]) || (spinResult.symbols[0] === spinResult.symbols[2]) || (spinResult.symbols[2] === spinResult.symbols[1] )).to.be.true;
        });

        it('should have all symbols same for "Big Win" ', function () {
            var spinResult;
            for (; ;) {// since its a random outome so make infinite loop till "Big Win"
                spinResult = ctrlGame.spin();
                if (spinResult.win === "BigWin") {
                    break;
                }
            }
            expect((spinResult.symbols[0] === spinResult.symbols[1] && spinResult.symbols[2] === spinResult.symbols[1] )).to.be.true;
        });
    });
});