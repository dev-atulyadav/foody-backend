import swaggerJsDoc from "swagger-jsdoc";
export const options = {   
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Foody Backend API",
            version: "1.0.0",
            description: "API documentation for the Foody Backend application",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server",
            },
        ],
    },
    apis: ["./src/routes/*.js", "./src/models/*.js"], 
};

const swaggerDocument = swaggerJsDoc(options);

export default swaggerDocument;