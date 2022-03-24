#!/usr/bin/env node

const program = require("commander");

program
  .version("1.1.1")
  .command("getall", "get all contacts")
  .command("set", "delete, getbyid, update or create a contact")
  .parse(process.argv);
