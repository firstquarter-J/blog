const mongoose = require("mongoose")

const { Schema } = mongoose // 구분할
const userSchema = new Schema({
  // 포스트아이디? 제목 내용 작성자명 작성날짜 비밀번호
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  // id: {
  //   type: String,
  //   required: true,
  // },
  nickname: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
})

// 얘는 토큰 뭐시기가 아니야
// UserSchema.virtual("userId").get(function () {
//   return this._id.toHexString();
// });
// UserSchema.set("toJSON", {
//   virtuals: true,
// });

module.exports = mongoose.model("user", userSchema)