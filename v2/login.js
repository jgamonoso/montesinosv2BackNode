const express = require('express');
const router = express.Router();
const gestorManager = require('../gestores/gestormanager');

router.post('/', async (req, res) => {
  try {
    const login = req.body.login;
    const password = req.body.password;
    const validado = await gestorManager.validarManager(login, password);

    if (validado) {
      const validadoLiga = await gestorManager.validarLigaManager(login, password);
      res.json({
        status: 'ok',
        manager: login,
        liga: validadoLiga,
      });
    } else {
      res.status(401).json({
        status: 'error',
        message: 'Login error',
      });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error en el proceso de inicio de sesión' });
  }
});

module.exports = router;
