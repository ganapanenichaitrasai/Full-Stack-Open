const mongoose = require("mongoose")

if (process.argv.length === 3){
    const password = process.argv[2]

    const url = `mongodb+srv://ganapanenichaitrasai:${password}@cluster0.xwicl.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`

    mongoose.set('strictQuery',false)

    mongoose.connect(url)

    const Phonebook = new mongoose.Schema({
        name: String,
        number: String
    })

    const Phonenumber = mongoose.model('contacts',Phonebook)

    console.log("phonebook:")
    Phonenumber.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}
else{

const password = process.argv[2]

const url = `mongodb+srv://ganapanenichaitrasai:${password}@cluster0.xwicl.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const Phonebook = new mongoose.Schema({
    name: String,
    number: String
})

const Phonenumber = mongoose.model('Contact',Phonebook)

const data = new Phonenumber({
    name: process.argv[3],
    number: process.argv[4]
})

data.save().then(result => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
})
}