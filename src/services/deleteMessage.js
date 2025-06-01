const { slackClient, channelId } = require('../config/slackClient');

async function deleteMessage(ts) {
  try {
    const res = await slackClient.chat.delete({
      channel: channelId,
      ts: ts
    });
    console.log(`Message deleted. Timestamp: ${res.ts}`);
    return res;
  } catch (error) {
    if (error.data) {
      console.error(`Slack API error (chat.delete): ${error.data.error}`);
    } else {
      console.error(`Error deleting message: ${error.message}`);
    }
  }
}

module.exports = { deleteMessage };
