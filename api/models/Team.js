const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    nombre:{ type:String },
    email:{ type:String },
    equipo:{ type:String },
    celular:{ type: Number }
});

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;