const mongoose = require("mongoose")

const { Schema } = mongoose
const postSchema = new Schema({
  // 포스트아이디? 제목 내용 작성자명 작성날짜 비밀번호
  postId: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  // password: {
  //   type: Number,
  //   required: true,
  // }
})

module.exports = mongoose.model("post", postSchema)