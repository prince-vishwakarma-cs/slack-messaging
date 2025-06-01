const { slackClient, channelId } = require('../config/slackClient');

async function getMessage(ts) {
  try {
    const res = await slackClient.conversations.history({
      channel: channelId,
      latest: ts,
      inclusive: true,
      limit: 1
    });
    if (res.messages && res.messages.length > 0) {
      const msg = res.messages[0];
      console.log(`Message at ${ts}: ${msg.text}`);
      return msg;
    } else {
      console.log(`No message found at timestamp ${ts}`);
    }
  } catch (error) {
    if (error.data) {
      console.error(`Slack API error (conversations.history): ${error.data.error}`);
    } else {
      console.error(`Error retrieving message: ${error.message}`);
    }
  }
}

module.exports = { getMessage };






