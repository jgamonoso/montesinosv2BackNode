const db = require('../db');
const crypto = require('crypto');

async function validarManager(user, pass) {
  const passwordHash = crypto.createHash('md5').update(pass).digest('hex');
  const sql = `SELECT * FROM manager WHERE manager_login = ? AND manager_password = ?`;

  return new Promise((resolve, reject) => {
    db.query(sql, [user, passwordHash], (err, result) => {
      if (err) reject(err);
      resolve(result.length > 0);
    });
  });
}

async function validarLigaManager(user, pass) {
  const passwordHash = crypto.createHash('md5').update(pass).digest('hex');
  const sql = `SELECT fk_equipo_liga FROM manager ma, equipo eq WHERE ma.manager_login = ? AND ma.manager_password = ? AND ma.pk_manager = eq.fk_equipo_manager`;

  return new Promise((resolve, reject) => {
    db.query(sql, [user, passwordHash], (err, result) => {
      if (err) reject(err);
      if (result.length > 0) {
        resolve(result[0].fk_equipo_liga);
      } else {
        resolve(null);
      }
    });
  });
}

module.exports = { validarManager, validarLigaManager };
