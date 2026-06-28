export default{

info(message){

console.log(

"%cINFO",

"color:#2196F3;font-weight:bold",

message

);

},

success(message){

console.log(

"%cSUCCESS",

"color:#4CAF50;font-weight:bold",

message

);

},

warning(message){

console.log(

"%cWARNING",

"color:#FFC107;font-weight:bold",

message

);

},

error(message){

console.log(

"%cERROR",

"color:#F44336;font-weight:bold",

message

);

}

}
