const mongoose  = require('mongoose');
const Data = require('../models/Data');


exports.getData = async (req, res) => {
    mongoose.connect(process.env.MONGODB_URI_DATA);
    console.log('get data');
    try {
        const data = await Data.find({}).limit(30);
        // mongoose.disconnect()
        console.log(data)
        res.json(data);
        mongoose.disconnect()
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addData = async (req, res) => {
    mongoose.connect(process.env.MONGODB_URI_DATA);
    try {
        const newData = new Data(req.body);
        const savedData = await newData.save();
        mongoose.disconnect()
        res.status(201).json(savedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};