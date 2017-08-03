console.log('Starting app.js');

const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');

var user = os.userInfo();

//console.log(user);
notes;

fs.truncate('greetings.txt',function(err){
                    if(err){
                        console.log('Unable to write to file');
                    }
                });

fs.appendFile('greetings.txt', 'Hello World ' + user.username + ' ' + `Hello ${user.username} using template string.`, 
                function(err){
                    if(err){
                        console.log('Unable to write to file');
                    }
                });

// option 2
//fs.appendFileSync('greetings.txt', 'Hello World - Option 2!');