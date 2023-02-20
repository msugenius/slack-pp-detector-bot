import { RowDataPacket } from "mysql2";

export default interface AvatarInfo extends RowDataPacket {
    avatar_hash: string;
    last_updated: Date;
}