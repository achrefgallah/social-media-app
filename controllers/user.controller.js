const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id unknown :" + req.params.id);

  UserModel.findById(req.params.id, (err, data) => {
    if (!err) res.send(data);
    else console.log("Id unknown" + err);
  }).select("-password");
};

module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, data) => {
        if (!err) return res.send(data);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "successfuly deleted" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  // try {
  //   // add to the follower list
  //   await UserModel.findByIdAndUpdate(
  //     console.log(req.params.id),
  //     console.log(req.body.idToFollow),
  //     req.params.id,
  //     { $addToSet: { following: req.body.idToFollow } },
  //     { new: true, upsert: true },
  //     (err, data) => {
  //       if (!err) res.status(201).json(data);
  //       else return res.status(400).json(err);
  //     }
  //   );
  //   // add to following list
  //   await UserModel.findByIdAndUpdate(
  //     req.body.idToFollow,
  //     { $addToSet: { followers: req.params.id } },
  //     { new: true, upsert: true },
  //     (err, data) => {
  //       // if (!err) res.status(201).json(data);
  //       if (err) return res.status(400).json(err);
  //     }
  //   );
  // } catch (err) {
  //   return res.status(500).json({ message: err });
  // }

  UserModel.findByIdAndUpdate(
    req.params.id,
    {
      $push: { followers: req.body.idToFollow },
    },
    {
      new: true,
      upsert: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      UserModel.findByIdAndUpdate(
        req.body.idToFollow,
        {
          $push: { following: req.params.id },
        },
        { new: true }
      )
        .select("-password")
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
};

module.exports.unFollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  // try {
  //   await UserModel.findByIdAndUpdate(
  //     req.params.id,
  //     { $pull: { following: req.body.idToUnfollow } },
  //     { new: true, upsert: true },
  //     (err, data) => {
  //       if (!err) res.status(201).json(data);
  //       else return res.status(400).jsos(err);
  //     }
  //   );
  //   // remove to following list
  //   await UserModel.findByIdAndUpdate(
  //     req.body.idToUnfollow,
  //     { $pull: { followers: req.params.id } },
  //     { new: true, upsert: true },
  //     (err, data) => {
  //       // if (!err) res.status(201).json(data);
  //       if (err) return res.status(400).jsos(err);
  //     }
  //   );
  // } catch (err) {
  //   return res.status(500).json({ message: err });
  // }

  UserModel.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { followers: req.body.idToUnfollow },
    },
    {
      new: true,
      upsert: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      UserModel.findByIdAndUpdate(
        req.body.idToUnfollow,
        {
          $pull: { following: req.params.id },
        },
        { new: true }
      )
        .select("-password")
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
};
