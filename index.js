const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(express.json())
app.get('/', (req, res) => {
    res.send("m-server is running")
})

app.listen(port, () => {
    console.log("m-server is running on port", port)
})