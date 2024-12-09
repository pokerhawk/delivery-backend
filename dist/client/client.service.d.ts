import { INestApplication, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "../../prisma/generated/client";
export declare class ClientService extends PrismaClient implements OnModuleInit {
    onModuleInit(): Promise<void>;
    enableShutDownHooks(app: INestApplication): Promise<void>;
}
