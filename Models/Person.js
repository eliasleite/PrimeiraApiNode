const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    name: String,
    salary: Number,
    dateOfBirth: Date,
    approved: Boolean,
})

module.exports = Person