const fs = require('fs/promises');
const path = require('path');

const resultJsonPath = path.resolve(__dirname, 'results.json');
module.exports = {
    fs,
    path,
    resultJsonPath 
};