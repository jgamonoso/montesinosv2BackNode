const express = require('express');
const router = express.Router();
const gestorNoticias = require('../gestores/gestornoticias');

router.get('/', async (req, res) => {
  try {
    const pagina = req.query.pagina || 1;
    const pkLiga = req.query.pkLiga || 1;
    const noticias = await gestorNoticias.obtenerNoticias(pagina, pkLiga);
    res.json(noticias);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las noticias' });
  }
});

module.exports = router;
