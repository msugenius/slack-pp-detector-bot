import { PrismaClient } from "@prisma/client"

export class PrismaService extends PrismaClient {
  async Init() {
    await this.$connect;
  }
}