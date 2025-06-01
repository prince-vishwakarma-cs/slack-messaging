require('dotenv').config();
const { sendMessage } = require('./src/services/sendMessage');
const { scheduleMessage } = require('./src/services/scheduleMessage');
const { getMessage } = require('./src/services/getMessage');
const { updateMessage } = require('./src/services/updateMessage');
const { deleteMessage } = require('./src/services/deleteMessage');

const command = process.argv[2];
const text = process.argv[3];
const minutes = parseInt(process.argv[4], 10) || 1;

async function main() {
  try {
    switch (command) {
      case 'send':
        if (!text) {
          console.error('Please provide message text to send.');
          return;
        }
        await sendMessage(process.argv.slice(3).join(' '));
        break;

      case 'schedule':
        if (!text) {
          console.error('Please provide message text to schedule.');
          return;
        }
        if (minutes < 1) {
          console.error('Slack requires scheduling at least 1 minute into the future.');
          return;
        }
        await scheduleMessage(text, minutes);
        break;

      case 'get':
        if (!text) {
          console.error('Please provide a timestamp to retrieve.');
          return;
        }
        await getMessage(text);
        break;

      case 'update':
        if (!text || process.argv.length < 5) {
          console.error('Usage: node index.js update <timestamp> "New message text"');
          return;
        }
        const updatedText = process.argv.slice(4).join(' ');
        await updateMessage(text, updatedText);
        break;

      case 'delete':
        if (!text) {
          console.error('Please provide a timestamp to delete.');
          return;
        }
        await deleteMessage(text);
        break;

      default:
        console.log('\nUsage: node index.js <send|schedule|get|update|delete> [arguments]');
        console.log('\nExamples:');
        console.log('  node index.js send "Hello world!"');
        console.log('  node index.js schedule "Remind me later" 5');
        console.log('  node index.js get <timestamp>');
        console.log('  node index.js update <timestamp> "Updated text"');
        console.log('  node index.js delete <timestamp>\n');
    }
  } catch (error) {
    console.error('Operation failed:', error.message || error);
  }
}

main();
