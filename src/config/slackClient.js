require('dotenv').config(); 
const { WebClient } = require('@slack/web-api');

const token = process.env.SLACK_BOT_TOKEN;
const channelId = process.env.SLACK_CHANNEL_ID;
if (!token || !channelId) {
  throw new Error('Missing SLACK_BOT_TOKEN or SLACK_CHANNEL_ID in .env');
}

const slackClient = new WebClient(token);
module.exports = { slackClient, channelId };
