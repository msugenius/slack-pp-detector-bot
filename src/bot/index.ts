import { PrismaClient } from '@prisma/client'
import { Telegraf } from 'telegraf'
import messages from '../constants/messages'
import logger from '../utils/logger'
import Watcher from '../watcher'

const startBot = (prismaService: PrismaClient) => {
  logger.logInfo('Configuring the bot...')
  const bot = new Telegraf(process.env.BOT_TOKEN)

  bot.start(ctx => {
    if (ctx.chat.type === 'private') return

    ctx.reply(messages.start)
  })

  bot.command('/watch', async ctx => {
    ctx.reply(messages.subscribingInProgress)

    try {
      await prismaService.chat_ids.create({
        data: {
          chatId: ctx.chat.id,
        },
      })
    } catch (e: any) {
      logger.logError(e)
    }

    ctx.reply(messages.successfullySubscribed)
  })

  bot.command('/stopwatch', async ctx => {
    ctx.reply(messages.unsubscribingInProgress)

    try {
        await prismaService.chat_ids.delete({
          where: {
            chatId: ctx.chat.id,
          },
        })
      } catch (e: any) {
        logger.logError(e)
      }

    ctx.reply(messages.successfullyUnsubscribed)
  })

  bot.launch()
  logger.logInfo('The bot has been started.')

  let watcher = new Watcher(bot, prismaService)
  watcher.startWatching()
}

export { startBot }

