const express = require('express')
const app = express()
const request = require('request');

app.get('/', (req, res) => {
    res.status(200).send('Hello World!')
})

app.get('/players', (req, res) => {
  console.log(req.params.id)
  request(`https://eurosportdigital.github.io/eurosport-node-developer-recruitment/headtohead.json`, function(error, response, body) {
    body = JSON.parse(body);
    res.json({ players: body.players.sort(function(a, b) {
    return parseFloat(a.id) - parseFloat(b.id);
      })
    });
  });
})

module.exports = app
