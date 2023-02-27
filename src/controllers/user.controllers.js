const catchError = require("../utils/catchError");
const User = require("../models/User");

const getAll = catchError(async (req, res) => {
  const users = await User.findAll();
  return res.json(users);
});

const createUser = catchError(async (req, res) => {
  const { first_name, last_name, email, password, birthday } = req.body;
  const userCreate = await User.create({
    first_name,
    last_name,
    email,
    password,
    birthday,
  });
  return res.status(201).json(userCreate);
});

const getOneUser = catchError(async (req, res) => {
  const { id } = req.params;
  const oneUser = await User.findByPk(id);
  if (!oneUser) return res.status(404).json({ message: "User not found" });
  return res.json(oneUser);
});

const removeUser = catchError(async (req, res) => {
  const { id } = req.params;
  const userDeleted = await User.destroy({ where: { id } });
  if (userDeleted === 0)
    return res.status(404).json({ message: "User not found" });
  return res.sendStatus(204);
});

const updateUser = catchError(async (req, res) => {
  const { first_name, last_name, email, password, birthday } = req.body;
  const { id } = req.params;
  const userUpdate = await User.update(
    {
      first_name,
      last_name,
      email,
      password,
      birthday,
    },
    { where: { id }, returning: true }
  );
  if (userUpdate[0] === 0)
    return res.status(404).json({ message: "User not found" });
  return res.json(userUpdate[1][0]);
});

module.exports = {
  getAll,
  createUser,
  getOneUser,
  removeUser,
  updateUser,
};
