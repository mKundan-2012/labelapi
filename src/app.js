/**
 * @author: ntwari egide
 * @description: app entry of default gateway
 */

require("../trace/trace");
const express = require("express");
const route = require("./controller");
const bodyParser = require('body-parser');
const { json, urlencoded } = require('express')
const cors = require('cors')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')

const app = express();
const http = require("http");

// app.use(express.json());

// app.use(bodyParser.urlencoded({
//   extended: true
// }));

// app.use(bodyParser.json());


app.use(cors())
app.use(json({
  limit: '5000mb'
}));
app.use(urlencoded({extended: true}));

var cluster = require("cluster");
const { check } = require("express-validator");
const { validationResult } = require("express-validator");
const numCPUs = 2;

// configure swagger documentation
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'PO Order APIs implementation documentation',
    version: '1.0.0',
    description:
      'Po order description goes here',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'innoways',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:10000',
      description: 'Development server',
    },
    // {
    //   url: 'https://po-order-apis.herokuapp.com',
    //   description: 'Development server',
    // },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        in: 'header',
        bearerFormat: 'JWT',
      }
    }
  },
  security: [{
    bearerAuth: []
  }]
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
    apis: ['./src/routes/*.js']
,
};

const swaggerSpec = swaggerJSDoc(options);

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(route);


// app.listen(10000, () => {
//   console.log("HTTP Server start");
// });

process.on('uncaughtException', function (err) {
  // console.log(err);
});

if (cluster.isMaster) {
  console.log(`Main process ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Main process ${worker.process.pid} exited`);
  });

  
} else {
  var httpServer = http.createServer(app);

  var SSLPORT = process.env.PORT || 10000;


  httpServer.listen(SSLPORT, function () {
    console.log("HTTPS Server is running on: http://localhost:%s", SSLPORT);
  });
}
