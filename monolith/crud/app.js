const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');

const port = 3000;
const app = express();
const dataFilePath = './data.json';

app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  optionsSuccessStatus:200
}));
app.use('/img', express.static(path.join(__dirname, 'img')));



// Leer datos desde el archivo JSON
const readData = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
}

// Guardar datos en el archivo JSON
const saveData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// Rutas CRUD para Powers
app.get('/powers', (req, res) => {
  const data = readData();
  console.log('Returning powers list');
  res.send(data.powers);
});

app.post('/powers', (req, res) => {
  const data = readData();
  const newPower = req.body;
  newPower.id = data.powers.length ? data.powers[data.powers.length - 1].id + 1 : 1;
  data.powers.push(newPower);
  saveData(data);
  res.status(201).send(newPower);
});

app.put('/powers/:id', (req, res) => {
  const data = readData();
  const powerId = parseInt(req.params.id);
  const powerIndex = data.powers.findIndex(p => p.id === powerId);
  
  if (powerIndex !== -1) {
    data.powers[powerIndex] = { ...data.powers[powerIndex], ...req.body };
    saveData(data);
    res.send(data.powers[powerIndex]);
  } else {
    res.status(404).send();
  }
});

app.delete('/powers/:id', (req, res) => {
  const data = readData();
  const powerId = parseInt(req.params.id);
  const powerIndex = data.powers.findIndex(p => p.id === powerId);

  if (powerIndex !== -1) {
    const removedPower = data.powers.splice(powerIndex, 1);
    saveData(data);
    res.send(removedPower);
  } else {
    res.status(404).send();
  }
});

// Rutas CRUD para Heroes
app.get('/heroes', (req, res) => {
  const data = readData();
  console.log('Returning heroes list');
  res.send(data.heroes);
});

app.post('/heroes', (req, res) => {
  const data = readData();
  const newHero = req.body;
  newHero.id = data.heroes.length ? data.heroes[data.heroes.length - 1].id + 1 : 1;
  data.heroes.push(newHero);
  saveData(data);
  res.status(201).send(newHero);
});

app.put('/heroes/:id', (req, res) => {
  const data = readData();
  const heroId = parseInt(req.params.id);
  const heroIndex = data.heroes.findIndex(h => h.id === heroId);
  
  if (heroIndex !== -1) {
    data.heroes[heroIndex] = { ...data.heroes[heroIndex], ...req.body };
    saveData(data);
    res.send(data.heroes[heroIndex]);
  } else {
    res.status(404).send();
  }
});

app.delete('/heroes/:id', (req, res) => {
  const data = readData();
  const heroId = parseInt(req.params.id);
  const heroIndex = data.heroes.findIndex(h => h.id === heroId);

  if (heroIndex !== -1) {
    const removedHero = data.heroes.splice(heroIndex, 1);
    saveData(data);
    res.send(removedHero);
  } else {
    res.status(404).send();
  }
});

// Rutas CRUD para Threats
app.get('/threats', (req, res) => {
  const data = readData();
  console.log('Returning threats list');
  res.send(data.threats);
});

app.post('/threats', (req, res) => {
  const data = readData();
  const newThreat = req.body;
  newThreat.id = data.threats.length ? data.threats[data.threats.length - 1].id + 1 : 1;
  data.threats.push(newThreat);
  saveData(data);
  res.status(201).send(newThreat);
});

app.put('/threats/:id', (req, res) => {
  const data = readData();
  const threatId = parseInt(req.params.id);
  const threatIndex = data.threats.findIndex(t => t.id === threatId);
  
  if (threatIndex !== -1) {
    data.threats[threatIndex] = { ...data.threats[threatIndex], ...req.body };
    saveData(data);
    res.send(data.threats[threatIndex]);
  } else {
    res.status(404).send();
  }
});

app.delete('/threats/:id', (req, res) => {
  const data = readData();
  const threatId = parseInt(req.params.id);
  const threatIndex = data.threats.findIndex(t => t.id === threatId);

  if (threatIndex !== -1) {
    const removedThreat = data.threats.splice(threatIndex, 1);
    saveData(data);
    res.send(removedThreat);
  } else {
    res.status(404).send();
  }
});

// Ruta para asignar un héroe a una amenaza
app.post('/assignment', (req, res) => {
  const data = readData();
  const heroId = parseInt(req.body.heroId);
  const threatId = parseInt(req.body.threatId);

  const hero = data.heroes.find(h => h.id === heroId);
  const threat = data.threats.find(t => t.id === threatId);

  if (hero && threat) {
    hero.busy = true;
    threat.assignedHero = heroId;
    saveData(data);
    res.status(202).send(threat);
  } else {
    res.status(400).send({ problem: 'Invalid hero or threat ID' });
  }
});

console.log(`Monolith service listening on port ${port}`);
app.listen(port);

console.log('Static files served from:', path.join(__dirname, 'img'));
