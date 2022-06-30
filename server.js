// node.js 보다 깔끔하게 처리가능

// 불러오기
const express = require("express");
const cors = require("cors");
const app = express(); // 실행, app에 결과 담김
const port = 3000;

// json 형식의 데이터를 처리할 수 있게 설정
app.use(express.json());
app.use(cors()); // 브라우저 cors 이슈를 막기위해 사용(모든 브라우저의 요청을 일정하게 받겠다.)

// 요청처리
// app.메서드(url, 함수)
// 🧡 get 요청
app.get('/products', async(req, res) => { // '/products' 경로
    const result = {
        products : [
            {
                id : 1,
                name : "원목 의자",
                price : 70000,
                imgsrc : "images/products/product1.jpg",
                seller : "초록이"
            },
            {
                id : 2,
                name : "원목 의자",
                price : 70000,
                imgsrc : "images/products/product2.jpg",
                seller : "초록이"
            },
            {
                id : 3,
                name : "원목 의자",
                price : 70000,
                imgsrc : "images/products/product3.jpg",
                seller : "초록이"
            },
            {
                id : 4,
                name : "원목 의자",
                price : 70000,
                imgsrc : "images/products/product4.jpg",
                seller : "초록이"
            },
            {
                id : 5,
                name : "원목 의자",
                price : 70000,
                imgsrc : "images/products/product1.jpg",
                seller : "초록이"
            },
            {
                id : 6,
                name : "원목 의자",
                price : 70000,
                imgsrc : "images/products/product2.jpg",
                seller : "초록이"
            },
            {
                id : 7,
                name : "원목 의자",
                price : 70000,
                imgsrc : "images/products/product3.jpg",
                seller : "초록이"
            },
            {
                id : 8,
                name : "원목 의자",
                price : 70000,
                imgsrc : "images/products/product4.jpg",
                seller : "초록이"
            },
        ]
    }
    // res.send('업로드된 상품들 입니다.'); // 응답해줌
    res.send(result);
})

// 🧡 메서드 post로 요청 왔을 때
app.post('/green', async(req, res) => {
    console.log(req); // 요청하는 객체는 어떻게 생겼는지 !?
    res.send('green 게시판에 게시글이 등록되었습니다.');
});

// 실행
app.listen(port, () => {

    console.log('쇼핑몰 서버가 동작중입니다 ~ing');
})