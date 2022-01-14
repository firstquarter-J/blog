const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));

const connect = require('./schemas')
connect()

const authMiddleware = require("./middlewares/auth-middleware")

// HTTPS 인증 폴더 ~?
app.use(express.static('public'));

// webhook secret
const crypto = require('crypto')
const bodyParser = require('body-parser')

const YOUR_WEBHOOK_KEY = "Codebrick"

app.use(bodyParser.json())

// Tokopedia Webhook Test

app.post('/hi', (req, res) => {
  try {
    const reqBody = req.body
    const reqParams = req.params
    const reqQuery = req.query
    const reqMethods = req.methods
    const reqUrl = req.url
    console.log("\x1b[1;3;31m포스트!!!\x1b[0m");
    console.log("\x1b[1;36mreq.body => \x1b[0m", req.body);
    console.log("\x1b[1;33mreq.headers => \x1b[0m", req.headers);
    console.log(`\x1b[1;31m---절취선---\x1b[0m`, `\x1b[1;36m${new Date()}\x1b[0m`);
    
    // Encrypt with SHA-256 and Encode to hexadecimal
    let hmac = crypto.createHmac('sha256', YOUR_WEBHOOK_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex')
    console.log('이거 내꺼!!!==========>', hmac)
    
    console.log("이거 니네꺼=====> ", req.get('Authorization-hmac'))
    console.log("이거 니네꺼=====> ", req.get('Authorization-hmac'))

    // Compare our HMAC with your HMAC
    if(!crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(req.get('Authorization-Hmac')))) {
        console.log('\x1b[1;3;31m---Failed to verify!---\x1b[0m')
        return
    }
    console.log('\x1b[1;3;36m---Successfully verified!---\x1b[0m')

    res.status(200).send({
      ok: true,
      reqBody,
      reqParams,
      reqQuery,
      reqMethods,
      reqUrl
    });

  } catch (err) {
      console.error(err);

      res.status(400).send({
        ok: false,
        message: `ㅇㅔ~~~~~~~~~~~~~~~~~~러 발생 => ${err}`
      })
  }
})

// Local HTTP or AWS Server HTTPS
try {
  app.use(express.static('public'));
  const fs = require('fs');
  const http=require("http");
  const https=require("https");
  const options = {
    ca: fs.readFileSync('/etc/letsencrypt/live/firstquarter.shop/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/firstquarter.shop/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/firstquarter.shop/cert.pem')
    };
    http.createServer(app).listen(3000);
    https.createServer(options, app).listen(443, () => {
      console.log(
        `\x1b[1;3;31m안
  \x1b[0m\x1b[1;3;33m녕\x1b[0m
    \x1b[1;3;32m난\x1b[0m
      \x1b[1;3;36m서\x1b[0m
        \x1b[1;3;34m버\x1b[0m
          \x1b[1;3;35m야\x1b[0m`)
    });
} catch (err) {
  console.error(`ㅇ ㅔ  ㄹ ㅓ  ! => ${err}`)

  const port = 3000;
  app.listen(port, () => {
      console.log(
        `\x1b[1;3;31m안
  \x1b[0m\x1b[1;3;33m녕\x1b[0m
    \x1b[1;3;32m난\x1b[0m
      \x1b[1;3;36m서\x1b[0m
        \x1b[1;3;34m버\x1b[0m
          \x1b[1;3;35m야\x1b[0m
            \x1b[1;3;36mhttp://localhost:${port}\x1b[0m`)
  })
}




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
  try {
    console.log('\x1b[1;3;31m하\x1b[0m');
    console.log('\x1b[1;3;33m  잉\x1b[0m');
    console.log('\x1b[1;3;32m    지\x1b[0m');
    console.log('\x1b[1;3;36m      금\x1b[0m');
    console.log('\x1b[1;3;34m        은\x1b[0m');
    console.log('\x1b[1;3;35m          몇\x1b[0m');
    console.log('\x1b[1;3;30m            시~?\x1b[0m');
    console.log('\x1b[1;3;36m                \x1b[0m', `\x1b[1;36m${new Date()}\x1b[0m`);
    // console.log('\x1b[30m30= 검은색\x1b[0m');
    // console.log('\x1b[1;30m30 bold = 회색\x1b[0m');
    // console.log('\x1b[31m31 = 빨간색\x1b[0m');
    // console.log('\x1b[1;31m31 bold = 밝은 빨간색\x1b[0m');
    // console.log('\x1b[32m32 = 초록색\x1b[0m');
    // console.log('\x1b[1;32m32 bold = 밝은 초록색\x1b[0m');
    // console.log('\x1b[33m33\x1b[0m');
    // console.log('\x1b[1;33m33\x1b[0m');
    // console.log('\x1b[34m34\x1b[0m');
    // console.log('\x1b[1;34m34\x1b[0m');
    // console.log('\x1b[35m35\x1b[0m');
    // console.log('\x1b[1;35m35\x1b[0m');
    // console.log('\x1b[36m36\x1b[0m');
    // console.log('\x1b[1;36m36\x1b[0m');
    // console.log('\x1b[37m37\x1b[0m');
    // console.log('\x1b[1;37m37\x1b[0m');

    res.render("index")

  } catch (err) {
      console.error(err);

      res.status(400).send({
        ok: false,
        message: `ㅇㅔ~~~~~~~~~~~~~~~~~~러 발생 => ${err}`
      })
  }
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