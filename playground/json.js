// var obj = {
// 	name: 'Dhruv'
// };

// var stringObj = JSON.stringify(obj);

// console.log(typeof stringObj);
// console.log(stringObj);

// var personString = '{ "name": "Dhruv", "age": 19 }';
// var person = JSON.parse(personString);

// console.log(person);

const fs = require('fs');

var originalNote = {
	title: 'Some title',
	body: 'Some body'
};

// stringify the JS object
var originalNoteString = JSON.stringify(originalNote);
// write stringified object to file
fs.writeFileSync('notes.json', originalNoteString);

// get JSON from file
var noteString = fs.readFileSync('notes.json');

// parse the JSON that you get to use as JS object
var note = JSON.parse(noteString);

console.log(typeof note);
console.log(note.title);