import { Telegraf } from "telegraf"
import messages from "../constants/messages"
import { StorageRepository } from "../storage/repository"
import logger from "../utils/logger"
import Watcher from "../watcher"

const startBot = () => {
    logger.logInfo('Configuring the bot...')
    const bot = new Telegraf(process.env.BOT_TOKEN)

    bot.start((ctx) => {
        if (ctx.chat.type === "private") return;
        
        ctx.reply(messages.start)
    })

    bot.command("/watch", async (ctx) => {
        ctx.reply(messages.subscribingInProgress)
        
        let repository = new StorageRepository();
        await repository.addNewChat(ctx.chat.id);

        ctx.reply(messages.successfullySubscribed)
    })

    bot.command("/stopwatch", async (ctx) => {
        ctx.reply(messages.unsubscribingInProgress)
        
        let repository = new StorageRepository();

        await repository.removeChat(ctx.chat.id)
        ctx.reply(messages.successfullyUnsubscribed)
    })

    bot.launch()
    logger.logInfo('The bot has been started.')

    let watcher = new Watcher(bot);
    watcher.startWatching()
}

export { startBot }