import { RowDataPacket } from "mysql2";

export default interface ChatInfo extends RowDataPacket {
    chat_id: number;
    last_updated: Date;
}