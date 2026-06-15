import swaggerJsDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Project Management System API",
            version: "1.0.0",
            description:
                "Backend APIs for Project Management System",
        },

        servers: [
            {
                url: "http://localhost:5000",
            },
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },

        security: [
            {
                bearerAuth: [],
            },
        ],
    },

    apis: [
        "./src/routes/*.js",
    ],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;