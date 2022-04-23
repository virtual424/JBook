# JBook
A javascript editor along with a document editor

To use the application run -> "npx jscodepad serve" on your terminal
for help -> run "npx jscodepad -h"
saves all code and docs in a file. default location is c:/Users/username.
default filename is notebook.js
options -> can also define location for the file to create.

Following types of command can be used

jbook serve filename.js
jbook serve relativePathToCreateFileIn/filename.js
jbook serve mynotes.js --port [port number]
jbook serve --port [port number] //default name of the file will be notebook.js
