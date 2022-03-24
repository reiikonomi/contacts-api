const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const contact = require("./routes/contact");
const fs = require("fs");
const path = require("path");
const format = require("date-format");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const port = 5000;

mongoose.connect(
  "mongodb+srv://admin:CvRzkrBtzHsiybyO@cluster0.sys7h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      const date = format("yyyy-MM-dd", new Date());
      fs.appendFile(
        path.join(__dirname, `logs`, `${date}_error.log`),
        `\n${error}`,
        (error) => {
          if (error) throw error;
          console.log("Error Log saved");
        }
      );
    }
  }
);

app.use(cors());
app.use(express.json());
app.use("/api/v1/contacts", contact);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(port, (error) => {
  console.log(`Listening on port ${port}`);
});
