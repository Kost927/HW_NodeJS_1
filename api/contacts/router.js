const { Router } = require("express");
const ContactsController = require("./contacts.controllers");

const contactsRouter = Router();


contactsRouter.get("/", ContactsController.getContacts);
contactsRouter.get("/:contactId", ContactsController.getContactsById);

contactsRouter.post("/", ContactsController.addContacts);


contactsRouter.delete("/:contactId", ContactsController.removeContact);

contactsRouter.patch("/:contactId", ContactsController.updateContact);



module.exports = contactsRouter;