const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const { promises: fsPromise } = fs;

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  // ...твой код
  return JSON.parse(await fsPromise.readFile(contactsPath, "utf-8"));
}

async function getContactById(contactId) {
  // ...твой код
  const result = await listContacts();
  const idUser = result.find(user => user.id === contactId);

  return idUser;
}

async function removeContact(contactId) {
  // ...твой код
  const data = await listContacts();
  const idUser = data.filter(user => user.id !== contactId);

  return idUser;
}

async function addContact(name, email, phone) {
  // ...твой код
  const data = await listContacts();
  const id = uuidv4();
  const addedUser = { id, name, email, phone };

  const updatedList = [...data, addedUser];

  await fsPromise.writeFile(contactsPath, JSON.stringify(updatedList), err => {
    if (err) throw err;
  });
  return updatedList;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
