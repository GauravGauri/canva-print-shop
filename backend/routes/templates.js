import express from 'express';
import DesignTemplate from '../models/DesignTemplate.js';

const router = express.Router();

// Save/Update template (Canvas JSON state)
router.put('/:id', async (req, res) => {
  try {
    // Upsert logic for simplicity
    const updatedTemplate = await DesignTemplate.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, upsert: true }
    );
    res.json(updatedTemplate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get template by ID
router.get('/:id', async (req, res) => {
  try {
    const template = await DesignTemplate.findById(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.json(template);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
