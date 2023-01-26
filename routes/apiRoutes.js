const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid')

const db = require('../db/db.json')
const router = require('express').Router();

router.get('/notes', (req, res) => {
    return res.json(db)
});

router.post('/notes', (req, res) => {
    req.body.id = uuidv4();
    const savedNote = db;
    const newNote = req.body;

    savedNote.push(newNote)
    console.log(savedNote);
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(savedNote))
    res.json(savedNote);
});

router.delete('/notes/:id', (req, res) => {
    const savedNote = db;
    // fs.readFile(path.join(__dirname, "../db/db.json"), 'utf8', (err, data) => {
    //     if(err) throw err;
    //     return res.json(JSON.parse(savedNote))
    // })

    const idParams = req.params.id;
    const deletedId = savedNote.filter( notes => notes.id !== idParams);

    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(deletedId))
    res.json(deletedId);
    
   
})

module.exports = router;