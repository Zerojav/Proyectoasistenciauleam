const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
// Ruta para obtener los datos del archivo profesores.json
app.get('/profesores', (req, res) => {
  fs.readFile('profesores.json', 'utf8', (err, jsonString) => {
    if (err) {
      res.status(500).json({ error: 'Error al leer el archivo profesores.json' });
      return;
    }

    let profesores = [];
    try {
      profesores = JSON.parse(jsonString);
    } catch (error) {
      res.status(500).json({ error: 'Error al analizar el contenido del archivo profesores.json' });
      return;
    }
    
    res.json(profesores);
  });
});

// Ruta para guardar los datos en el archivo profesores.json
app.post('/profesores', (req, res) => {
  const data = req.body;

  fs.readFile('profesores.json', 'utf8', (err, jsonString) => {
    if (err) {
      res.status(500).json({ error: 'Error al leer el archivo profesores.json' });
      return;
    }

    let profesores = [];
    try {
      profesores = JSON.parse(jsonString);
    } catch (error) {
      res.status(500).json({ error: 'Error al analizar el contenido del archivo profesores.json' });
      return;
    }

    // Modificar el formato de la hora de entrada y salida
    const horaEntrada = data.horaEntrada;
    const horaSalida = data.horaSalida;
    const horaEyS = `${horaEntrada} - ${horaSalida}`;
    const nuevoProfesor = { ...data, horaEyS };

    profesores.push(data);

    fs.writeFile('profesores.json', JSON.stringify(profesores), 'utf8', (err) => {
      if (err) {
        res.status(500).json({ error: 'Error al guardar los datos en el archivo profesores.json' });
        return;
      }

      res.json({ success: true });
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});