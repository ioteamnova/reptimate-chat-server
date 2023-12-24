import { INestApplication } from '@nestjs/common';
import { SwaggerCustomOptions } from '@nestjs/swagger';
export declare const swaggerConfig: Omit<import("@nestjs/swagger").OpenAPIObject, "paths">;
export declare const initSwagger: (app: INestApplication) => Promise<void>;
export declare const swaggerOptions: SwaggerCustomOptions;
