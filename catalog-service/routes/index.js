const express = require("express");

const CatalogService = require("../lib/CatalogService");

const router = express.Router();

router.get("/items", async (req, res) => {
  try {
    const items = await CatalogService.getAll();
    return res.json(items);
  } catch (error) {
    console.error("Error getting items:", error);
    return res.status(500).json({ error: "Failed to get items" });
  }
});

router.get("/items/:itemId", async (req, res) => {
  try {
    const item = await CatalogService.getOne(req.params.itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    return res.json(item);
  } catch (error) {
    console.error("Error getting item:", error);
    return res.status(500).json({ error: "Failed to get item" });
  }
});

router.post("/items", async (req, res) => {
  try {
    const newItem = await CatalogService.create(req.body);
    return res.json(newItem);
  } catch (error) {
    console.error("Error creating item:", error);
    return res.status(500).json({ error: "Failed to create item" });
  }
});

router.put("/items/:itemId", async (req, res) => {
  try {
    const updatedItem = await CatalogService.update(
      req.params.itemId,
      req.body
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    return res.json(updatedItem);
  } catch (error) {
    console.error("Error creating item:", error);
    return res.status(500).json({ error: "Failed to create item" });
  }
});

router.delete("/items/:itemId", async (req, res) => {
  try {
    const deletionResult = await CatalogService.remove(req.params.itemId);

    if (deletionResult.deletedCount === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting item:", error);
    return res.status(500).json({ error: "Failed to delete item" });
  }
});

module.exports = router;
