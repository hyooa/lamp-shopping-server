// node.js 보다 깔끔하게 처리가능

// 불러오기
const express = require("express");
const cors = require("cors");
const app = express(); // 실행, app에 결과 담김
const port = 3000;
const models = require('./models'); // 불러와서 사용 💜

// json 형식의 데이터를 처리할 수 있게 설정
app.use(express.json());
app.use(cors()); // 브라우저 cors 이슈를 막기위해 사용(모든 브라우저의 요청을 일정하게 받겠다.)

// 요청처리
// app.메서드(url, 함수)
// 🧡 get 요청products
app.get('/products', async(req, res) => { // '/products' 경로
    
    // 💜 데이터 베이스 다 조회하기 > findAll()
    models.Product.findAll()
    .then( // 조회 결과를 받음
        result => {
            console.log("제품 전체 조회 ", result);
            res.send(result);
        }
    )
    .catch(e => {
        console.error(e);
        res.send('파일 조회에 문제있음');
    })

    // res.send('업로드된 상품들 입니다.'); // 응답해줌
    // res.send(result);
})

// 💜 위(/products)와 아래(/product/:id), 요청 경로가 다름

// method get요청이 오고 url은 /product/2(id) 이렇게 요청이 왔을 때
                        // 띄우기
app.get('/product/:id', async (req, res) => {
    const params = req.params; // 객체
    // const { id } = params; // 객체 구조분해 할당

    // 하나만 조회할 때 > findOne --> select문
    models.Product.findOne({
        // 조건절
        where : {
            id : params.id,
        }
    })
    .then(result => {
        res.send(result); // 객체로 받아옴
    })
    .catch( e => { // 결과 없을 때 화면에 안보여줌 ..'3'
        console.log(e);
        res.send('상품 조회에 문제가 생김')
    })
    
    // 전송
    // res.send(product);

    // 주소창에 확인
    // http://localhost:3000/product/:2
});

// 🧡 메서드 post로 요청 왔을 때
app.post('/green', async(req, res) => {
    console.log(req); // 요청하는 객체는 어떻게 생겼는지 !?
    res.send('green 게시판에 게시글이 등록되었습니다.');
});

// 실행
app.listen(port, () => {
    console.log('쇼핑몰 서버가 동작중입니다 ~ing');

    // 💜 Sequelize 와 데이터베이스 연결 작업
    // 데이터베이스 동기화
    // php 처럼 (?)
    models.sequelize
    .sync()
    .then(() => {
        console.log('DB연결 성공');
    })
    .catch(e => {
        console.log(e);
        console.log('DB연결 에러');
        // 서버실행이 안되면 프로세서를 종료
        process.exit();
    })
})