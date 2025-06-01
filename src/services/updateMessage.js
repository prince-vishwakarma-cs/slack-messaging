const { slackClient, channelId } = require('../config/slackClient');

async function updateMessage(ts, newText) {
  try {
    const res = await slackClient.chat.update({
      channel: channelId,
      ts: ts,
      text: newText
    });
    console.log(`Message updated. New text: ${res.message.text}`);
    return res;
  } catch (error) {
    if (error.data) {
      console.error(`Slack API error (chat.update): ${error.data.error}`);
    } else {
      console.error(`Error updating message: ${error.message}`);
    }
  }
}

module.exports = { updateMessage };
