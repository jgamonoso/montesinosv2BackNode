const db = require('../db');
const Noticia = require('../objetos/noticia');

async function obtenerNoticias(pagina, pkLiga) {
  const listaFechas = obtenerListaFechas(pagina);
  const noticias = {};

  for (const fecha of listaFechas) {
    const listaNoticias = await obtenerNoticiasDia(fecha, pkLiga);
    if (listaNoticias) {
      noticias[fecha.toISOString().slice(0, 10)] = listaNoticias;
    }
  }

  return noticias;
}

function obtenerListaFechas(pagina) {
  const listaFechas = [];

  const fechaIni = new Date();
  fechaIni.setMonth(fechaIni.getMonth() - (pagina - 1));

  for (let i = 0; i < 7; i++) {
    const fecha = new Date(fechaIni);
    fecha.setDate(fecha.getDate() - i);
    listaFechas.push(fecha);
  }

  return listaFechas;
}

async function obtenerNoticiasDia(dia, pkLiga) {
  const fecha = dia.toISOString().slice(0, 10).replace(/-/g, '');
  const sql = `SELECT * FROM noticia WHERE fk_noticia_liga = ? AND noticia_fecha = ? ORDER BY noticia_prioridad ASC, pk_noticia DESC`;

  return new Promise((resolve, reject) => {
    db.query(sql, [pkLiga, fecha], (err, result) => {
      if (err) reject(err);

      const listaNoticias = result.map((row) => {
        const noticia = new Noticia();
        noticia.pkNoticia = row.pk_noticia;
        noticia.fkLiga = row.fk_noticia_liga;
        noticia.texto = row.noticia_texto;
        noticia.fecha = row.noticia_fecha;
        noticia.hora = row.noticia_hora;
        noticia.prioridad = row.noticia_prioridad;
        return noticia;
      });

      resolve(listaNoticias.length > 0 ? listaNoticias : null);
    });
  });
}

module.exports = { obtenerNoticias };
