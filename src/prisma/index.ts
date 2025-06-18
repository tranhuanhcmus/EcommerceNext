import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

class DatabaseClient {
  private static instance: PrismaClient;

  private constructor() {}

  public static get client(): PrismaClient {
    if (!this.instance) {
      if (!global.prisma) {
        global.prisma = new PrismaClient();
      }
      this.instance = global.prisma;
    }
    return this.instance;
  }

  public static async connect(): Promise<void> {
    await this.client.$connect();
  }

  public static async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }
}

export default DatabaseClient;
