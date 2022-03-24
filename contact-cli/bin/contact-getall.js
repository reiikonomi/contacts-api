const axios = require("axios");

const getAllContacts = async () => {
  const data = await axios.get(
    `http://localhost:5000/api/v1/contacts/get-all-contacts/`
  );

  console.log(data.data);
};

getAllContacts();
