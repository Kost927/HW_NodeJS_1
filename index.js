const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Joi = require("joi");
const dotenv = require("dotenv");
const { listContacts, getContactById, removeContact, addContact } = require("./contacts");

const app = express();
const PORT = 3000;

dotenv.config()

app.get('/contacts', async (req, res) => {
    const contacts = await listContacts();
    res.json(contacts)

})

contactsRouter.get('/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(+contactId);
    if (contact) {
        res.json(contact);
        return;
    }
    res.status(404).json('Not found');
})

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
