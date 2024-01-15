// ---- 1번
var a = 1;
function outer() {
  function inner() {
    console.log(a); //undefined
    var a = 3;
  }
  inner(); // ---- 2번
  console.log(a);
}
outer(); // ---- 3번
console.log(a);
