const fastify = require("fastify")();
const User = require("../models/models");
const creatoken = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function getAllUser(request, reply) {
  try {
    const users = await User.find();
    reply.send(users);
  } catch (error) {
    reply.status(500).send({ error: err.message });
  }
}
/*async function getSec(request, reply) {
  try {
    const token = req.headers["Authorization"].split(" ")[1];
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      reply.status(401).send("Unauthorized");
      return;
    }
    reply.send("vous etes autoirisé");
  } catch (error) {
    reply.status(500).send({ error: err.message });
  }
}*/
async function getById(request, reply) {
  try {
    const user = await User.findById(request.params.id);
    /* const token = creatoken(JSON.stringify(user));
    if (token) {
      reply.status(200).send({
        succes: true,
        token: "JWT" + token,
        user: user,
      });
    } else {
      reply.status(404).send("pas de user");
    }*/
    reply.status(200).send(user);
  } catch (error) {
    reply.status(500).send({ message: "invalid token", error });
  }
}
async function getimageById(request, reply) {
  try {
    const users = await User.findById(request.params.id);
    if (!users) {
      reply.status(401).send("User not fund");
      return;
    }
    const image = users.image;

    reply.send(image);
  } catch (error) {
    reply.status(500).send({ error: err.message });
  }
}

async function creatUser(request, reply) {
  try {
    const { firstName, password, email } = request.body;
    const userexist = await User.findOne({ email });
    if (userexist) {
      reply.status(409).send({ message: "User already existe" });
      return;
    }
    const user = new User({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: request.body.password,
      work: request.body.work,
      ville: request.body.ville,
      number: request.body.number,
      picture: request.body.picture,
      image: request.body.image,
    });

    await user.save();

    reply.send(user);
    console.log("User created sucessfully");
  } catch (error) {
    reply.status(500).send({ error: err.message });
  }
}

async function login(req, reply) {
  const { firstName, password } = req.body;
  const user = await User.findOne({ firstName });

  if (!user) {
    reply.status(401).send("Unauthorized");
    return;
  }
  const ismatch = await bcrypt.compare(password, user.password);

  if (!ismatch) {
    reply.status(401).send("Unauthorized password");
    return;
  }
  // const token = creatoken(JSON.stringify(user));

  reply.status(200).send(user);
}

async function updatUser(request, reply) {
  try {
    const user = await User.findByIdAndUpdate(request.params.id);
    user.firstName = request.body.firstName;
    user.lastName = request.body.lastName;
    user.email = request.body.email;
    user.password = request.body.password;
    user.work = request.body.work;
    user.ville = request.body.ville;
    user.number = request.body.number;
    user.picture = request.body.picture;

    await user.save();
    reply.send(user);
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
}

async function deleteUser(request, reply) {
  try {
    await User.deleteOne({ _id: request.params.id });
    reply.send();
  } catch (error) {
    reply.status(500).send({ error: err.message });
  }
}

module.exports = {
  getAllUser,
  getById,
  creatUser,
  updatUser,
  deleteUser,
  getimageById,
  login,
};
