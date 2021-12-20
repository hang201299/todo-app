const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test_dev', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./todo.model');