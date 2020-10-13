const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const { listContacts, getContactById, removeContact, addContact } = require("./contacts");

const app = express();
const PORT = 3000;

dotenv.config()

app.use(express.json())

app.get('/contacts', async (req, res, next) => {
    const contacts = await listContacts();
    res.json(contacts)

})

app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(+contactId);
    if (contact) {
        res.status(200).json(contact);
        return;
    }
    res.status(404).json('Not found');
   
})

app.post('/contacts', async (req, res) => {
    const { name, email, phone } = req.body;
    if (typeof name === 'string' && name.length && typeof email === 'string' && email.length && phone.length) {
        const contacts = await addContact(name, email, phone);
        res.status(201).json(contacts);
        return;
    }
    res.status(400).json('missing required name field');
});

// app.delete('/:contactId', async (req, res) => {
//     const { contactId } = req.params;
//     const id = await getContactById(+contactId);
//     if (id) {
//         await removeContact(+contactId);
//         res.status(200).json("contact deleted");
//         return;
//     }
//     res.status(404).json("Not found");
// })

// app.patch('/:contactId', async (req, res) => {
//     const { contactId } = req.params;
//     const contact = await getContactById(+contactId);

//     if (contact && req.body) {
//         const updateContact = await updateContact(+contactId, req.body);
//         res.status(200).send(updateContact);
//         return;
//     };
//     res.status(404).json('Not found')
// })


app.listen(PORT, () => console.log(`server started on port ${PORT}`))
