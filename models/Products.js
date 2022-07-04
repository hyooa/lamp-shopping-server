// 내보내기 > Common.js 구문
// module.exports
module.exports = function (sequelize, DataTypes) {
    // 컬럼 > name, price, imageUrl, seller
    // 제약 조건 > allowNull : 컬럼의 값이 없어도 되는지 여부 (default : true / false - 허용X)
    // https://github.com/design-view/lamp-shopping-server
    const product = sequelize.define('Product', { // define > 테이블 만들어줌
        name : {
            type : DataTypes.STRING(20),
            allowNull : false,
        },
        price : {
            type : DataTypes.INTEGER(10),
            allowNull : false,
        },
        imageUrl : {
            type : DataTypes.STRING(500),
        },
        seller : {
            type : DataTypes.STRING(200),
            allowNull : false,
        },
        description : {
            type : DataTypes.STRING(500),
            allowNull : false,
        }
    });
    return product;
}