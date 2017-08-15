const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
	describe: 'Title of note',
	demand: true,
	alias: 't'
};
const bodyOptions = {
	describe: 'Body of note',
	demand: true,
	alias: 'b'
};

const argv = yargs
			.command('add', 'Add new note', {
				title: titleOptions,
				body: bodyOptions
			})
			.command('remove', 'Remove existing note', {
				title: titleOptions
			})
			.command('read', 'Read existing note', {
				title: titleOptions
			})
			.command('list', 'List all notes')
			.help()
			.argv;
var command = argv._[0];

if (command === 'add') {
	var note = notes.addNote(argv.title, argv.body);

	if (note) {
		console.log("Created");
		notes.logNote(note);
	}
	else{
		console.log(`Note title ${argv.title} already in use.`);
	}
}
else if (command === 'list') {
	var allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} notes(s).`);
	allNotes.forEach((note) => notes.logNote(note));
}
else if (command === 'read') {
	var note = notes.getNote(argv.title);

	if (note) {
		notes.logNote(note);
	}
	else {
		console.log('Note not found');
	}
}
else if (command === 'remove') {
	var noteRemoved = notes.removeNote(argv.title);
	var message = noteRemoved ? "Note was removed" : "Note not found";
	console.log(message);
}
else {
	console.log('Command not recognized.');
}