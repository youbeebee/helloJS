var n1 = 1;
function A() {
    console.log(n1); //undefined. 호이스팅Hoisting 발생
    var n1 = 10;
}
A();