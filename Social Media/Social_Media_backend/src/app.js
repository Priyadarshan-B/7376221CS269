const express = require('express');
const cors = require("cors");
const getUser = require('./routes/users');
const getPosts = require('./routes/post');
const morgan = require('morgan')
const app = express();

const port = 5000;
const cors_config = {
    origin: "*",
};
const morgan_config = morgan(
    ":method :url :status :res[content-length] - :response-time ms"
);

app.use(cors(cors_config));
app.use(express.json());
app.use(morgan_config);

app.use(getUser);
app.use(getPosts);

app.listen(port, () => console.log(`Server is listening on ${port}`));

module.exports = app;
