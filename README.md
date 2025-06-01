```
# Slack Messaging App (Node.js)

This repository contains a modular Node.js application for performing basic Slack messaging operations—sending, scheduling, retrieving, updating, and deleting messages—within a Slack Developer Sandbox. All sensitive credentials are stored in environment variables, and each function is implemented with robust error handling.  

---

## Table of Contents

1. [Prerequisites](#prerequisites)  
2. [Folder Structure](#folder-structure)  
3. [Environment Configuration](#environment-configuration)  
4. [Installation](#installation)  
5. [Usage](#usage)  
   - [Send a Message](#send-a-message)  
   - [Schedule a Message](#schedule-a-message)  
   - [Retrieve a Message](#retrieve-a-message)  
   - [Update a Message](#update-a-message)  
   - [Delete a Message](#delete-a-message)  
6. [Error Handling](#error-handling)  
7. [Troubleshooting](#troubleshooting)  
8. [License](#license)  

---

## Prerequisites

Before using this application, ensure that:

1. **Node.js** (version 14.x or later) and **npm** are installed on your local machine.  
2. You have provisioned a **Slack Developer Sandbox** workspace and created a Slack App within that sandbox.  
3. The Slack App has been granted the following **Bot Token Scopes** (under *OAuth & Permissions*) and installed to your sandbox:  
   - `chat:write`  
   - `chat:write.public` (if you intend to post to channels where the bot is not yet a member)  
   - `channels:read` & `channels:history` (for public channels)  
   - `groups:read` & `groups:history` (for private channels, if applicable)  
   - `im:read` & `im:history`, `mpim:read` & `mpim:history` (for direct / multi-person DM channels, if applicable)  

4. You have obtained a **Bot User OAuth Access Token** (begins with `xoxb-`) for your Slack App.  
5. You have identified the **Channel ID** of the channel in your sandbox where messages will be posted. (Channel IDs for public channels begin with `C`, private channels begin with `G`.)  

---

## Folder Structure

```

slack-messaging-app/
├── src/
│   ├── services/
│   │   ├── sendMessage.js
│   │   ├── scheduleMessage.js
│   │   ├── getMessage.js
│   │   ├── updateMessage.js
│   │   └── deleteMessage.js
│   ├── utils/
│   │   └── time.js
│   ├── config/
│   │   └── slackClient.js
│   └── index.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md

````

- `src/services/`  
  Contains individual modules for each Slack API operation (send, schedule, retrieve, update, delete).  
- `src/utils/`  
  Contains utility functions (e.g., computing future Unix timestamps for scheduling).  
- `src/config/`  
  Contains the Slack WebClient initialization (reads environment variables).  
- `src/index.js`  
  The main entry point that parses command-line arguments and invokes the appropriate service function.  
- `.env`  
  Stores sensitive credentials (Slack bot token and channel ID). **Do not commit this file.**  
- `.env.example`  
  Template showing which environment variables are required (no real secrets).  
- `.gitignore`  
  Excludes `node_modules/` and `.env`.  
- `package.json`  
  Lists project dependencies (`@slack/web-api`, `dotenv`) and metadata.  

---

## Environment Configuration

1. **Copy `.env.example` to `.env`:**

   ```bash
   cp .env.example .env
````

2. **Populate `.env` with your credentials:**

   ```dotenv
   # .env
   SLACK_BOT_TOKEN=xoxb-your-bot-token
   SLACK_CHANNEL_ID=C1234567890
   ```

   * `SLACK_BOT_TOKEN` – Bot User OAuth Access Token for your Slack App.
   * `SLACK_CHANNEL_ID` – ID of the channel in which you want to post messages.

3. **Verify** that `.env` is listed in `.gitignore` so that sensitive data is not committed:

   ```gitignore
   node_modules/
   .env
   ```

---

## Installation

1. **Clone this repository** (if you have not already):

   ```bash
   git clone https://your-repo-url.git
   cd slack-messaging-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Verify Node version**:
   The application requires Node.js v14.x or higher. Confirm with:

   ```bash
   node -v
   # Example output: v16.20.2
   ```

---

## Usage

All commands are executed from the project root. The entry point is `src/index.js`. Use one of the following commands to perform a Slack messaging operation.

```bash
# Format:
node src/index.js <operation> [arguments]

# Operations:
#   send       : Send a new message.
#   schedule   : Schedule a message 1 minute in the future.
#   get        : Retrieve a message by timestamp.
#   update     : Update a message by timestamp.
#   delete     : Delete a message by timestamp.
```

### Send a Message

Post a new message immediately.

```bash
node src/index.js send "Hello from Slack Messaging App"
```

* **Function invoked**: `sendMessage(text)`
* **Slack method**: `chat.postMessage`
* **Output**: Logs “Message sent. Timestamp: <ts>” on success.

### Schedule a Message

Schedule a message to post 1 minute in the future (default). If desired, you can modify `src/utils/time.js` to adjust scheduling logic.

```bash
node src/index.js schedule "This message will appear in one minute"
```

* **Function invoked**: `scheduleMessage(text)`
* **Slack method**: `chat.scheduleMessage` (with `post_at` set to current time + 60 seconds)
* **Output**: Logs “Message scheduled. Scheduled message ID: <id>” on success.

### Retrieve a Message

Retrieve the contents of an existing message, given its timestamp.

```bash
node src/index.js get 1624391234.000200
```

* **Function invoked**: `getMessage(ts)`
* **Slack method**: `conversations.history` (with `latest=<ts>`, `inclusive=true`, `limit=1`)
* **Output**: Logs “Message at <ts>: <text>” if found, or “No message found at timestamp <ts>.”

### Update a Message

Update (edit) an existing message’s text by providing its timestamp and new content.

```bash
node src/index.js update 1624391234.000200 "This text has been edited."
```

* **Function invoked**: `updateMessage(ts, newText)`
* **Slack method**: `chat.update`
* **Output**: Logs “Message updated. New text: \<edited\_text>” on success.

### Delete a Message

Delete a message from the channel by its timestamp.

```bash
node src/index.js delete 1624391234.000200
```

* **Function invoked**: `deleteMessage(ts)`
* **Slack method**: `chat.delete`
* **Output**: Logs “Message deleted. Timestamp: <ts>” on success.

---

## Error Handling

Every service function employs `async/await` within a `try/catch` block. Errors are handled as follows:

1. **Slack API errors** (returned as `error.data.error`) are logged with a clear description:

   ```
   Slack API error (<method>): <error_code>
   ```
2. **Network or unexpected runtime errors** (thrown by the client library) are logged as:

   ```
   Error <operation>: <error.message>
   ```
3. If environment variables are missing or invalid, the application will throw an error at startup indicating which variable is absent.

This robust pattern ensures that you receive precise feedback if, for example, your bot token is invalid, the channel ID is incorrect, or you lack the required scope.

---

## Troubleshooting

* **“Missing SLACK\_BOT\_TOKEN or SLACK\_CHANNEL\_ID in .env”**
  – Ensure you have a `.env` file in the project root and that both variables are defined. Run `cp .env.example .env` if necessary and update accordingly.

* **“channel\_not\_found” or “not\_in\_channel”**
  – Verify that the `SLACK_CHANNEL_ID` is correct and that your Bot User has been invited to that channel (or add `chat:write.public` scope if posting to public channels where it is not yet a member).

* **“invalid\_auth”**
  – The provided bot token is invalid or revoked. Double-check your `SLACK_BOT_TOKEN` and re-install the Slack App to generate a new token if needed.

* **“is\_archived”**
  – The channel you are targeting is archived. Unarchive the channel or use a different one.

* **Rate Limiting (`ratelimited_error`)**
  – Slack imposes rate limits. If you exceed these limits, wait a few seconds before retrying. Implement backoff logic if you plan to send many messages programmatically.

---

## License

This project is released under the [MIT License](./LICENSE).

---

**End of Document**

```
```
