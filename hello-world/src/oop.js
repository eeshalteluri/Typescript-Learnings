// Object oriented programming is all about objects.
// But to create an object we needd to create a class.
// Class is a blueprint for  creating objects.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Let's say we want to represent a bank account, we need a clas for that.
// Now in this class we can have properties like 'id', 'owner', 'balance' and methods like 'deposit()', 'withdraw()'
//Let's implement the above class:
var Account = /** @class */ (function () {
    // If we add only the 3 lines pof code in the class of 'Account' we get an error
    // Error: Property 'id, owner, balance' has no initializer and is not definitely assigned in the constructor.
    //basically what the error is saying is that this priperty isnot initialized
    // to slove this probelm we neeed to create a constructor
    // a constructor is a special function or method inside a class that iis used for initialization of an object
    function Account(id, owner, balance) {
        this.id = id;
        this.owner = owner;
        this.balance = balance;
    }
    Account.prototype.deposit = function (amount) {
        if (amount <= 0) {
            throw new Error('Invalid amount');
        }
        this.balance += amount;
    };
    return Account;
}());
//Creating Object
// declare a variable, set it to new instance of 'Account' class.
var account = new Account(1, 'eeshal', 100);
// Using the new operator we can create an instance or a new object  of the class
account.deposit(100);
console.log(account);
// the 'typeof' operator always returns object for any instance of any underlying class
// but what if we check the type of an object and see if its an instance of a given class
// for that we need to use instance of an operator
console.log('account instance: ', account instanceof Account);
//read-only and optional properties
//in typescript we have modifiers that we can apply to a property, and this helps us write robust code.
// 'read-only' => readonly = we can only set the value in the constructor
// 'optional' => ? = not necessary to set the value in the constructor
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
        this.ishuman = true;
    }
    return Person;
}());
//Access Control Keywords/ Access Modifiers
//In our current implementation, we have the deposit method for updating the balance.
// Let's say in the future we want to record all the transactions in this account.
// So everytime we deposit or withdraw we want the transaction recored of it.
// We can update balance of 'account'(instance of class 'Account') from amnywhere in the code.
// That's poor code, we don't want anyone to update the balance from outside.
// To do that we can use access control keywords:
// In typescript we have 3 access modifiers:
// 1. public 2. private 3. protected
//So when we declare properties in the class they are public by default
// i.e our 'id', 'owner', 'balance' properties all are accessible everywhere in the code(public)
// Since we need to make 'balance' property private add private infront of it.
var Animal = /** @class */ (function () {
    function Animal(hasTail) {
        this._hasTail = hasTail;
    }
    return Animal;
}());
// Getters and Setters
var Bird = /** @class */ (function () {
    function Bird(canFly) {
        this._canFly = canFly;
    }
    Object.defineProperty(Bird.prototype, "canFly", {
        // 'getter' helps us view private properties outside class
        get: function () {
            return this._canFly;
        },
        // 'setter' helps us modify private properties outside class constructor
        set: function (value) {
            this._canFly = value;
        },
        enumerable: false,
        configurable: true
    });
    return Bird;
}());
var penguin = new Bird(false);
console.log('can fly before using setter: ', penguin.canFly); //false
penguin.canFly = true;
console.log('can fly after using setter: ', penguin.canFly); //true
//Index Signatures
//In javascript we can create an object and add properties to it dynamically.
// but we cannot do it in typescript bcause typescript is very strict about the shape of an object
// But there are situations where we need to add properties to an object dynamically, and this is where we use index signatures.
// Let's say we are building a ticketing app for a concert and for each concert we wanna know who is sitting where?
var SeatAssignment = /** @class */ (function () {
    function SeatAssignment() {
    }
    return SeatAssignment;
}());
var seats = new SeatAssignment();
seats.A1 = 'eeshal';
seats.A2 = 'praveen';
// in javascript and typescript we have another way to access a property, the 'square bracket notation'
seats['A3'] = 'rishi';
// Using index signature we can create properties dynamically, just like javascript but we also get type checking, type safety
//Static Members
//Let's imagine we are building a ride sharing application like uber
// Let's try to track no.of active users, and increment and decrement accordingly
var Ride = /** @class */ (function () {
    function Ride() {
        this.activeRides = 0;
    }
    Ride.prototype.start = function () { this.activeRides++; };
    Ride.prototype.stop = function () { this.activeRides--; };
    return Ride;
}());
// let's create 2 instances of 'Ride' class
var ride1 = new Ride();
ride1.start();
var ride2 = new Ride();
ride2.start();
console.log(ride1.activeRides); //1
console.log(ride2.activeRides); //1
// we see the output for the 2 above console.logs is 1, but we have 2 active users
// its because here we are dealing with 2 separate objects 'ride1' and 'ride2' and each object is a separate space in memory
// so each object is independently tracking the 'activeRides'
// What we need here is a single/global place where can keep track of active rides.
// this can be achieved through static property.
// static - a static property is a property that belongs to a class and not an object
// we gonna have only one instance of that property in the memory
var RideWithStaticMembers = /** @class */ (function () {
    function RideWithStaticMembers() {
    }
    RideWithStaticMembers.prototype.start = function () { RideWithStaticMembers.activeRides++; };
    RideWithStaticMembers.prototype.stop = function () { RideWithStaticMembers.activeRides--; };
    RideWithStaticMembers.activeRides = 0;
    return RideWithStaticMembers;
}());
var ride3 = new RideWithStaticMembers();
ride3.start();
var ride4 = new RideWithStaticMembers();
ride4.start();
console.log(RideWithStaticMembers.activeRides);
//The above code is better but there is aproblem:
//we can modify activeRides property from anywhere
var RideWithPrivateStaticMembers = /** @class */ (function () {
    function RideWithPrivateStaticMembers() {
    }
    RideWithPrivateStaticMembers.prototype.start = function () { RideWithPrivateStaticMembers._activeRides++; };
    RideWithPrivateStaticMembers.prototype.stop = function () { RideWithPrivateStaticMembers._activeRides--; };
    Object.defineProperty(RideWithPrivateStaticMembers, "activeRides", {
        get: function () {
            return RideWithPrivateStaticMembers._activeRides;
        },
        enumerable: false,
        configurable: true
    });
    RideWithPrivateStaticMembers._activeRides = 0;
    return RideWithPrivateStaticMembers;
}());
var ride5 = new RideWithPrivateStaticMembers();
ride5.start();
var ride6 = new RideWithPrivateStaticMembers();
ride6.start();
console.log(RideWithPrivateStaticMembers.activeRides);
//Inheritance
//Sometimes we deal with classes which have some commonality, for example:
//both student & teacher can have common properties & methods like:
// firstName, lastName, fullName as well as methods like walk(), talk()
// we don't wanna write this code multiple times one for student class and another for teacher class
// its better to write this code once and reuse it in as many places as possible
//This is where we use inheritance, so we extract these common properties and methods and put them in aseparate class like person, and then have student and teacher inherit these commanalities
// in this scenerio we refer to the 'person' class as 'parent/base/super' class and 'student','teacher' class as 'child/derived/sub'
// different people use different terms to refer to the same concept
var Persona = /** @class */ (function () {
    function Persona(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    Object.defineProperty(Persona.prototype, "fullName", {
        get: function () {
            return this.firstName + ' ' + this.lastName;
        },
        enumerable: false,
        configurable: true
    });
    Persona.prototype.walk = function () {
        console.log('walking...');
    };
    return Persona;
}());
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(id, firstName, lastName) {
        var _this = _super.call(this, firstName, lastName) || this; //calls the constructor of the base class('persona class here')
        _this.id = id;
        return _this;
    }
    Student.prototype.takeTest = function () {
        console.log("Taking test...");
    };
    return Student;
}(Persona));
//Method Overloading
//Let's say we are implementing the 'Teacher' class, and getting the fullName of the teacher we need to add 'Prof.' tag infront of it.
// So in the Teacher calss we want to change implementation of the fullName() method.
var Teacher = /** @class */ (function (_super) {
    __extends(Teacher, _super);
    function Teacher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Teacher.prototype, "fullName", {
        get: function () {
            // Use super.fullName to correctly call the parent class's getter
            return 'Prof. ' + this.firstName + ' ' + this.lastName;
        },
        enumerable: false,
        configurable: true
    });
    return Teacher;
}(Persona));
var teacher1 = new Teacher('Rishi', 'Preetham');
console.log(teacher1.fullName); // Output: "Prof. Rishi Preetham"
//Polymorphism
//poly-many, morph-form, this refers to the situation where an object can take many different forms
//let's define a class for printing the name of persons
function printNames(people) {
    for (var _i = 0, people_1 = people; _i < people_1.length; _i++) {
        var person = people_1[_i];
        console.log(person.fullName);
    }
}
printNames([
    new Student(1, 'eeshal', 'teluri'),
    new Teacher('rishi', 'preetham')
]);
//Abstract Classes and Methods
//Let's say we are building an application and we wanna allow the user to draw something on a canvas
//Here we gonna have classes like 'Circle', 'Rectangle', 'Triangle' etc
//Now all these classes should have some common properties like color, size , position etc 
var Shape = /** @class */ (function () {
    function Shape(color) {
        this.color = color;
    }
    Shape.prototype.render = function () { };
    return Shape;
}());
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(radius, color) {
        var _this = _super.call(this, color) || this;
        _this.radius = radius;
        return _this;
    }
    Circle.prototype.render = function () {
        console.log('Rendering a circle..');
    };
    return Circle;
}(Shape));
//There is a problem with the current implementation
var shape = new Shape('red');
shape.render();
// We can call 'render' method on an instance of 'Shape' class
// It doesnot make any sense to render a shape with just 'color' property
//We shouldnot be able to render shape, because shape isnot a real thing, like a circle.
//This is where we use abstract classes and methods.
//So if we want to stop from being able to create an instance of a shape class, we mark this class as abstract
var Shape1 = /** @class */ (function () {
    function Shape1(color) {
        this.color = color;
    }
    return Shape1;
}());
var Circle1 = /** @class */ (function (_super) {
    __extends(Circle1, _super);
    function Circle1(radius, color) {
        var _this = _super.call(this, color) || this;
        _this.radius = radius;
        return _this;
    }
    Circle1.prototype.render = function () {
        console.log('Rendering a circle..');
    };
    return Circle1;
}(Shape1));
//So now if we try to create an instance of a 'Shape1' class we get a compilation error stating cannot create an instance of an abstract class.
//An abstyract class is like an uncooked meal, its not ready, another class has to extend it
//Quite often we have abstract methods inside abstract classes.
//These are methods that have no implementation.
//Just like the render method in the above 'Shape1' class
//So we prefix it with abstract as well 
