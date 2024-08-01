//class Message

const Command = require('./command.js'); // Ensure Command class is imported

class Message {
   constructor(name, commands = []) {
      // Check if name is provided
      if (!name) {
         throw new Error('Name is required.');
      }
      // Check if commands is an array of Command objects
      if (!Array.isArray(commands) || !commands.every(cmd => cmd instanceof Command)) {
         throw new Error('Commands must be an array of Command objects.');
      }
      // Initialize properties
      this.name = name;
      this.commands = commands;
   }
}

module.exports = Message;
