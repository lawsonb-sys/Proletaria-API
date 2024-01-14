const fastify = require("fastify")({ logger: false });
const mongoose = require("mongoose");
require("dotenv").config();

//import my routes
const userRoutes = require("./routes/user_routes");
//connect my database
mongoose
  .connect(process.env.MONGODB_URI, {
    autoIndex: false,
  })
  .then(() => console.log("connect to database"))
  .catch((e) => console.log("error conection to database", e));
//start my server
fastify.register(userRoutes, { prefix: "/api/proletaria/users" });

fastify.listen({ port: 1000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});

fastify.log.info(`le serveur est allumer au port 8000`);
