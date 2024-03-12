import { PrismaClient } from '@prisma/client'
import { Context, Telegraf } from 'telegraf'
import { Update } from 'telegraf/typings/core/types/typegram'
import messages from '../constants/messages'
import slack from '../slack'
import { SlackInfo } from '../slack/slackInfo'
import logger from '../utils/logger'

export default class Watcher {
  private readonly _bot: Telegraf<Context<Update>>
  private readonly _prismaService: PrismaClient

  constructor(bot: Telegraf<Context<Update>>, prismaService: PrismaClient) {
    this._bot = bot
    this._prismaService = prismaService

    logger.logInfo(`Watcher has been initialized. Bot ID: ${bot.botInfo?.id}`)
  }

  private async insertNewAvatar(profile: SlackInfo) {
    await this._prismaService.avatar_info.create({
      data: {
        avatarHash: profile.avatar_hash,
        avatarUrl: profile.image_original
      },
    })
    logger.logInfo('The avatar has been updated.')
    this._notifyUsers(profile)
  }

  async startWatching() {
    logger.logInfo('Watcher has been started.')

    do {
      try {
        logger.logInfo('Checking for changes...')

        let profile = await slack.getProfileInfo(process.env.SLACK_USER_UID)
        let storedInfo = await this._prismaService.avatar_info.findFirst({
          orderBy: {
            updatedAt: 'desc',
          },
        })

        if (!storedInfo || profile.avatar_hash !== storedInfo.avatarHash) {
          await this.insertNewAvatar(profile)
        }

        await this._sleep()
      } catch (err: any) {
        logger.logError(err)
        await this._sleep()
      }
    } while (true)
  }

  private _sleep() {
    return new Promise(resolve =>
      setTimeout(resolve, process.env.TIME_INTERVAL_IN_MINUTES * 60 * 1000)
    )
  }

  private async _notifyUsers(slackProfile: SlackInfo) {
    let chats = await this._prismaService.chat_ids.findMany({})

    chats.forEach(c => {
      this._bot.telegram.sendMessage(
        c.chatId.toString(),
        `${messages.avatarChanged}\n\n${slackProfile.image_original}`
      )
    })
  }
}
