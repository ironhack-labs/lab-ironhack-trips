const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    user_name: String,
    destination: String,
    description: String,
    pic_path: String
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const Trip = mongoose.model("User", tripSchema);

module.exports = Trip;