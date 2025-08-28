const express = require("express");
const Recipe = require("../models/Recipe");
const Comment = require("../models/Comment");
const { authRequired } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { q, ingredient, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (q) filter.title = { $regex: q, $options: "i" };
    if (ingredient) filter.ingredients = { $in: [{ $regex: ingredient, $options: "i" }] };
    const items = await Recipe.find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .lean();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Recipe.findById(req.params.id).lean();
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", authRequired, async (req, res) => {
  try {
    const { title, description = "", ingredients = [], steps = [] } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });
    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
      steps,
      author: req.user.id,
    });
    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", authRequired, async (req, res) => {
  try {
    const update = (({ title, description, ingredients, steps }) => ({ title, description, ingredients, steps }))(req.body);
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!recipe) return res.status(404).json({ message: "Not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", authRequired, async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Not found" });
    await Comment.deleteMany({ recipe: recipe._id });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/:id/like", authRequired, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Not found" });
    const userId = req.user.id;
    const liked = recipe.likes.some((u) => String(u) === String(userId));
    if (liked) {
      recipe.likes = recipe.likes.filter((u) => String(u) !== String(userId));
    } else {
      recipe.likes.push(userId);
    }
    await recipe.save();
    res.json({ likes: recipe.likes.length, liked: !liked });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ recipe: req.params.id }).sort({ createdAt: -1 }).lean();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/:id/comments", authRequired, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });
    const comment = await Comment.create({ recipe: req.params.id, author: req.user.id, text });
    await Recipe.findByIdAndUpdate(req.params.id, { $inc: { commentsCount: 1 } });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;