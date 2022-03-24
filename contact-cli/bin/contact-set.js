const program = require("commander");
const Set = require("../commands/Set");

const set = new Set();

program.command("delete").description("Delete a contact").action(set.delete);
program
  .command("getbyid")
  .description("get a contact by id")
  .action(set.getbyid);
program.command("create").description("create a contact").action(set.create);

program.command("update").description("update a contact").action(set.update);
program.parse(process.argv);
