const express = require('express');
const router = express.Router();

//todos los renders van a la carpeta views esa es su raiz
router.get('/', (req,res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.redirect('/');
});

//Hay que hacerlos siempre!
module.exports = router;
