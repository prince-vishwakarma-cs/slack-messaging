const { slackClient, channelId } = require('../config/slackClient');

async function sendMessage(text) {
  try {
    const res = await slackClient.chat.postMessage({
      channel: channelId,
      text: text
    });
    console.log(`Message sent. Timestamp: ${res.ts}`);
    return res;
  } catch (error) {
    // SlackApiError has .data with error info
    if (error.data) {
      console.error(`Slack API error (postMessage): ${error.data.error}`);
    } else {
      console.error(`Error sending message: ${error.message}`);
    }
  }
}

module.exports = { sendMessage };
