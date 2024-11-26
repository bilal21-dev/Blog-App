const express = require('express');
const cors = require("cors");
require('./db/config');
const User = require('./db/User')
// const Product = require('./db/Product')


const app = express();
app.use(express.json())
app.use(cors());

app.post("/signup", async (req, res) => {
    if (req.body.password && req.body.email && req.body.name) {
        let user = new User(req.body)
        let result = await user.save();
        result = result.toObject();
        delete result.password;
        res.send(result);
    } else {
        res.send({ result: "Enter Complete details" })
    }
})
app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
            let user = await User.findOne(req.body).select("-password");
            if (user) {
                    res.send(user)
            }
            else {
                    res.send({ result: "No record" })
            }
    } else {
            res.send({ result: "Enter Complete details" })
    }
})
app.listen(5000);