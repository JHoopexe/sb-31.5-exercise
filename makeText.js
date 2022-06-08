const fs = require("fs");
const argv = process.argv;
const axios = require('axios');
const { MarkovMachine } = require("./markov.js");

if(argv[2] == "url"){
    if(argv[3].slice(0,4) == "http"){
        webMarkov(argv[3]);
    }
    else{
        console.log("Wrong input type submitted.");
    }
}
else if(argv[2] == "file"){
    if(argv[3].slice(0,4) == "http"){
        console.log("Wrong input type submitted.");
    }
    else{
        fileMarkov(argv[3]);
    }
}
else{
    console.log("Input type not supported.");
}

function fileMarkov(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if(err){
            console.log(`Error reading ${path}`, err);
            process.exit(1);
        }
        
        let m = new MarkovMachine(data);
        console.log(`... makeText.js generated text from ${path} ...`);
        });
}

function webMarkov(path){
    axios.get(path)
    .then(res => {
        let m = new MarkovMachine(res.data);
        console.log(`... makeText.js generated text from ${path} ...`);
    })
    .catch(err => console.log(`Error fetching ${path}`, err));
}
