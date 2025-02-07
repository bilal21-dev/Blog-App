const User = require("../models/User")

async function handleGetEmail(req, res) {
    let user = await User.findOne({ _id: req.params.id });
    res.send(user)
}
async function handleUpdateEmail(req, res) {
    let result = await User.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result)
}

module.exports={
    handleGetEmail,handleUpdateEmail
}