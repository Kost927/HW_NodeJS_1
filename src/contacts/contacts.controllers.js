const errCather = require("../utils/errCatcher")
const ContactModel = require('./contscts.modal')


exports.getContacts = errCather(async (req, res, next) => {
  const contactsList = await ContactModel.find();
    return res.status(200).json(contactsList);
});

exports.getContactsById = errCather(async (req, res, next) => {
    const { contactId } = req.params;
  const contact = await ContactModel.findById(contactId);
    if (contact) {
      return res.status(200).json(contact);
    }
    res.status(404).json({ message: "Not found" });
});

exports.addContacts = errCather(async (req, res, next) => {
    const { name, email, phone } = req.body;

    if (name.length) {
      const contactsAdd = await ContactModel.create(req.body);
      return res.status(201).json(contactsAdd);
    }
    return res.status(400).json({ message: "missing required name field" });
});

exports.removeContact = errCather(async (req, res, next) => {
    const { contactId } = req.params;
  const id = await ContactModel.findById(contactId);
    if (id) {
      await ContactModel.deleteOne({ _id: contactId });
        return res.status(204).send();
    }
    return res.status(404).json({ message: "Not found" });
});

exports.updateContact = errCather(async (req, res, next) => {
    const { contactId } = req.params;
  const contact = await ContactModel.findById(contactId);

      if (!contact) {
    return res.status(404).json({ message: "Not found" });
    }
  const updatedContact = await ContactModel.findByIdAndUpdate(contactId, req.body);
    return res.status(200).send(updatedContact);
});
