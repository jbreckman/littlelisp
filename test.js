var littleLisp = require("./littlelisp").littleLisp;

var sample = "(a (1 2 3) (> b 12 \"cdf\"))";

console.log(littleLisp.parse(sample));
