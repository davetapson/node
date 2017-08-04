const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

var titleOptions = { describe: 'Title of note',
            demand: true,
            alias: 't'};

var bodyOptions = {describe: 'Body of note',
            demand: true,
            alias: 'b'};

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('read', 'Read a note',{
        title: titleOptions
    })
    .command('list', 'List all notes')
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv;
var command = argv._[0];

if(command === 'add'){
    var note = notes.addNote(argv.title, argv.body);
    if(note){
        console.log('Note added:')
        notes.logNote(note);
    }
    else{
        console.log('Title: ', argv.title, ' is already in use.');
    }
}else if(command === 'list'){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)...`);
    allNotes.forEach((note) => notes.logNote(note));
}
else if(command === 'read'){
    var note = notes.readNote(argv.title);
    var message = note ? notes.logNote(note) : `That title ${argv.title} does not exist in the list.`; 

    console.log(message);
}
else if(command === 'remove'){
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? `Note ${argv.title} was removed.` : `Note ${argv.title} note found.`;
    console.log(message);
}
else{
    console.log('Command not recognised.');
}