const fastifys = require("fastify");
const user_controler = require("../controler/user_controler");

//configuration de l'authentification

async function routes(fastify, option) {
  fastify.get("/all", user_controler.getAllUser);
  fastify.get("/:id", user_controler.getById);
  fastify.get("/:id/images", user_controler.getimageById);
  fastify.post("/", user_controler.creatUser);
  fastify.post("/login", user_controler.login);
  fastify.put("/:id", user_controler.updatUser);
  fastify.delete("/:id", user_controler.deleteUser);
}

module.exports = routes;
