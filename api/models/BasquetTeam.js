const mongoose = require('mongoose');

const BasquetTeamSchema = new mongoose.Schema({
    nombre:{ type:String },
    email:{ type:String },
    equipo:{ type:String },
    celular:{ type: Number }
});

const BasquetTeam = mongoose.model('BasquetTeam', BasquetTeamSchema);

module.exports = BasquetTeam;