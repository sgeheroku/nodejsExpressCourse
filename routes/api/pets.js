const uuid = require('uuid');
const express = require('express');
const router = express.Router();
var pets = require('../../pets');


//get all pets
router.get('/', (req, res)=> {
    res.json(pets);
});

//get single pet
router.get('/:id', (req, res)=> {
    const found = pets.some(pet => pet.id === parseInt(req.params.id));
    if(found){
        res.json(pets.filter(pet => pet.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({Error: `pet not found with id: ${req.params.id}`});
    }
    
});

//add new pet
router.post('/', (req, res)=>{
    //res.json(req.body);
    const newPet ={
        id: uuid.v4(),
        name: req.body.name
    };
    pets.push(newPet);
    //res.json(pets);
    res.json(newPet);
});

// update single pet
router.put('/:id', (req, res)=> {
    const found = pets.some(pet => pet.id === parseInt(req.params.id));
    if(found){
        const updPet = req.body;
        pets.forEach(pet=>{
            if(pet.id===parseInt(req.params.id)){
                pet.name = (updPet?updPet.name:pet.name);
                res.json({status:'success'});
            }
        });        
    }else{
        res.status(400).json({Error: `pet not found with id: ${req.params.id}`});
    }
    
});

// delete single pet
router.delete('/:id', (req, res)=> {
    const found = pets.some(pet => pet.id === parseInt(req.params.id));
    if(found){
        pets = pets.filter(pet => pet.id !== parseInt(req.params.id));
        res.json({status:'success'});
    }else{
        res.status(400).json({Error: `pet not found with id: ${req.params.id}`});
    }
    
});

module.exports =router;