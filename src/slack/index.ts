import axios from "axios"
import logger from "../utils/logger"
import { SlackInfo } from "./slackInfo"

const API_URL = "https://slack.com/api"

export default {
    getProfileInfo: (profileId: string): Promise<SlackInfo> => {
        logger.logInfo(`Getting Slack profile info for ${profileId}...`)

        return axios.get(
            `${API_URL}/users.profile.get?user=${profileId}`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${process.env.SLACK_TOKEN}`
                }
            })
            .then(r => r.data.profile as SlackInfo)
    }
}