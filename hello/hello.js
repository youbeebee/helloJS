//alert('Hello, world!');
document.write('<h1>Hello, world!</h1><br />');
//console.log("Hello, world!");

function Person(gender) {
  this.gender = gender;
}

Person.prototype.sayGender = function() {
  console.log(this.gender);
};

var person1 = new Person('Male');
var genderTeller = person1.sayGender;

person1.sayGender(); // alerts 'Male'
genderTeller(); // alerts undefined
console.log(genderTeller === person1.sayGender); // alerts true
console.log(genderTeller === Person.prototype.sayGender); // alerts true