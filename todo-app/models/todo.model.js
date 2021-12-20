const mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: 'This field is required.'
    }
});

mongoose.model('Todo', todoSchema);