const express = require('express')
const bodyParser = require('body-parser')

const PersonService = require('./services/person-service')
const ParkService = require('./services/park-service')

require('./mongo-connection')

const app = express()

app.set('view engine', 'pug')
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('index')
})

// PERSON ENDPOINTs

app.get('/person/all', async (req, res) => {
  const people = await PersonService.findAll()
  res.render('people', { people })
})

app.get('/person/:id', async (req, res) => {
  const user = await PersonService.find(req.params.id)
  res.render('data', { data: user })
})

app.post('/person', async (req, res) => {
  const user = await PersonService.add(req.body)
  res.send(user)
})

app.delete('/person/:id', async (req, res) => {
  const user = await PersonService.del(req.params.id)
  res.send(user)
})

// Park ENDPOINTS

app.get('/park/all', async (req, res) => {
  const parks = await ParkService.findAll()
  res.render('data', { data: parks })
})

app.get('/park/:id', async (req, res) => {
  const park = await ParkService.find(req.params.id)
  res.render('data', { data: park })
})

app.post('/park', async (req, res) => {
  const park = await ParkService.add(req.body)
  res.send(park)
})

app.post('/park/:id/addAttendee', async (req, res) => {
  const park = await ParkService.addAttendee(req.params.id, req.body.personId)
  res.send(park)
})

app.listen(3000, () => {
  console.log('Server listening')
})
