// spec/rover.spec.js

const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Rover class", function () {

  // Test 1: Constructor initializes position
  it("constructor initializes position", function () {
    let rover = new Rover(5000);
    expect(rover.position).toEqual(5000);
  });

  // Test 2: Constructor initializes mode to NORMAL
  it("constructor initializes mode to NORMAL", function () {
    let rover = new Rover(5000);
    expect(rover.mode).toEqual('NORMAL');
  });

  // Test 3: Constructor initializes generatorWatts to 110
  it("constructor initializes generatorWatts to 110", function () {
    let rover = new Rover(5000);
    expect(rover.generatorWatts).toEqual(110);
  });

  // Test 4: ReceiveMessage updates position correctly
  it("receiveMessage updates position correctly", function () {
    let rover = new Rover(5000);
    let commands = [new Command('MOVE', 6000)];
    let message = new Message('Move Command', commands);
    rover.receiveMessage(message);
    expect(rover.position).toEqual(6000);
  });

  // Test 5: ReceiveMessage changes mode correctly
  it("receiveMessage changes mode correctly", function () {
    let rover = new Rover(5000);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Mode Change Command', commands);
    rover.receiveMessage(message);
    expect(rover.mode).toEqual('LOW_POWER');
  });

  // Test 6: ReceiveMessage does not change position if not in NORMAL mode
  it("receiveMessage does not change position if not in NORMAL mode", function () {
    let rover = new Rover(5000);
    let modeChangeCommands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let moveCommands = [new Command('MOVE', 6000)];
    let modeMessage = new Message('Mode Change Command', modeChangeCommands);
    let moveMessage = new Message('Move Command', moveCommands);
    rover.receiveMessage(modeMessage); // Change mode to LOW_POWER
    let response = rover.receiveMessage(moveMessage); // Try to move
    expect(response.results[0].completed).toBe(false); // Move should not be completed
    expect(rover.position).toEqual(5000); // Position should remain unchanged
  });

  // Test 7: ReceiveMessage returns status object correctly
  it("receiveMessage returns correct status object", function () {
    let rover = new Rover(5000);
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Status Command', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(response.results[0].roverStatus).toEqual({
      mode: 'NORMAL',
      generatorWatts: 110,
      position: 5000
    });
  });

});
