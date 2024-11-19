let sales:number = 123_456_789
//In typescript we don't need to always annotate our variables.
//Because the typescript compiler can infer(or)detect the type of the variables based on their values.
let sales1 = 123_456_789
let course = 'Typrescript'
let is_published = true 

//In typescript we have a new type called 'any', which can represent any kind of values.
//So if we declare a variable and donot initialize it, the typescript compiler will infer the type as 'any'.
let variable

//So we can set it to a number and later on change it to a string.
variable = 1
variable = 'hello'

//As a best practise we should avoid using 'any' type

let numbers: number[] = [1, 2]

//----

//TUPLE: 
//A tuple is a fixed length array, where each element has particular type
let user: [number, string] = [1, 'Mosh']
//Tuples are only useful when we have ket value pairs

//----

//ENUMS:
//Enums are a list of related constants
enum Size { Small, Medium, Large }
let mySize: Size = Size.Medium
console.log(mySize)
//The generated javascript code for the above enum is verbose/lengthy/unintuitive.
//But if we define the enum as a 'constant' we can avoid the above issue, and the compilier would generate more optimized code.

const enum Size1 { Small, Medium, Large }
let mySize1: Size1 = Size1.Medium

//----

//FUNCTIONS

//As a best practise always annotate the parameters, return types.
//Enable noUnUsedLocals, noUnUsedParameters, noImplicitReturns in ts.config
function calculateTax(income: number, taxYear: number):number {
    if(taxYear < 2022)
     return 0
    return income 
}

calculateTax(100, 2021)
//What if we want to make some parameters optional?
function calculateTax1(income: number, taxYear?: number):number {  
    return income   
}

//We can also give a default value to parameters
function calculateTax2(income: number, taxYear = 2022):number {
    if(taxYear < 2022)
        return 0
       return income
}

calculateTax2(100, 2023)

//----------

//OBJECTS
let employee : {
    readonly id: number,
    name: string,
    retire: (date: Date) => void
} = { id: 1, 
    name: '',
    retire(date) {
        console.log(date)
    },  
}

//3 problems
// If we want to create another employeee object, we have to repeat the above structure, so we endup duplicating our code which is bad.
// the other employee object can a]have other properties, so these 2 employee objects cannot have consistent shapes. Because we don't have a single place to define the shape of an employee object.
// Overall the structure is making the object harder to read and understand.

//This is where we use 'type' alias
type Employee = {
    readonly id: number,
    name: string,
    retire: (date: Date) => void
}

let employeee : Employee = { id: 1, 
    name: '',
    retire(date) {
        console.log(date)
    },  
}

//------

//UNION TYPES: 
//we can give avariable or function parameter more than one type.
function kgToLbs(weight: number | string): number {
    //Narrowing
    if(typeof weight === 'number'){
        console.log(weight)
        return weight*2.2
    }
    else{
        console.log(parseInt(weight))
        return parseInt(weight)*2.2
    }
}
kgToLbs(10)
kgToLbs('10kg')

//----

//INSTERSECTION TYPES:
//should be of all the types mentioned
type Draggable = {
    drag: () => void
}

type Resizable = {
    resize: () => void
}

type UIWidget = Draggable & Resizable

let textBox: UIWidget = {
    drag: () => {},
    resize: () => {}
}

//--------

//LITERAL TYPES: 
//to limit the values we can assign to a variable
//Literal (exact, specific)

type Quantity = 50 | 100
let quantity: Quantity = 100

type Metric = 'cm' | 'inch'

//------

//NULLABLE TYPES:  
function greet(name: string | null | undefined){
    if (name)
        console.log(name.toUpperCase())
    else
    console.log('Hola!')
}

greet(undefined)

//--------

//OPTIONAL CHAINING:
type Customer = {
    birthday?: Date
}

function getCustomer(id: number): Customer | null | undefined {
    return id === 0 ? null : { birthday: new Date() }
}

let customer = getCustomer(1)

//Optional property access operator
console.log(customer?.birthday?.getFullYear())

//Optional element access operator
//customers?.[0]

//Optional Call
let log: any = null
log?.('a')

//-------

//NULLISH COALESCING OPERATOR: 
//When working with null / undefined values somemtime we need to fallback to a default values

let speed: number | null = null
 let ride = {
    //speed: speed || 30
    // if speed is truthy speed uses 'speed value' or if its falsy, it is set to '30'
    //Falsy => ( undefined, null, '', false, 0)
    //But in the above case '0' is a truthy value for the speed, but above '0' is taken as falsy values and instead of '0', '30' is assigned to speed.
    //to avoid that we use 'The Nullish Coaelscing Operator', i.e
    speed: speed ?? 30

    // the above line says that, if speed isnot null or undefined use that value otherwise use 30 as default value.
 }

//-------

//Sometimes we know more about the type of the variable than typescript, what to do then?
//That's when we use 'type assertion'

 //TYPE ASSERTIONS:
 let phone = document.getElementById('phone') as HTMLInputElement
  //HTMLElement
  //HTMLInputElement
  phone.value //we are able to access the value method on the phone since we specified 'HTMLInputElement'
  // In typescript the 'as' keyword doesnot perform any type converstion.
  // This is purely telling the compiler that we know more info about the type of this object.

  //There is another syntax to use type assertion
  let phone1 = <HTMLInputElement> document.getElementById('phone')

  //-----

  //THE UNKNOWN TYPE:
  function render(document: any) {
    document.move()
    document.fly()
    document.whateverWeWant()  

  }
    //If we run our application and there is no move method on document object, our program is gonna crash. 
    //This is where we use another similar type called 'unknown'.

  /*function render1(document: unknown) {
    document.move()
    document.fly()
    document.whateverWeWant()
  }*/

  // to solve the above errors we use type narrowing

  function render2(document: unknown) {
    //Narrowing
    if(typeof document === 'string'){
        document.toUpperCase()
    }

    // the 'typeof' operator only works for primitive types like string, boolean, number.
    //But if we have custom objects created with classes we have to use another operator 'instanceof'

    /*if(document instanceof CustomType){
        document.toUpperCase()
    }

    document.move()
    document.fly()
    document.whateverWeWant()*/
  }

  //-------

  //THE NEVER TYPE:
  //represents the values that never occur
  function processevents(){
    //let's say we want to run this function continously
    while(true){
        //read a message from the queue 
    }
  }

  processevents()
  console.log('Hello world')//This line will nebver get executed because the 'processevents' function never returns anything.

  //So inorder to tell the compiler that the above function never returns we use 'never' type.
  function processevents1(): never{
    //let's say we want to run this function continously
    while(true){
        //read a message from the queue 
    }
  }
// in ts.config file set allowunreachableCode: false to catch this as a warning.
  processevents1()
  //console.log('Hello world')//this line never gets executed and we can know by looking at the code. 