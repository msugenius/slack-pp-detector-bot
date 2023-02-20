import * as mysql from "mysql2"
import logger from "../utils/logger"
import AvatarInfo from "./interfaces/avatarInfo"
import ChatInfo from "./interfaces/chatInfo"

export class StorageRepository {
    private readonly _connection: mysql.Connection
    
    constructor () {
        logger.logInfo("Attempting to establish database connection...")

        this._connection = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PWD,
            database: process.env.MYSQL_DB,
            port: process.env.MYSQL_PORT
        })

        this._connection.connect((err) => {
            if (err) return logger.logError(err.message);

            logger.logInfo("Connected to the database!")
        })
    }

    addNewChat(chatId: number): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this._checkIfChatExists(chatId)) { 
                logger.logWarning(`Chat ${chatId} is already subscribed!`)
                resolve();
            }

            this._connection.query(
                `INSERT INTO chat_ids (chat_id, last_updated) VALUES (${chatId}, CURRENT_TIMESTAMP)`,
                (err) => {
                    if (err) { 
                        logger.logError(err.message);
                        reject();
                    }
                    logger.logInfo(`${chatId}: subscribed`)
                    resolve()
                }
            )
        })
    }

    getAllSubscribedChats(): Promise<ChatInfo[]> {
        return new Promise((resolve, reject) => {
            this._connection.query<ChatInfo[]>(
                "SELECT * FROM chat_ids",
                (err, res) => {
                    if (err) {
                        logger.logError(err.message)
                        reject()
                    }
                    resolve(res)
                }
            )
        })
    }

    removeChat(chatId: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this._connection.query(
                `DELETE FROM chat_ids WHERE chat_id = ${chatId}`,
                (err) => {
                    if (err) {
                        logger.logError(err.message)
                        reject()
                    }
                    logger.logInfo(`${chatId}: unsubscribed`)
                    resolve()
                }
            )
        })
    }

    updateAvatarHash(hash: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this._connection.query(
                `UPDATE avatar_info SET avatar_hash = '${hash}', last_updated = CURRENT_TIMESTAMP WHERE 1`,
                (err) => {
                    if (err) {
                        logger.logError(err.message)
                        reject()
                    }
                    logger.logInfo("Avatar hash updated!")
                    resolve()
                }
            )
        })
    }

    getAvatarHash(): Promise<AvatarInfo> {
        return new Promise((resolve, reject) => {
            this._connection.query<AvatarInfo[]>(
                "SELECT * FROM avatar_info WHERE 1",
                (err, res) => {
                    if (err) {
                        logger.logError(err.message)
                        reject()
                    }
                    resolve(res[0])
                }
            )
        })
    }

    private _checkIfChatExists(chatId: number): boolean {
        let exists = false;

        this._connection.query<ChatInfo[]>(
            `SELECT * FROM chat_ids WHERE chat_id = ${chatId}`,
            (err, res) => {
                if (err) return logger.logError(err.message);
                exists = res.length > 0
            }
        )
        return exists;
    }
}