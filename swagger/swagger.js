const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: '뭘 좋아할지 몰라서 다 넣어본 API 차림표 by 미남',
            version: '1.0.0',
            description: 'Test API with express',
        },
        host: 'localhost:4000',
        basePath: '/',
        contact: {
            email: "firstquarter88@gmail.com" // 되는건가? 안 보여
        }
    },
    apis: ['./routers/*.js', './swagger/*'] // 경로 확인 꼼꼼히
};

const specs = swaggereJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};