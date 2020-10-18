const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
        name: { type: String, required: true, default: "NoName" },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
});
    
const ContactModel = mongoose.model('Contact', contactsSchema);


module.exports = ContactModel