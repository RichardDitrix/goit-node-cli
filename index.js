const { program } = require("commander");
const contacts = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

const argv = program.parse(process.argv).opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        console.table(await contacts.listContacts());
        break;
      case "get":
        const contact = await contacts.getContactById(id);
        console.log(contact);
        break;
      case "add":
        const newContact = await contacts.addContact(name, email, phone);
     
        console.log(newContact);
        break;
      case "remove":
        const removedContact = await contacts.removeContact(id);
       
        console.log(removedContact);
        break;
      default:
        throw new Error(`Unknown action type`);
    }
  } catch (error) {
    console.warn(`\x1B[31m${error.message}`);
  }
}

invokeAction(argv);
