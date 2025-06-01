const { getFutureTimestamp } = require('../utils/time');
const { slackClient, channelId } = require('../config/slackClient');

async function scheduleMessage(text, minutes = 1) {
  try {
    const postAt = getFutureTimestamp(minutes);
    const response = await slackClient.chat.scheduleMessage({
       channel: channelId,
      text,
      post_at: postAt,
    });
    console.log(`Message scheduled after ${minutes} minutes. Schedule ID: ${response.scheduled_message_id}`);
  } catch (error) {
    console.error('Error scheduling message:', error.data?.error || error.message);
  }
}

module.exports = { scheduleMessage };
