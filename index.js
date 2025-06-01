require('dotenv').config();  // Ensure .env is loaded
const { sendMessage } = require('./src/services/sendMessage');
const { scheduleMessage } = require('./src/services/scheduleMessage');
const { getMessage } = require('./src/services/getMessage');
const { updateMessage } = require('./src/services/updateMessage');
const { deleteMessage } = require('./src/services/deleteMessage');

// Parse command line args
// Usage: node index.js <operation> [args...]
const [operation, ...args] = process.argv.slice(2);

async function main() {
  switch (operation) {
    case 'send':
      // e.g. node index.js send "Hello world"
      await sendMessage(args.join(' '));
      break;
    case 'schedule':
      // e.g. node index.js schedule "Reminder message"
      // schedules 1 minute from now by default
      await scheduleMessage(args.join(' '));
      break;
    case 'get':
      // e.g. node index.js get 1624391234.000200
      await getMessage(args[0]);
      break;
    case 'update':
      // e.g. node index.js update 1624391234.000200 "Updated text"
      await updateMessage(args[0], args.slice(1).join(' '));
      break;
    case 'delete':
      // e.g. node index.js delete 1624391234.000200
      await deleteMessage(args[0]);
      break;
    default:
      console.log('Usage: node index.js <send|schedule|get|update|delete> [arguments]');
      console.log('Examples:');
      console.log('  node index.js send "Hello everyone"');
      console.log('  node index.js schedule "Future message"');
      console.log('  node index.js get <timestamp>');
      console.log('  node index.js update <timestamp> "New text"');
      console.log('  node index.js delete <timestamp>');
  }
}

main();
