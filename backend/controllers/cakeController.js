import cakeModel from "../models/CakeModel.js";
import fs from 'fs';

// add cakes
const addCake = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const cake = new cakeModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await cake.save();
        res.json({ success: true, message: "Cake added" })
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: "Error" })
    }
}

// all cakes list
const listCake = async (req, res) => {
    try {
        const cakes = await cakeModel.find({});
        res.json({ success: true, data: cakes })
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: "Error" })
    }
}

// remove cake item
const removeCake = async (req, res) => {
    try {
        const cake = await cakeModel.findById(req.body.id);
        fs.unlink(`uploads/${cake.image}`, () => { })  //to delete from uploads folder
        await cakeModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Cake removed" })
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: "Error" })
    }
}

export { addCake, listCake, removeCake }