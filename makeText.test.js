
const markov = require("./markov.js");

test("markov should return string with a length = to 10", function(){
    let m = new markov.MarkovMachine("the cat in the hat");
    expect(m.makeText(10).length).toEqual(37);
});
