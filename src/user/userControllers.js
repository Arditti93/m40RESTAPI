const User = require("./userModel");
const jwt = require("jsonwebtoken");

exports.addUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = newUser.generateAuthToken();
    console.log(token);
    res.status(200).send({ user: newUser.username, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.listUsers = async (req, res) => {
  try {
      const listUsers = await User.find({});
      const usernames = listUsers.map((users) => {
          return users
      })
      res.status(200).send({users: usernames})
  } catch (error) {
      console.log(error)
      res.status(500).send({ error: error.message });
  }
}  


exports.login = async (req, res) => {
  try {
    if (req.user) {
      console.log(req.user)
      console.log('IN REQ.USER')
      res.status(200).send({ username: req.user.username });
    } else {
      const user = await User.findByCredentials(
        req.body.username,
        req.body.password
      );
      const token = user.generateAuthToken();
      res.status(200).send({ username: user.username, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    console.log(req.body.key)
    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, {
        $set: { [req.body.key]: req.body.value },
      });
      const user = await User.findById(req.user._id);
      console.log(user)
      res.status(200).send({ user: user.username });
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if (req.user) {
      await User.findByIdAndDelete(req.user._id);
      res.status(200).send({ message: "Successfully deleted user" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.findUser = async(req, res) =>{
  try{
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded._id);
    res.status(200).send({ username: user  });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
