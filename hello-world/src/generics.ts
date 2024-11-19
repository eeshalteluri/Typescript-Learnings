//Understanding the problem and why we need generics
//Let's say we want to represent a key value pair

class KeyValuePair{
    constructor(key: number, value: string){}
}

let pair = new KeyValuePair(1, 'Eeshal')

//What if somewhere else in our application we want to take input of 'key' as 'string'
//With our current implementation we cannot do this(compilation error)
//We have 2 solutions:

//Solution- 1:
class KeyValuePair1{
    constructor(key: any, value: string){}//naming the 'key' with 'any' type
}

let pair1 = new KeyValuePair1('1', 'Eeshal')

//We shouldnot use any as much as possible, because with 'any' we will lose type safety(i.e we will lose all the properties, methods associated with another type)

//Solution-2:
//Duplicate this class and pass the 'key' as string

class StringKeyValuePair{
    constructor(key: string, value: string){}//naming the 'key' with 'string' type
}

let stringPair = new StringKeyValuePair('1', 'Eeshal')

//The problem with this implementation is its redundant
//what if we want the 'value' of type 'number'
//we need to create another class with 'key' and 'value' of specific desired types
//There is no end to it, that's why we generic/common reuseable solutions

//---------------------------------------------------

//GENERIC CLASSES:

//Generic classes in typescript are same as template classes in c++
class KeyValuePair2<K>{
constructor(public key:K, public value: string){}

}

let pair2 = new KeyValuePair2<number>(2, 'Rishi')

class KeyValuePair3<K, V>{
    constructor(public key: K, public value:V){}
}

let pair3 = new KeyValuePair3<string, string>('3', 'praveen')

//what if we don't supply the generic type arguments?
let pair4 = new KeyValuePair3('4', 'vamsi')
pair4.value.charAt //we can access the properties and methods of string 

//---------------------------------------------------

//GENERIC FUNCTIONS:

function wrapInArray<T>(value: T){
return value
}

let number1 = wrapInArray(1)

class ArrayUtils {
     wrapInArray1<T>(value: T){
        return [value]
    }
    static wrapInArray2<T>(value: T){
        return [value]
    }
}

let number2 = new ArrayUtils().wrapInArray1("1")
let number3 = ArrayUtils.wrapInArray2(true)

//---------------------------------------------------

//GENERIC INTERFACES:

interface Result<T> {
    data: T | null,
    error:string | null
}

function fetch<T>(url: string): Result<T> {
    return {data: null, error: null}
}

interface User {
    username: string,
}

interface Product {
    title: string
}

let result = fetch<Product>('url')
result.data?.title

//---------------------------------------------------

//GENERIC CONSTRAINTS:

//Sometime we need to constraint generic type arguments

function echo<T>(value: T): T {
    return value
}

//Now we can call this function and we can give any kind of value(number, string, boolean etc)
echo('1') 
  
//But, what if we want to limit/constraint the type of arguemnts we pass?

function echo1<T extends number | string>(value: T): T {
    return value
}
//we can pass only number/string
echo1('try with a boolean')

//We can also constraint by the shape of an object
function echo2<T extends {name: string}>(value: T): T {
    return value
}

echo2({name: 'hello'})

//we can also constraint by interface
interface Persons {
    firstname: string
}

function echo3<T extends Persons>(value: T): T {
    return value
}

echo3({firstname: 'eeshal'})

//Constraining by class
class Persons1 {
    constructor(public firstname: string){}
}

function echo4<T extends Persons1>(value: T): T {
    return value
}

echo4({firstname: 'eeshal'})

//Now we can pass an instance of a person or any class that is derived from a person
class Customer1 extends Persons1{

}

echo4(new Persons1('a'))
echo4(new Customer1('a'))

//---------------------------------------------------

//EXTENDING GENERIC CLASSES:

interface Product1 {
    name: string,
    price: number
}

class Store<T> {
    objects: T[] = []

    add(obj: T): void {
        this.objects.push(obj )
    }
    //In our current implementation, we can access the property of objects outside but we shouldnot be able to, because we can accidentally wipe out this array
    //So we need to make this private ao this is accessible only within the store class
}

class Store1<T> {
    protected _objects: T[] = []

    add(obj: T): void {
        this._objects.push(obj )
    }
}

 //When extending the generic class we have 3 options:
 //Option-1: Pass on the generic type parameter
 class CompressibleStore<T> extends Store1<T> {
    compress() {}
 }

 let store = new CompressibleStore<Product1>()//Now the compiler knows that whatever we pass as a generic is passed to '<T>' of the 'CompressibleStore' class which is further passed to 'Store' class

 //Option-2: Restrict the generic type parameter:
 class SearchableStore<T extends { name: string }> extends Store1<T>{
    find(name: string): T | undefined {
        return this._objects.find(obj => obj.name === name)
    }
 }

 //Option-3: Fix generic type parameter:
 class ProductStore extends Store1<Product1> {
    filterByCategory(category: string): Product1[] {
        return []
    }
 }

 //---------------------------------------------------

 //'KEYOF' OPERATOR:
 class Store2<T> {
    protected _objects: T[] = []

    add(obj: T): void {
        this._objects.push(obj )
    }

    /*find(property: string, value: unknown): T | undefined
    {
      return this._objects.find(obj => obj[property] === value)
    }*/
}

let store2 = new Store2<Product1>()
store2.add({
    name: 'a', 
    price: 1,
})

//store2.find('name', 'a')
//store2.find('price', 1)
//store2.find('nonExistingProperty', 1)// There is a hidden problem with this implementation, with this implementation we can call a non-existing property and when we run our program our program is gonna crash.
//This is where we use the 'keyof' operator to solve this problem 
class Store3<T> {
    protected _objects: T[] = []

    add(obj: T): void {
        this._objects.push(obj )
    }

    //T is Product
    //keyof T => 'name' | 'price'
    //The 'keyof' operator returns the union of operators of the given type
    find(property: keyof T, value: unknown): T | undefined
    {
        return this._objects.find(obj => obj[property] === value)
    }
}

let store3 = new Store3<Product1>()
store3.add({
    name: 'a', 
    price: 1,
})
//store3.find('nonExistingProperty', 1)
//the above line when executed we get a compilation error
//because 'nonexistingProperty' property doesnot exist in Product

//---------------------------------------------------

//TYPE MAPPING:

//Sometimes we need to base a type on another type
//We have a product interface, what if we need a product interface with read-only properties

interface ReadOnlyProduct{
    readonly name: string,
    readonly price: number  
}
//This is repetitive, and also when we add new property in the 'Product' interface we need to update thr 'ReadOnlyProduct' property too

type ReadOnlyProduct1 = {
    //Index Signature
    //keyof
    readonly [K in keyof Product1]: Product1[K]
}

let product2: ReadOnlyProduct1 = {
    name: 'a',
    price: 1
}

//product2.name = 'a' executing this line will result in compilation error

//What if we need another type of 'readonly' object like 'ReadOnlyCustomer'
//So here we can use a generic type

type ReaOnly<T> = {
    readonly [K in keyof T]: T[K]
}

type Optional<T> = {
    [K in keyof T]?: T[K]
}
//These types are so oftenly used that, we can find them in the utility-types
//typescriptlang.org/docs/handbook/utility-types.html


