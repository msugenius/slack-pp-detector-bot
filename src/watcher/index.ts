import { Context, Telegraf } from "telegraf"
import { Update } from "telegraf/typings/core/types/typegram"
import messages from "../constants/messages"
import slack from "../slack"
import { SlackInfo } from "../slack/slackInfo"
import { StorageRepository } from "../storage/repository"
import logger from "../utils/logger"

export default class Watcher {
    private readonly _bot: Telegraf<Context<Update>>;
    private readonly _repository: StorageRepository;

    constructor (bot: Telegraf<Context<Update>>) {
        this._bot = bot
        this._repository = new StorageRepository()

        logger.logInfo(`Watcher has been initialized. Bot ID: ${bot.botInfo?.id}`)
    }

    async startWatching() {
        logger.logInfo("Watcher has been started.")

        do {
            try {
                logger.logInfo("Checking for changes...")

                let profile = await slack.getProfileInfo(process.env.SLACK_USER_UID);
                let storedInfo = await this._repository.getAvatarHash()

                if (profile.avatar_hash !== storedInfo.avatar_hash) {
                    logger.logInfo("The avatar has been updated.")
                    await this._repository.updateAvatarHash(profile.avatar_hash)
                    this._notifyUsers(profile);
                }

                await this._sleep()
            }
            catch (err: any) {
                logger.logError(err)
                await this._sleep()
            }
        } while (true);
    }

    private _sleep() { 
        return new Promise((resolve) => setTimeout(resolve, process.env.TIME_INTERVAL_IN_MINUTES * 60 * 1000))
    }

    private async _notifyUsers(slackProfile: SlackInfo) {
        let chats = await this._repository.getAllSubscribedChats()

        chats.forEach((c) => {
            this._bot.telegram.sendMessage(c.chat_id, `${messages.avatarChanged}\n\n${slackProfile.image_original}`);
        })
    }
}