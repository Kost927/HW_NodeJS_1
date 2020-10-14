const express = require("express");
const morgan = require("morgan");
const Joi = require("joi");
const cors = require("cors");
const dotenv = require("dotenv");
const { listContacts, getContactById, removeContact, addContact } = require("./contacts");

const app = express();
const PORT = 3000;

dotenv.config();

app.use(express.json());

app.get("/contacts", async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
});

app.get("/contacts/:contactId", async (req, res) => {
  const { contactId } = req.params;
    const contact = await getContactById(+contactId);
    // console.log('object', req.params)
  if (contact) {
    res.status(200).json(contact);
    return;
  }
  res.status(404).json("Not found");
});

app.post("/contacts", async (req, res) => {
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
        const contacts = await addContact(name, email, phone);
        res.status(201).json(contacts);
    } 
});

app.delete("/contacts/:contactId", async (req, res) => {
    const { contactId } = req.params;
    const id = await getContactById(contactId);
    if (id) {
        await removeContact(contactId);
        return res.status(204).json("contact deleted");
    }
    res.status(404).json("Not found");
})

// app.patch("/contacts/:contactId", async (req, res) => {
//     const { contactId } = req.params;
//     const contact = await getContactById(contactId);

//     if (contact && req.body) {
//         const updateContact = await updateContact(contactId, req.body);
//         return res.status(200).send(updateContact);
        
//     };
//     res.status(404).json('Not found')
// })

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
