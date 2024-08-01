// class Rover

const Command = require('./command.js');
const Message = require('./message.js');

class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

   receiveMessage(message) {
      // Ensure message is a valid Message object
      if (!(message instanceof Message)) {
         throw new Error('Invalid message.');
      }

      // Process each command in the message
      let results = message.commands.map(command => {
         let result = { completed: false };

         switch (command.commandType) {
            case 'MODE_CHANGE':
               if (['NORMAL', 'LOW_POWER', 'EMERGENCY'].includes(command.value)) {
                  this.mode = command.value;
                  result.completed = true;
               }
               break;
            case 'MOVE':
               if (this.mode === 'NORMAL') {
                  this.position = command.value;
                  result.completed = true;
               }
               break;
            case 'STATUS_CHECK':
               result.completed = true;
               result.roverStatus = {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position
               };
               break;
            default:
               result.completed = false;
               break;
         }

         return result;
      });

      // Return the response object
      return {
         message: message.name,
         results: results
      };
   }
}

module.exports = Rover;
