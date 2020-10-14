const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const { promises: fsPromise } = fs;

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  // ...твой код
  try {
    return JSON.parse(await fsPromise.readFile(contactsPath, "utf-8"));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function getContactById(contactId) {
  // ...твой код
  try {
    const result = await listContacts();
    const idUser = result.find(user => user.id === contactId);
    return idUser;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function removeContact(contactId) {
  // ...твой код
  try {
    const data = await listContacts();
    const removedContact = data.filter(user => user.id !== contactId);
    await fsPromise.writeFile(contactsPath, JSON.stringify(removedContact));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function addContact(name, email, phone) {
  // ...твой код
  try {
    const data = await listContacts();
    const id = uuidv4();
    const addedUser = { id, name, email, phone };
    const updatedList = [...data, addedUser];
    await fsPromise.writeFile(contactsPath, JSON.stringify(updatedList))
    return updatedList;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
