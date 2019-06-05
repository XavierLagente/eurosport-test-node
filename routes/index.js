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

app.get('/players/:id', (req, res) => {
  request(`https://eurosportdigital.github.io/eurosport-node-developer-recruitment/headtohead.json`, function(error, response, body) {
    body = JSON.parse(body);
    find = -1
    for (var i = 0; i < body.players.length; i++){
  // look for the entry with a matching `code` value
      if (body.players[i].id == req.params.id){
          find = i
        }
      }
    if(find > -1 ){
      res.json({ player: body.players[find]})
    }else{
        res.status(404).send('player not Found')
    }

  });
})

module.exports = app
