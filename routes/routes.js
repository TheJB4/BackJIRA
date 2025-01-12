const express = require('express');
const router = express.Router();
const { createEpic } = require('../controllers/epicController');
const { createIssue } = require('../controllers/issueController');

// Ruta para crear una nueva epic
router.post('/epics', async (req, res, next) => {
  try {
    const { summary, description } = req.body;
    const epic = await createEpic(summary, description);
    res.status(201).json(epic);
  } catch (error) {
    next(error); 
  }
});

// Ruta para crear una nueva issue
router.post('/issues', async (req, res, next) => {
    try {
      const { summary, description, issueType, labels } = req.body; // Asegúrate de obtener también issueType del cuerpo de la solicitud
      const issue = await createIssue(summary, description, issueType, labels); // Asegúrate de pasar issueType como argumento a createIssue
      res.status(201).json(issue);
    } catch (error) {
      next(error); 
    }
  });
  

router.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' });
});

module.exports = router;
