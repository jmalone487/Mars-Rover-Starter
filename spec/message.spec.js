// spec/message.spec.js

const Message = require('../message.js');
const Command = require('../command.js');

describe("Message class", function () {

    // Test 4: Throws error if a name is NOT passed into the constructor as the first parameter
    it("throws error if a name is NOT passed into the constructor as the first parameter", function () {
        expect(() => new Message()).toThrow(new Error('Name is required.'));
    });

    // Test 5: Constructor sets name
    it("constructor sets name", function () {
        let message = new Message('Test message');
        expect(message.name).toEqual('Test message');
    });

    // Test 6: Contains a commands array passed into the constructor as the 2nd argument
    it("contains a commands array passed into the constructor as the 2nd argument", function () {
        let commands = [
            new Command('MOVE', 12000),
            new Command('STATUS_CHECK')
        ];
        let message = new Message('Test message with two commands', commands);
        expect(message.commands).toEqual(commands);
    });

});
