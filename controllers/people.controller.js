const model = require("../models/friends.model");

function getPeople (req, res) {
    return res.json(model);
}

function getPerson (req, res) {
    const personID = Number(req.params.personID);
    const person = model[personID];
    if(person) {
        res.status(200).json(person);
    }else {
        res.status(404).json({
            error: "Person does not exist..."
        });
    }
}

function postPeople(req, res) {

    if(!req.body.name) 
    {
      return res.status(400).json({ error: "Friend name seems to be missing."});
    }
    else
    {
        const newPerson = {
            id: model.length,
            name: req.body.name
        }
        model.push(newPerson);
    
        return res.json(newPerson);
    }
}

module.exports = {
    getPeople,
    getPerson,
    postPeople,
}