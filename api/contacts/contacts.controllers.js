const contacts = require("../../contacts");
const Joi = require("joi");

exports.getContacts = async (req, res, next) => {
    try {
        const contactsList = await contacts.listContacts();
        res.status(200).json(contactsList);
    } catch (err) {
        next(err)
    }
};

exports.getContactsById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await contacts.getContactById(contactId);
        if (contact) {
            res.status(200).json(contact);
            return;
        }
        res.status(404).json("Not found");
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
            res.status(400).json('missing required name field');
            return;
        } else {
            const contactsAdd = await contacts.addContact(name, email, phone);
            res.status(201).json(contactsAdd);
        }
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
        res.status(404).json("Not found");
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

        if (contact & error ) {
            res.status(404).json('Not found')
        } else {
            const updatedContact = await contacts.updateContact(contactId, req.body);
            res.status(200).send(updatedContact);
            return;
        }
        
    } catch (err) {
        next(err)
    }
}



