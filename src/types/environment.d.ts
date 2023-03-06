export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BOT_TOKEN: string;

            SLACK_TOKEN: string;
            SLACK_USER_UID: string;

            MYSQL_HOST: string;
            MYSQL_PORT: number;
            MYSQL_USER: string;
            MYSQL_PWD: string;
            MYSQL_DB: string;

            TIME_INTERVAL_IN_MINUTES: number;
        }
    }
}