const ParkModel = require('../models/park')
const PersonModel = require('../models/person')

async function addAttendee(parkId, personId) {
    const park = await ParkModel.findOne({ _id: parkId })
    const person = await PersonModel.findOne({ _id: personId })

    park.attendees.push(person)

    await park.save()

    return park
}

async function findAll() {
    return ParkModel.find().populate('attendees')
}

async function add(person) {
    return ParkModel.create(person)
}

async function del(_id) {
    return ParkModel.remove({ _id })
}

async function find(_id) {
    return ParkModel.findOne({ _id }).populate('attendees')
}

module.exports = {
    addAttendee,
    findAll,
    find,
    add,
    del
}
