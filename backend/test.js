const mongoose = require('mongoose')

// const EmployeeSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String
// })


const dataSchema = new mongoose.Schema({
    end_year: String,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: Number,
    impact: String,
    added: String,
    published: String,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number
});

// const Data = mongoose.model('data', dataSchema);


const ProductSchema = new mongoose.Schema({}, { strict: false });
const Data = mongoose.model('Data',dataSchema, 'data');

const test = async () => {

    await mongoose.connect("mongodb+srv://admin:admin@cluster0.mfqbink.mongodb.net/Data?retryWrites=true&w=majority")
    const data =  await Data.find({}).limit(30);
    console.log(data)
}

test().catch(error => console.log(error)) 


// const EmployeeModel = mongoose.model("employees" ,EmployeeSchema)

// const data =  Data.find({}).limit(30);

// console.log(data)
