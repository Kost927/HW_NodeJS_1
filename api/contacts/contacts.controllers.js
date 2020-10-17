const contacts = require("./contacts");
const Joi = require("joi");

exports.getContacts = async (req, res, next) => {
    try {
        const contactsList = await contacts.listContacts();
       return res.status(200).json(contactsList);
    } catch (err) {
        next(err)
    }
};

exports.getContactsById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await contacts.getContactById(contactId);
        if (contact) {
            return res.status(200).json(contact);           
        }
        res.status(404).json({ message: "Not found" });
    } catch (err) {
        next(err)
    }
};


exports.addContacts = async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;
        const contactSchema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().required()
        });

        const { error } = contactSchema.validate(req.body);
        if (error) {
            return res.status(400).json('missing required name field');
            
        }  
        const contactsAdd = await contacts.addContact(name, email, phone);
        return res.status(201).json(contactsAdd);
        
    } catch (err) {
        next(err)
    }
};


exports.removeContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const id = await contacts.getContactById(contactId);
        if (id) {
            await contacts.removeContact(contactId);
            return res.status(204).json("contact deleted");
        }
        return res.status(404).json({ message: "Not found"});
    } catch (err) {
        next(err)
    }
};

exports.updateContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await contacts.getContactById(contactId);
        const updatedContactSchema = Joi.object({
            name: Joi.string(),
            email: Joi.string().email(),
            phone: Joi.string(),
        });

        const { error } = updatedContactSchema.validate(req.body);

        if (contact && error ) {
           return res.status(404).json('Not found')
        } 
        const updatedContact = await contacts.updateContact(contactId, req.body);
        return res.status(200).send(updatedContact);
        
    } catch (err) {
        next(err)
    }
}



