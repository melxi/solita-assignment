const { names } = require("../names.json");
const namesRouter = require("express").Router();

namesRouter.get("/", (req, res, next) => {
  const { sort } = req.query;
  try {
    if (Object.keys(req.query).length === 0) {
      return res.status(200).json(names);
    } else {
      const sortedNames = names.sort((a, b) => {
        if (sort === "popular") {
          return a.amount > b.amount ? -1 : Number(a.amount < b.amount);
        } else if (sort === "alphabetical") {
          return a.name < b.name ? -1 : Number(a.name > b.name);
        }        
      });
      return res.status(200).json(sortedNames);
    }
  } catch (err) {
    next(err);
  }
});

namesRouter.get("/count", (req, res, next) => {
  try {
    const count = names.reduce((acc, curr) => {
      return acc += curr.amount;
    }, 0)

    res.status(200).json(count);
  } catch (err) {
    next(err);
  }
});

namesRouter.get("/:name", (req, res, next) => {
  try {
    const name = names.filter(
      (name) => name.name.toLowerCase() === req.params.name.toLowerCase()
    );

    res.status(200).json(name);
  } catch (err) {
    next(err);
  }
});

module.exports = namesRouter;
