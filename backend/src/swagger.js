// swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            }
        }
    },
    info: {
      title: "My API Docs",
      version: "1.0.0",
      description: "API documentation for my service",
    },
    servers: [
      {
        url: "http://localhost:3000", // API 기본 주소
      },
    ],
  },
  apis: ["./src/routes/*.js"], // 라우터 파일 경로
};

export const specs = swaggerJsdoc(options);
export { swaggerUi };
