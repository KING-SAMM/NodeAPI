/**
 * Libray for storing and editing data
 */
// Dependencies
const fs = require('fs');
const path = require('path');

// Container for library
const lib = {};

// Define base directory
const baseDir = path.join(__dirname, '/../.data');

// Create
lib.create = (dir, file, data, callback) => {
    //Open new file for writing
    fs.open(baseDir + '/' + file + '.json', 'wx', (err, fileDescriptor) => {
        if(!err && fileDescriptor) 
        {
            //convert data object to string
            const stringData = JSON.stringify(data);
            // Write string data to file
            fs.writeFile(fileDescriptor, stringData, (err) => {
                if(!err)
                {
                    //Close written file
                    fs.close(fileDescriptor, (err) => {
                        if(!err)
                        {
                            callback('false');
                        }
                        else
                        {
                            callback('Error closing new file');
                        }
                    })
                }
                else
                {
                    callback('Error writing to file');
                }
            })
        }
        else
        {
            callback('Error creating new file, it may already exist.');
        }
    });

};


module.exports = lib;