// Object oriented programming is all about objects.
// But to create an object we needd to create a class.
// Class is a blueprint for  creating objects.

// Let's say we want to represent a bank account, we need a class for that.
// Now in this class we can have properties like 'id', 'owner', 'balance' and methods like 'deposit()', 'withdraw()'
//Let's implement the above class:

class Account {
    id: number
    owner: string 
    balance: number

    // If we add only the 3 lines of code in the class of 'Account' we get an error
    // Error: Property 'id, owner, balance' has no initializer and is not definitely assigned in the constructor.
    //basically what the error is saying is that this priperty isnot initialized

    // to slove this probelm we neeed to create a constructor
    // a constructor is a special function or method inside a class that iis used for initialization of an object
    constructor(id: number, owner: string, balance: number) {
        this.id = id
        this.owner = owner
        this.balance = balance
    }

    deposit(amount: number): void{
        if(amount <= 0){
            throw new Error('Invalid amount')
        }
        this.balance += amount
    }
}

//---------------------------------------------------

//CREATING OBJECT

// declare a variable, set it to new instance of 'Account' class.
let account = new Account(1, 'eeshal', 100)
// Using the new operator we can create an instance or a new object  of the class
account.deposit(100)  
console.log(account)
// the 'typeof' operator always returns object for any instance of any underlying class
// but what if we check the type of an object and see if its an instance of a given class
// for that we need to use instance of an operator
console.log('account instance: ',account instanceof Account)

//---------------------------------------------------

//READ-ONLY AND OPTIONAL PROPERTIES

//in typescript we have modifiers that we can apply to a property, and this helps us write robust code.
// 'read-only' => readonly = we can only set the value in the constructor
// 'optional' => ? = not necessary to set the value in the constructor
class Person{
    readonly name: string
    ishuman?: boolean

    constructor(name: string){
        this.name = name
        this.ishuman = true
    }
}

//---------------------------------------------------

//ACCESS CONTROL KEYS/ ACCESS MODIFIERS

//In our current implementation, we have the deposit method for updating the balance.
// Let's say in the future we want to record all the transactions in this account.
// So everytime we deposit or withdraw we want the transaction recorded of it.

// We can update balance of 'account'(instance of class 'Account') from amnywhere in the code.
// That's poor code, we don't want anyone to update the balance from outside.

// To do that we can use access control keywords:
// In typescript we have 3 access modifiers:
// 1. public 2. private 3. protected

//So when we declare properties in the class they are public by default
// i.e our 'id', 'owner', 'balance' properties all are accessible everywhere in the code(public)
// Since we need to make 'balance' property private add private infront of it.

class Animal {
    private _hasTail: boolean

    constructor(hasTail: boolean){
        this._hasTail = hasTail
    }
}

//---------------------------------------------------

//GETTERS AND SETTERS

  class Bird {
    private _canFly: boolean

    constructor(canFly: boolean){
        this._canFly = canFly
    }

    // 'getter' helps us view private properties outside class
    get canFly(): boolean{
        return this._canFly
    }

    // 'setter' helps us modify private properties outside class constructor
    set canFly(value: boolean) {
        this._canFly = value
    }
  }

  let penguin = new Bird(false)

  console.log('can fly before using setter: ',penguin.canFly)//false
  penguin.canFly = true
  console.log('can fly after using setter: ',penguin.canFly)//true

//---------------------------------------------------

  //INDEX SIGNATURES

  //In javascript we can create an object and add properties to it dynamically.
  // but we cannot do it in typescript bcause typescript is very strict about the shape of an object
  // But there are situations where we need to add properties to an object dynamically, and this is where we use index signatures.

  // Let's say we are building a ticketing app for a concert and for each concert we wanna know who is sitting where?
  class SeatAssignment {
    // A1, A2 .....
    // eeshal, praveen, .....
    // We don't want to define individual properties like 
    //A1: string = eeshal
    //A2: string = praveen
    // this is bit repetitive, what if we have 100, 1000 seats in a venue.
    // also what is in another venue our seats are numbered differently

    //Index Signature Property
    [seatNumber: string]: string
  }

  let seats = new SeatAssignment()
  seats.A1 = 'eeshal'
  seats.A2 = 'praveen'

  // in javascript and typescript we have another way to access a property, the 'square bracket notation'
  seats['A3'] = 'rishi'

  // Using index signature we can create properties dynamically, just like javascript but we also get type checking, type safety

//---------------------------------------------------

  //STATIC MEMBERS

  //Let's imagine we are building a ride sharing application like uber
  // Let's try to track no.of active users, and increment and decrement accordingly
  class Ride {
    activeRides: number = 0

    start(){ this.activeRides++}
    stop(){ this.activeRides--}
  }

  // let's create 2 instances of 'Ride' class
  
  let ride1 =new Ride()
  ride1.start()
  
  let ride2 =new Ride()
  ride2.start()

  console.log(ride1.activeRides)//1
  console.log(ride2.activeRides)//1

  // we see the output for the 2 above console.logs is 1, but we have 2 active users
  // its because here we are dealing with 2 separate objects 'ride1' and 'ride2' and each object is a separate space in memory
  // so each object is independently tracking the 'activeRides'
  // What we need here is a single/global place where can keep track of active rides.
  // this can be achieved through static property.
  // static - a static property is a property that belongs to a class and not an object
  // we gonna have only one instance of that property in the memory

  class RideWithStaticMembers {
    static activeRides: number = 0

    start() {RideWithStaticMembers.activeRides++}
    stop() {RideWithStaticMembers.activeRides--}
  }

  let ride3 = new RideWithStaticMembers()
  ride3.start()
  let ride4 = new RideWithStaticMembers()
  ride4.start()

  console.log(RideWithStaticMembers.activeRides)

  //The above code is better but there is a problem:
  //we can modify activeRides property from anywhere

  class RideWithPrivateStaticMembers {
    private static _activeRides: number = 0

    start() {RideWithPrivateStaticMembers._activeRides++}
    stop() {RideWithPrivateStaticMembers._activeRides--}

    static get activeRides(): number {
        return RideWithPrivateStaticMembers._activeRides
    }
  }

  let ride5 = new RideWithPrivateStaticMembers()
  ride5.start()
  let ride6 = new RideWithPrivateStaticMembers()
  ride6.start()

  console.log(RideWithPrivateStaticMembers.activeRides)

//---------------------------------------------------

  //INHERITANCE

  //Sometimes we deal with classes which have some commonality, for example:
  //both student & teacher can have common properties & methods like:
  // firstName, lastName, fullName as well as methods like walk(), talk()

  // we don't wanna write this code multiple times one for student class and another for teacher class
  // its better to write this code once and reuse it in as many places as possible

  //This is where we use inheritance, so we extract these common properties and methods and put them in aseparate class like person, and then have student and teacher inherit these commanalities
  // in this scenerio we refer to the 'person' class as 'parent/base/super' class and 'student','teacher' class as 'child/derived/sub'
  // different people use different terms to refer to the same concept

  class Persona {
    constructor(public firstName: string, public lastName: string){
    }

    get fullName(): string{
        return this.firstName + ' ' + this.lastName
    }

    walk(){
        console.log('walking...')
    }
  }

  class Student extends Persona{
    constructor(public id: number, firstName: string, lastName: string){
        super(firstName, lastName)//calls the constructor of the base class('persona class here')
        }
        takeTest(){
            console.log("Taking test...")
    }
  } 

//---------------------------------------------------
  
  //METHOD OVERRIDING
  //Let's say we are implementing the 'Teacher' class, and getting the fullName of the teacher we need to add 'Prof.' tag infront of it.
  // So in the Teacher class we want to change implementation of the fullName() method.
  
  class Teacher extends Persona {
    
    override get fullName(): string {
        // Use super.fullName to correctly call the parent class's getter
        return 'Prof. ' + super.fullName //super.fullName returns (this.firstName + ' ' + this.lastName) of the parent class(Persona here);
    }
}

let teacher1 = new Teacher('Rishi', 'Preetham');
console.log(teacher1.fullName); // Output: "Prof. Rishi Preetham"

//---------------------------------------------------

//POLYMORPHISM

//poly-many, morph-form, this refers to the situation where an object can take many different forms
//let's define a class for printing the name of persons

function printNames(people: Persona[]){
    for(let person of people){
        console.log(person.fullName)
    }
}

printNames([
    new Student(1, 'eeshal', 'teluri'),
    new Teacher('rishi', 'preetham')
])

//This is polymorphism in action, in this for loop if we hover the mouse over at the person object its of type 'Persona' class
//But in each iteration of the for loop, this person object is taking a different form
//In the above example, it first element in the array is 'Student' object form, then next one is a 'Teacher' object form

//So tomorrow we can create new class 'Principal' without making a single change to this function.
//What we achieved above is that we enhanced our program without a single change to the 'printNames()' function

//And this brings us to another principle of object oriented programming, called 'Open-Closed Principle'
//It means Classes should be 'open' for 'extension' and 'closed' for 'modification'.

//---------------------------------------------------

// PRIVATE VS PROTECTED MEMBERS
//Protected members are smiliar to private, i.e we can access them anywhere within the class but not from outside.
//The difference is that 'protected' members are inherited, and 'private' members are not

//---------------------------------------------------

// ABSTRACT CLASSESAND METHODS:

//Let's say we are building an application and we wanna allow the user to draw something on a canvas
//Here we gonna have classes like 'Circle', 'Rectangle', 'Triangle' etc
//Now all these classes should have some common properties like color, size , position etc 

class Shape {
    constructor( public color: string){}

    render() {}
}

class Circle extends Shape {
    constructor(public radius: number, color: string){
        super(color)
    }

    override render(): void {
        console.log('Rendering a circle..')
    }
}

//There is a problem with the current implementation

let shape = new Shape('red')
shape.render()
// We can call 'render' method on an instance of 'Shape' class
// It doesnot make any sense to render a shape with just 'color' property
//We shouldnot be able to render shape, because shape isnot a real thing, like a circle.

//This is where we use abstract classes and methods.
//So if we want to stop from being able to create an instance of a shape class, we mark this class as abstract

abstract class Shape1 {
    constructor( public color: string){}

    abstract render(): void
}

class Circle1 extends Shape1 {
    constructor(public radius: number, color: string){
        super(color)
    }

    override render(): void {
        console.log('Rendering a circle..')
    }
}

//So now if we try to create an instance of a 'Shape1' class we get a compilation error stating cannot create an instance of an abstract class.
//An abstract class is like an uncooked meal, its not ready, another class has to extend it
//Quite often we have abstract methods inside abstract classes.
//These are methods that have no implementation.
//Just like the render method in the above 'Shape1' class
//So we prefix it with abstract as well 

//---------------------------------------------------

//INTERFACES

//In OOP we have another building block called 'Interface'
//As the name implies, we use the interface to define the interface/shape of the object


//For example we want to represent a 'calendar' concept
//We have different calendar implementations for e.g, google, iCal, Outlook etc
//Now all these calendars should have common implementations such as common properties and methods
//We can define all these commonalities in the base class called 'Calendar'

class Calendar {
    constructor(public name: string){}

    addEvent() {}
    removeEvent() {}
}
//None of these methods can have implementations, because the implementations really depend on the type of calendar
//for example, how we record an event in agoogle calendar in a google event is certainly different from an outloog calendar
//So technically we should define all these methods and class as abstract

abstract class Calendar1 {
    constructor(public name: string){}

    abstract addEvent(): void
    abstract removeEvent(): void
}

//Let's see how to implement the same with 'interface'

interface Calendar{
    name: string

    addEvent(): void
    removeEvent(): void
}

//What should we use?
//An abstract class? or an interface?
//It depends, in the above example the calendar class isnot providing any logic/algorithm that subclasses can reuse
//We just have a bunch of method declarations, so in this case its better to use an interface because our code will end up being more concise and esy to read
//In contrast if there is any logic/algo and we wan to share that code among subclasses then use class, because interfaces cannot have method impolementation, i.e if we add any braces to the methods in the interface then we get a compilation error

//Similar to classes we can use interfaces
interface CloudClanedar extends Calendar {
     sync(): void
}

class Googlecalendar implements Calendar{
    constructor(public name: string){}
    
    addEvent(): void {
        throw new Error("Method not implemented.")
    }
    
    removeEvent(): void {
        throw new Error("Method not implemented.")
    }

}
