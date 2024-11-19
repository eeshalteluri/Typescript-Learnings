//Decorators are attributes that we apply to our classes and their members, and with this we can change how they behave.
//They are frequently used in VUE, ANGULAR applications

//Typescript doesnot have any decorators by default.
//Under the hood this decorator is just a function gets called by the javascript runtime.
//SO the javascript runtime or the javascript engine that executes the code is going to call the function and pass our class to it.

//Now in that function we have a chance to modify this classs, so we can add new properties, new methods or we can change the implementations of existing methods.
//Before we create any decorators first we need to enable a special compiler option, because decorators are experimental features.

// turn on the experimental decorator feature
// tsc --experimentalDecorators

//CLASS DECORATORS:  
//Depending on where we are going to apply this decorator, the number and type of parameters varies.
//So if we are going to apply it to the class, we should have single parameter that repesents our constructor function.  

 
