// node.js 보다 깔끔하게 처리가능

// 불러오기
const express = require("express");
const cors = require("cors");
const app = express(); // 실행, app에 결과 담김
// const port = 3000;
const port = process.env.PORT || 8080;

const models = require('./models'); // 불러와서 사용 💛
const multer = require("multer"); // 업로드 이미지를 관리하는 스토리지 서버 💛

// 다른 곳에서 upload 폴더에 있는 파일에 접근 할 수 있도록 설정 💛
app.use("/upload", express.static("upload"));

// 이미지 파일이 요청오면 어디에 저장할건지 지정 💛
const upload = multer({
    // dest : 'upload/'
    storage : multer.diskStorage({ // 지정해주는 메서드
        destination : function(req, file, cb) {
            // 어디에 저장할거냐 ? 파일 위치
            cb(null, 'upload/')
        },
        filename : function(req, file, cb) {
            // 어떤 이름으로 지정할거냐 ?
            // file 객체의 오리지널 이름으로 지정하겠다.
            cb(null, file.originalname)
        }

    })
});

// json 형식의 데이터를 처리할 수 있게 설정
app.use(express.json());
app.use(cors()); // 브라우저 cors 이슈를 막기위해 사용(모든 브라우저의 요청을 일정하게 받겠다.)

// 이미지 파일을 post로 요청이 왔을 때 upload라는 폴더에 이미지를 저장하기 💛
// 이미지가 하나일 때 > single    // key 이름
app.post('/image', upload.single('image'), (req, res) => {
    const file = req.file;
    console.log(file); // 파일 객체
    res.send({ // 이미지 경로
        imageUrl : 'http://localhost:3000/' + file.destination + file.filename
    })
})

// ⭐ 요청처리
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

// 🧡 메서드 post로 요청 왔을 때 (test용)
app.post('/green', async(req, res) => {
    console.log(req); // 요청하는 객체는 어떻게 생겼는지 !?
    res.send('green 게시판에 게시글이 등록되었습니다.');
});

// 💛 상품 등록
app.post ("/products", (req, res) => {
    // http body에 있는 데이터를 body에 담기
    const body = req.body;
    // body 객체에 있는 값을 각각 변수에 할당
    const { name, price, seller, imageUrl, description } = body;
    if(!name || !price || !seller) {
        res.send("모든 필드를 입력해주세요 ^^");
    }
    // 입력 값이 다 있으면 Product테이블에 레코들르 삽입
    models.Product.create({
        name,
        price,
        seller,
        imageUrl,
        description
    })
    .then (result => {
        console.log("상품 생성 결과 : ", result);
        res.send({
            result
        })
    })
    .catch( e=> {
        console.error(e);
        res.send("상품 업로드에 문제가 생김");
    })
})

// 💛 삭제하기
app.delete('/product/:id', async (req, res) => {
    const params = req.params;
    models.Product.destroy({ where : { id : params.id }})
    .then (res.send('상품이 삭제됨'));
})

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