const express = require('express');
const HandballTeam = require('../models/HandballTeam');

const router = express.Router();

// GET (todos los equipos)
router.get('/teams', (req, res, next) => {
  HandballTeam.find()                  // todos los docs de teams
    .select('_id nombre email equipo celular')  // como SELECT en SQL
    .sort('-updatedAt')        // ordena por modificacion descendente
    .exec((err, teams) => {
      if (err) return next(err);
      res.status(200).json({
        count: teams.length,
        teams: teams
      });
    });
});

// GET /teams/id
router.get('/:id', (req, res, next) => {
  HandballTeam.findById(req.params.id)
    .select('_id title text createdAt updatedAt')  // todo menos __v
    .exec((err, note) => {
      if (err) return next(err);
      if (!note) return res.status(404).json({ msg: 'Not found' });
      res.status(200).json({
        note: note,
        links: {
          update: {
            method: 'PUT',
            url: `${req.protocol}://${req.hostname}:3000/api/teams/${note._id}`
          },
          delete: {
            method: 'DELETE',
            url: `${req.protocol}://${req.hostname}:3000/api/teams/${note._id}`
          }
        }
      });
    });
});

// POST /teams
router.post('/teams', (req, res, next) => {
  const { name, email, equipo, celular } = req.body;

  console.log(name)

  const newTeam = new HandballTeam({
    nombre: name,
    email,
    equipo,
    celular
  });

  console.log(newTeam)
  newTeam.save((err, team) => {
    if (err) return next(err);
    res.status(201).json(team);
  });
});

// PUT /teams/id
router.put('/teams/:id', (req, res, next) => {
  const note = {
    title: req.body.title,
    text: req.body.text,
    updatedAt: Date.now()
  };
  const options = {
    new: true,
    omitUndefined: true
  };
  HandballTeam.findByIdAndUpdate(req.params.id, note, options).exec((err, note) => {
    if (err) return next(err);
    if (!note) return res.status(404).json({ msg: 'Not found' });
    res.status(200).json(note);
  });
});

// DELETE /teams/id
router.delete('/teams/:id', (req, res, next) => {
  HandballTeam.findByIdAndRemove(req.params.id).exec((err, note) => {
    if (err) return next(err);
    if (!note) return res.status(404).json({ msg: 'Not found' });
    res.status(200).json({ msg: 'Delete OK' });
  });
});

module.exports = router;