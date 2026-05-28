const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

projectSchema.pre('findByIdAndDelete', async function(next) {
    const Task = require('./Task');
    await Task.deleteMany({ project: this.getFilter()._id });
    next();
});

module.exports = model("Project", projectSchema);
