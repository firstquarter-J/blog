const mongoose = require("mongoose")

const connect = () => {
  mongoose
    // .connect("mongodb://localhost:27017/admin", { // blog admin
    .connect("mongodb://localhost:27017/blog", { // blog admin
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      ignoreUndefined: true,
      // user: "test",
      // pass: "test",
    })
    .catch(err => console.log(err))
  // try {
  //   mongoose
  //     .connect("mongodb://localhost:27017/admin", { // blog admin
  //     // .connect("mongodb://localhost:27017/blog", { // blog admin
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //       useCreateIndex: true,
  //       ignoreUndefined: true,
  //       user: "test",
  //       pass: "test",
  //     })
  //     .catch(err => console.log(err))
  // } catch (err) {
  //   console.log(`에러!!! => ${err}`)
  //   mongoose
  //     .connect("mongodb://localhost:27017/blog", { // blog admin
  //     // .connect("mongodb://localhost:27017/blog", { // blog admin
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //       useCreateIndex: true,
  //       ignoreUndefined: true,
  //       // user: "test",
  //       // pass: "test",
  //     })
  //     .catch(err => console.log(err))
  // }
}

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err)
})

module.exports = connect