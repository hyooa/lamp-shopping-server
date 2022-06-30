// node는 Common JS 문법을 사용
// import는 require()
const http = require('http');
const hostName = '127.0.0.1'; // 내 컴퓨터 주소 ) '127.0.0.1'
const port = 8080; // 포트 번호 지정

// 서버 만들기 createServer (f(req, res)) // (req)요청과 (res)응답을 해주는 인자
const server = http.createServer(function(req, res) {
    // 요청 정보 req (웹브라우저가 요청한 것)
    // 응답해줄겡 res (정보 요청한거 결과 보내기)
    // console.log(req);
    const path = req.url;
    const method = req.method;
    console.log(path); // product --> 8080/url
    console.log(method); // GET 방식

    if(path === "/products") {
        if(method ==="GET") { // http > head/body 나뉨
            // 응답을 보낼 때 contentType을 json객체를 Head에 보낼거야
            res.writeHead(200, { 'Content-Type' : 'application/json' })
            // js 배열을 json 형태로 변경해서 products에 담기
            const products = JSON.stringify([ // json으로 바꿈, 객체를 문자열로 바꾸기
                {
                    name : "거실조명",
                    price : 50000,
                },
                {
                    name : "어린이조명",
                    price : 20000,
                },
            ])
            res.end(products); // 응답해주는 애
            // http://localhost:8080/products
        }
    }
})
// listen 은 대기 호스트 네임과 포트 번호로 요청을 기다림
server.listen(port, hostName);
console.log('조명 쇼핑몰 서버가 돌아가고 있습니당');