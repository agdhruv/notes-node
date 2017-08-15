const fs = require('fs');

var fetchNotes = () => {
	try{
		// get existing notes from file if the file exists
		var existingNotesString = fs.readFileSync("notes-data.json");
		// parse the JSON string and make this the new notes array
		return JSON.parse(existingNotesString);
	}
	catch(e){
		return [];
	}
};

var saveNotes = (notes) => {
	fs.writeFileSync("notes-data.json", JSON.stringify(notes));
};

var addNote = (title, body) => {
	// init a notes array
	var notes = fetchNotes();
	// make new note object with title and body
	var note = {
		title,
		body
	};
	// populate duplicate notes array if required
	var duplicateNotes = notes.filter((note) => note.title === title);

	if (duplicateNotes.length === 0) {
		// push new note to the array
		notes.push(note);
		// write updated object to file
		saveNotes(notes);
		return note;
	}
	
}

var getAll = () => {
	return fetchNotes();
}

var getNote = (title) => {
	var notes = fetchNotes();
	var filteredNotes = notes.filter((note) => note.title === title);
	return filteredNotes[0];
}

var removeNote = (title) => {
	var notes = fetchNotes();
	var filteredNotes = notes.filter((note) => note.title !== title);
	saveNotes(filteredNotes);

	return notes.length !== filteredNotes.length;
}

var logNote = (note) => {
	console.log('---');
	console.log(`Title: ${note.title}`);
	console.log(`Body: ${note.body}`);
}

module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote,
	logNote
}