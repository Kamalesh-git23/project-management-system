import { type } from "os";
import { title } from "process";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition:{
        openapi: "3.0.0",
        info:{
            title:"Project Management API",
            version: "1.0.0",
            description: "Backend API for Project Management System"
        },
        servers:[
            {
                url:"http://localhost:5000"
            }
        ],
        components:{
            securitySchemes:{
                bearerAuth:{
                    type:"http",
                    scheme:"bearer",
                    bearerFormat:"JWT"
                }
            }
        }
    },
    apis:[
        "./src/routes/*.js"
    ]
};

const specs = swaggerJSDoc(options);

export default specs;