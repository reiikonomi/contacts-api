const Contact = require("../model/contact");
const fs = require("fs");
const path = require("path");
const format = require("date-format");

// creating contact

const createContact = async (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.body;

  // regex expression to validate email
  const regexLiteralEmail =
    /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  // regex expression to validate albanian phone numbers
  const regexLiteralPhone =
    /^[\+]?[(]?[355]{3}[6][7-9][)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,4}$/;

  if (regexLiteralEmail.test(email) == false) {
    res.json({ status: "error", message: "Invalid email!" });
  } else if (firstName.length <= 2) {
    res.json({
      status: "error",
      message: "First Name must be longer than 2 characters!",
    });
  } else if (lastName.length <= 2) {
    res.json({
      status: "error",
      message: "Last Name must be longer than 2 characters!",
    });
  } else if (regexLiteralPhone.test(phoneNumber) == false) {
    res.json({ status: "error", message: "Invalid phone number!" });
  } else if (!firstName || !lastName || !phoneNumber) {
    res.json({ status: "error", message: "Please fill out all the fields" });
  } else if (!email || regexLiteralPhone.test(phoneNumber) == true) {
    try {
      const response = await Contact.create({
        firstName,
        lastName,
        email,
        phoneNumber,
      });

      console.log("Contact created successfully: ", response);
      res.json({ status: "ok", data: response });
    } catch (error) {
      if (error.code === 11000) {
        // duplicate key
        return res.json({ status: "error", error: "Id already in use" });
      }
      //saves error logs
      const date = format("yyyy-MM-dd", new Date());
      fs.appendFile(
        path.join(__dirname, `logs`, `${date}_error.log`),
        `\n${error}`,
        (error) => {
          if (error) throw error;
          console.log("Error Log saved");
        }
      );
      throw error;
    }
  } else {
    res.json({
      status: "error",
      message: "Something wrong happened, please try again!",
    });
  }
};

//getting all contacts

const getAllContacts = async (req, res) => {
  const { firstName, sort, fields, lastName, phoneNumber, email } = req.query;
  const queryObject = {};

  try {
    if (firstName) {
      queryObject.firstName = { $regex: firstName, $options: "i" };
    }
    if (lastName) {
      queryObject.lastName = { $regex: lastName, $options: "i" };
    }
    if (phoneNumber) {
      queryObject.phoneNumber = { $regex: phoneNumber, $options: "i" };
    }
    if (email) {
      queryObject.email = { $regex: email, $options: "i" };
    }

    console.log(queryObject);
    let result = Contact.find(queryObject);
    // sorts the products based on input
    if (sort) {
      const sortList = sort.split(",").join(" ");
      result = result.sort(sortList);
    } else {
      result = result.sort("createdAt");
    }
    // shows only the parameters that are given from the input ex. firstName and lastName
    if (fields) {
      const fieldsList = fields.split(",").join(" ");
      result = result.select(fieldsList);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    // get total documents in the Contacts collection
    const count = await Contact.countDocuments();

    const contacts = await result;

    res.status(200).json({
      contacts,
      totalCount: contacts.length,
      pageNumber: page,
      totalPages: Math.ceil(count / limit),
      hasNextPage: Math.ceil(count / limit) - page >= 1 ? true : false,
      hasPreviousPage: page > 1 ? true : false,
    });
  } catch (error) {
    // saves error logs
    const date = format("yyyy-MM-dd", new Date());
    fs.appendFile(
      path.join(__dirname, `logs`, `${date}_error.log`),
      `\n${error}`,
      (error) => {
        if (error) throw error;
        console.log("Error Log saved");
      }
    );
    throw error;
  }
};

//finding contacts by id

const findContactById = async (req, res) => {
  const { id: contactId } = req.params;
  try {
    const contact = await Contact.findOne({ _id: contactId });
    if (!contact) {
      return res
        .status(404)
        .json({ message: `Contact with id ${contactId} does not exist` });
    }
    res.status(200).json({ contact });
  } catch (error) {
    const date = format("yyyy-MM-dd", new Date());
    fs.appendFile(
      path.join(__dirname, `logs`, `${date}_error.log`),
      `\n${error}`,
      (error) => {
        if (error) throw error;
        console.log("Error Log saved");
      }
    );
    throw error;
  }
};

// deleting contacts by id

const deleteContactById = async (req, res) => {
  const { id: contactId } = req.params;
  try {
    const contact = await Contact.findOneAndDelete({ _id: contactId });
    if (!contact) {
      return res.status(200).json({
        message: `Contact with id ${contactId} does not exist!`,
      });
    }
    res.status(200).json({
      status: "ok",
      message: `Contact with id ${contactId} has been succesfully deleted!`,
    });
  } catch (error) {
    const date = format("yyyy-MM-dd", new Date());
    fs.appendFile(
      path.join(__dirname, `logs`, `${date}_error.log`),
      `\n${error}`,
      (error) => {
        if (error) throw error;
        console.log("Error Log saved");
      }
    );
    throw error;
  }
};

// updating contacts

const updateContact = async (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.body;
  const { id: contactId } = req.params;

  const regexLiteralEmail =
    /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  const regexLiteralPhone =
    /^[\+]?[(]?[355]{3}[6][7-9][)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,4}$/;

  if (regexLiteralEmail.test(email) == false) {
    res.json({ status: "error", message: "Invalid email!" });
  } else if (regexLiteralPhone.test(phoneNumber) == false) {
    res.json({ status: "error", message: "Invalid phone number!" });
  } else if (!firstName || !lastName || !phoneNumber) {
    res.json({ status: "error", message: "Please fill out all the fields" });
  } else if (!email || regexLiteralPhone.test(phoneNumber) == true) {
    try {
      const response = await Contact.findOneAndUpdate(
        { _id: contactId },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      console.log("Contact updated successfully: ", response);
      res.json({ status: "ok", data: response });
    } catch (error) {
      const date = format("yyyy-MM-dd", new Date());
      fs.appendFile(
        path.join(__dirname, `logs`, `${date}_error.log`),
        `\n${error}`,
        (error) => {
          if (error) throw error;
          console.log("Error Log saved");
        }
      );
      res.json({
        status: "error",
        message: `${error.message}`,
      });
      throw error;
    }
  } else {
    res.json({
      status: "error",
      message: "Something wrong happened, please try again!",
    });
  }
};

module.exports = {
  createContact,
  findContactById,
  deleteContactById,
  getAllContacts,
  updateContact,
};
