import dotenv from "dotenv"
import { startBot } from "./bot"
import { PrismaService } from './storage/prisma.service'

dotenv.config()
const prismaService = new PrismaService()

startBot(prismaService)