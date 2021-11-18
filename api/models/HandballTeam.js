const mongoose = require('mongoose');

const HandballTeamSchema = new mongoose.Schema({
    nombre:{ type:String },
    email:{ type:String },
    equipo:{ type:String },
    celular:{ type: Number }
});

const HandballTeam = mongoose.model('HandballTeam', HandballTeamSchema);

module.exports = HandballTeam;