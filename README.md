# slack-pp-detector-bot
A simple Telegram bot, that notifies people in a group chat whenever a Slack user changes their profile picture.

## Usage in chat
Invite the bot in a group chat, and use following commands:

* `/start` - show start message

* `/watch` - subcribe the chat to the profile picture updates

* `/unwatch` - unsubscribe the chat from the profile picture updates

## Infrastructure
A MySQL database and somewhere to deploy the bot. Use seed.sql query to seed the database.

## .env schema
**BOT_TOKEN** - Telegram bot token obtained from BotFather

**SLACK_TOKEN** - Slack Bot OAuth token, that has permissions `users:read` and `users:write`

**SLACK_USER_UID** - ID of a Slack user to be watched

**MYSQL_HOST,
MYSQL_PORT,
MYSQL_USER,
MYSQL_PWD,
MYSQL_DB** - MySQL database credentials.

**TIME_INTERVAL_IN_MINUTES** - time interval, within which the profile picture should be checked for changes.
