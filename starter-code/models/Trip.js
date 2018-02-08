const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId},
    user_name: { type: String },
    destination: { type: String},
    description: {type: String},
    pic_path: {type: String}
}, {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    });

const Trip = mongoose.model('Trip', TripSchema);
module.exports = Trip
