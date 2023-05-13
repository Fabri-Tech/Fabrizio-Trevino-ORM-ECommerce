const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Product],
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a specific category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [Product],
    });
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [affectedRows] = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedCategory) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
