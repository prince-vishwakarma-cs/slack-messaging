// src/config/slackClient.js
require('dotenv').config();  // Load .env into process.env
const { WebClient } = require('@slack/web-api');

// Read token and channel from environment
const token = process.env.SLACK_BOT_TOKEN;
const channelId = process.env.SLACK_CHANNEL_ID;
if (!token || !channelId) {
  throw new Error('Missing SLACK_BOT_TOKEN or SLACK_CHANNEL_ID in .env');
}

// Initialize Slack client
const slackClient = new WebClient(token);
module.exports = { slackClient, channelId };
