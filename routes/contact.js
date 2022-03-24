const express = require("express");
const router = express.Router();

const {
  createContact,
  getAllContacts,
  findContactById,
  deleteContactById,
  updateContact,
} = require("../controllers/contact");

router.route("/create-contact").post(createContact);
router.route("/get-all-contacts").get(getAllContacts);
router
  .route("/contact-by-id/:id")
  .get(findContactById)
  .delete(deleteContactById);

router.route("/update-contact/:id").patch(updateContact);

module.exports = router;
