const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === String(contactId));
  return contact ?? null;
}

async function addContact(name, email, phone) {
  if (!name || !email || !phone) {
    return null;
  }
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };

  contacts.push(newContact);
  updateContacts(contacts);
  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === String(contactId));
  if (idx === -1) return null;

  const [removedContact] = contacts.splice(idx, 1);
  updateContacts(contacts);
  return removedContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
