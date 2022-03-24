const inquirer = require("inquirer");
const axios = require("axios");
const url = "http://localhost:5000/api/v1/contacts/";
class Set {
  create = async () => {
    try {
      const firstName = await inquirer.prompt([
        {
          type: "input",
          name: "contact",
          message:
            "Enter the First Name of the contact that you want to create",
          validate: (answer) => {
            if (answer.length <= 2) {
              return "First Name must be longer than 2 characters!";
            }
          },
        },
      ]);
      const lastName = await inquirer.prompt([
        {
          type: "input",
          name: "contact",
          message: "Enter the Last Name of the contact that you want to create",
          validate: (answer) => {
            if (answer.length <= 2) {
              return "First Name must be longer than 2 characters!";
            }
          },
        },
      ]);
      const email = await inquirer.prompt([
        {
          type: "input",
          name: "contact",
          message: "Enter the email of the contact that you want to create",
          validate: (answer) => {
            const emailRegex =
              /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (!emailRegex.test(answer)) {
              return "You have to provide a valid email address!";
            }
            return true;
          },
        },
      ]);
      const phoneNumber = await inquirer.prompt([
        {
          type: "input",
          name: "contact",
          message:
            "Enter the Phone Number of the contact that you want to create",
          validate: (answer) => {
            const phoneRegex =
              /^[\+]?[(]?[355]{3}[6][7-9][)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,4}$/;
            if (!phoneRegex.test(answer)) {
              return "You have to provide a valid phone number!";
            }
          },
        },
      ]);

      const body = {
        firstName: firstName.contact,
        lastName: lastName.contact,
        email: email.contact,
        phoneNumber: phoneNumber.contact,
      };

      const data = axios.post(url + "create-contact", body).then(() => {
        console.log("User created");
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  delete = async () => {
    try {
      const id = await inquirer.prompt([
        {
          type: "input",
          name: "contact",
          message: "Enter the id of the contact that you want to delete",
        },
      ]);
      const data = axios
        .delete(url + `contact-by-id/${id.contact}`)
        .then(() => {
          console.log("Contact Deleted");
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  getbyid = async () => {
    try {
      const id = await inquirer.prompt([
        {
          type: "input",
          name: "contact",
          message: "Enter the id of the contact that you want to find",
        },
      ]);
      const data = await axios.get(url + `/contact-by-id/${id.contact}`);
      console.log(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  update = async () => {
    try {
      const id = await inquirer.prompt([
        {
          type: "input",
          name: "contact",
          message: "Enter the id of the contact that you want to update",
        },
      ]);
      const firstName = await inquirer.prompt([
        {
          type: "input",
          name: "contact",
          message:
            "Enter the First Name of the contact that you want to create",
          validate: (answer) => {
            if (answer.length <= 2) {
              return "First Name must be longer than 2 characters!";
            }
          },
        },
      ]);
      const lastName = await inquirer.prompt([
        {
          type: "input",
          name: "contact",
          message: "Enter the Last Name of the contact that you want to create",
          validate: (answer) => {
            if (answer.length <= 2) {
              return "First Name must be longer than 2 characters!";
            }
          },
        },
      ]);
      const email = await inquirer.prompt([
        {
          type: "input",
          name: "contact",
          message: "Enter the email of the contact that you want to create",
          validate: (answer) => {
            const emailRegex =
              /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (!emailRegex.test(answer)) {
              return "You have to provide a valid email address!";
            }
            return true;
          },
        },
      ]);
      const phoneNumber = await inquirer.prompt([
        {
          type: "input",
          name: "contact",
          message:
            "Enter the Phone Number of the contact that you want to create",
          validate: (answer) => {
            const phoneRegex =
              /^[\+]?[(]?[355]{3}[6][7-9][)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,4}$/;
            if (!phoneRegex.test(answer)) {
              return "You have to provide a valid phone number!";
            }
          },
        },
      ]);

      const data = await axios
        .patch(url + `update-contact/${id.contact}`, {
          firstName: firstName.contact,
          lastName: lastName.contact,
          email: email.contact,
          phoneNumber: phoneNumber.contact,
        })
        .then(() => {
          console.log(data.data);
        });
      // console.log(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = Set;
