// handler functions that will be executed

const Todo = require("../models/todo");

const getTodos = async (req, res) => {
  // find all items from a mongoose Model method
  const items = await Todo.find({});
  // respond with an object that has a message and the items from the DB
  res.json({
    message: "all items",
    todos: items,
  });
};

const getTodo = async (req, res) => {
  // get id from ':id' param from the route (the :id in the route path)
  const { id } = req.params;
  // find todo with Model.findById()
  const todo = await Todo.findById(id);
  // response (res) with .json with the todo found
  res.status(200).json(todo);
};

const createTodo = async (req, res) => {
  // get the text from the req.body
  const { text } = req.body;

  // create new todo object with model
  const newTodo = new Todo({
    text,
  });
  // await for it to be saved
  await newTodo.save();

  // respond with json()
  res.status(201).json(newTodo);
};

const editTodo = async (req, res) => {
  // get id from ':id' param from the route
  const { id } = req.params;
  //get updated todo data from the request body
  const { text } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { text },
      { new: true },
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "todo not found" });
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
  // use mongoose model method findByIdAndUpdate
};

const deleteTodo = async (req, res) => {
  // get id from ':id' param from the route
  const { id } = req.params;

  try {
    // use mongoose model method findByIdAndDelete to delete the todo item
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      // If the todo with the given ID doesn't exist, return 404 Not Found
      return res.status(404).json({ message: "Todo not found" });
    }

    // Respond with a success message
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    // If an error occurs during the delete process, return 500 Internal Server Error
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createTodo,
  getTodos,
  editTodo,
  deleteTodo,
  getTodo,
};
