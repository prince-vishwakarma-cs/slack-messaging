const { slackClient, channelId } = require('../config/slackClient');
const { getScheduleTimestamp } = require('../utils/time');

async function scheduleMessage(text, minutes = 1) {
  try {
    const postAt = getScheduleTimestamp(minutes);
    const res = await slackClient.chat.scheduleMessage({
      channel: channelId,
      text: text,
      post_at: postAt
    });
    console.log(`Message scheduled. Scheduled message ID: ${res.scheduled_message_id}`);
    return res;
  } catch (error) {
    if (error.data) {
      console.error(`Slack API error (scheduleMessage): ${error.data.error}`);
    } else {
      console.error(`Error scheduling message: ${error.message}`);
    }
  }
}

module.exports = { scheduleMessage };
