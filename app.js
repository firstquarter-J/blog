const express = require('express')
const app = express()
const port = 3000

const connect = require('./schemas')
connect()
const authMiddleware = require("./middlewares/auth-middleware")

// swagger
const { swaggerUi, specs } = require('./swagger/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.use(express.urlencoded({ extended: false })) // 동기? 비동기? 순서가 중요하네? goodsRouter 보다 아래 있으니 에러!
app.use(express.json()) // json 가져오는 express 사용법?
//app.use(express.static('public')) // statuc 폴더 경로 명시?
app.use(express.static('assets'))


const postRouter = require("./routers/post") //라우터를 생성한다. goods.js파일을 라우터로 사용한다.
app.use("/api", [postRouter]) //api를 호출해서 get등의 방식으로 데이터를 리턴한다

const commentRouter = require("./routers/comment") //라우터를 생성한다. goods.js파일을 라우터로 사용한다.
app.use("/api", [commentRouter]) //api를 호출해서 get등의 방식으로 데이터를 리턴한다

const userRouter = require("./routers/user") //라우터를 생성한다. goods.js파일을 라우터로 사용한다.
app.use("/api", [userRouter]) //api를 호출해서 get등의 방식으로 데이터를 리턴한다

// ejs 사용한다?
app.set('views', __dirname + '/views') // 경로 명시?
app.set('view engine', 'ejs')

// 1. 전체 게시글 목록 조회 페이지
//     - 제목, 작성자명, 작성 날짜를 조회하기
//     - 작성 날짜 기준으로 내림차순 정렬하기
//     - 특정 게시글을 클릭할 경우 `게시글 조회 페이지`로 이동하기

app.get('/', (req, res) => {
  // const { user } = res.locals
  // console.log(user)

    res.render('index')
})

  // 2. 게시글 작성 페이지
  //     - 제목, 작성자명, `비밀번호`, 작성 내용을 입력하기
  //     - 글을 작성 한 후 "글쓰기" 버튼을 클릭하면 `전체 게시글 목록 조회 페이지`로 이동하고, 최신 게시글이 최상단에 위치함을 확인하기
app.get('/new', (req, res) => {
    res.render('new')
})

//
// app.get('/', function(req, res){
//     res.sendFile(path.join(__dirname, 'views/index.html'));
// });
//

  // 3. 게시글 조회 페이지
  //     - 제목, 작성자명, 작성 날짜, 작성 내용을 조회하기
app.get('/detail/:postId', (req, res) => { // localhost:5000/detail?goodsId=10의 형식으로 사용, id를 가져온다
    // let id = req.query.postId
    let id = req.params.postId
    res.render('detail', {id}) // 
})

// 4. 게시글 수정 페이지
  //     - 작성 페이지와 동일한 폼. 수정하기 버튼을 눌렀던 게시글이 미리 입력되게 하기
  //     - 비밀번호란은 비워두기
  //     - "글쓰기" 버튼은 없고 "수정 완료", "삭제하기" 버튼만 만들기
  //     - "수정완료" 버튼을 누를 때 입력된 비밀번호를 비교하여 동일할 때만 글이 수정되게 하기
  //     - "삭제하기" 버튼을 누를 때 입력된 비밀번호를 비교하여 동일할 때만 글이 삭제되게 하기
app.get('/modify/:postId', (req, res) => {
    let id = req.params.postId
    res.render('modify', {id}) // 
})

app.get('/join', (req, res) => {
  res.render('join')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get("/api/users/me", authMiddleware, async (req, res) => {
  // console.log(res.locals)
  const { user } = res.locals
  // req.status(401)
  // console.log(user) // 로깅할때조차 패스워드는 남기지 않는다!
  res.send({
    user,
      // user: {
      //     email: user.email,
      //     nickname: user.nickname,
      // }
  })
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})

// git 실험중
// 2번째

// const cors = require('cors'); app.use(cors({ origin: '*', credentials: true, }));
// npm i cors