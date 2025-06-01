# Slack Messaging App (Node.js)

This repository contains a modular Node.js application for performing basic Slack messaging operations—sending, scheduling, retrieving, updating, and deleting messages—within a Slack Developer Sandbox.  

## Table of Contents

1. [Prerequisites](#prerequisites)  
2. [Environment Configuration](#environment-configuration)  
3. [Installation](#installation)  
5. [Usage](#usage)  
   - [Send a Message](#send-a-message)  
   - [Schedule a Message](#schedule-a-message)  
   - [Retrieve a Message](#retrieve-a-message)  
   - [Update a Message](#update-a-message)  
   - [Delete a Message](#delete-a-message)  


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

## Environment Configuration

1. **Copy `.env.example` to `.env`:**

   ```bash
   cp .env.example .env


## Installation

1. **Clone this repository** (if you have not already):

   ```bash
   git clone https://github.com/prince-vishwakarma-cs/slack-messaging.git
   cd task

2. **Install dependencies**:

   ```bash
   npm install


## Usage

All commands are executed from the project root. The entry point is `index.js`. Use one of the following commands to perform a Slack messaging operation.

```bash
# Format:
node index.js <operation> [arguments]

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
node index.js send "Hello from Slack Messaging App"
```

### Schedule a Message

Schedule a message to post 1 minute in the future (default). If desired, you can pass time in minutes after message.

```bash
node index.js schedule "This message will appear in one minute" < minutes >
```

### Retrieve a Message

Retrieve the contents of an existing message, given its timestamp.

```bash
node index.js get 1624391234.000200
```

### Update a Message

Update (edit) an existing message’s text by providing its timestamp and new content.

```bash
node index.js update 1624391234.000200 "This text has been edited."
```

### Delete a Message

Delete a message from the channel by its timestamp.

```bash
node index.js delete 1624391234.000200
```
