const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Todo = mongoose.model('Todo');

router.get('/', (req, res) => {
    res.render("todo/addOrEdit", {
        viewTitle: "Insert Todo"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var todo = new Todo();
    todo.task = req.body.task;
    todo.save((err, doc) => {
        if (!err)
            res.redirect('todo/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("todo/addOrEdit", {
                    viewTitle: "Insert Task",
                    todo: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Todo.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('todo/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("todo/addOrEdit", {
                    viewTitle: 'Update todo',
                    todo: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Todo.find((err, docs) => {
        if (!err) {
            res.render("todo/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving todo list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        console.log(err.errors[field].path)
        switch (err.errors[field].path) {
            case 'task':
                body['fullNameError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Todo.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("todo/addOrEdit", {
                viewTitle: "Update todo",
                todo: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Todo.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/todo/list');
        }
        else { console.log('Error in todo delete :' + err); }
    });
});

module.exports = router;