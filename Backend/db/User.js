const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    sharedPosts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "blogs", // Assuming you have a "Post" collection
        },
      ],
})
module.exports= mongoose.model("users",userSchema);