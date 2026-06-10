import express from "express";

import {
  createCategories,
  getCategories,
  showCategories,
  updateCategories,
  deleteCategories,
} from "../controllers/categoryControllers.js";

const router = express.Router();

// GET semua category
router.get("/", getCategories);

// GET category berdasarkan id
router.get("/:id", showCategories);

// POST tambah category
router.post("/", createCategories);

// PUT update category
router.put("/:id", updateCategories);

// DELETE category
router.delete("/:id", deleteCategories);

export default router;