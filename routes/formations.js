import express from 'express';
import {
  getFormations,
  getFormationById,
  addFormation,
  updateFormation,
  deleteFormation
} from '../data/formations.js';

const router = express.Router();

// GET all formations
router.get('/formations', (req, res) => {
  const formations = getFormations();
  res.json(formations);
});

// GET formation by ID
router.get('/formations/:id', (req, res) => {
  const formation = getFormationById(req.params.id);
  if (!formation) {
    return res.status(404).json({ message: 'Formation non trouvée' });
  }
  res.json(formation);
});

// POST new formation
router.post('/formations', (req, res) => {
  const { title, description, duration, price, level, category, image, details } = req.body;
  
  if (!title || !description) {
    return res.status(400).json({ message: 'Le titre et la description sont requis' });
  }
  
  const newFormation = addFormation({
    title,
    description,
    duration,
    price: parseFloat(price) || 0,
    level,
    category,
    image: image || 'img/default-formation.jpg',
    details
  });
  
  res.status(201).json(newFormation);
});

// PUT update formation
router.put('/formations/:id', (req, res) => {
  const updatedFormation = updateFormation(req.params.id, req.body);
  if (!updatedFormation) {
    return res.status(404).json({ message: 'Formation non trouvée' });
  }
  res.json(updatedFormation);
});

// DELETE formation
router.delete('/formations/:id', (req, res) => {
  const deletedFormation = deleteFormation(req.params.id);
  if (!deletedFormation) {
    return res.status(404).json({ message: 'Formation non trouvée' });
  }
  res.json({ message: 'Formation supprimée avec succès', formation: deletedFormation });
});

export default router;