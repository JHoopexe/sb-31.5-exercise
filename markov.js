/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let obj = {}
    let rhyme = []
    let r = 1;

    for(let i = 0; i < this.words.length; i++){
      if(obj[this.words[i]]){
        obj[this.words[i]].push(this.words[r]);
        r++;
      }
      else{
        rhyme.push(this.words[r]);
        obj[this.words[i]] = rhyme;
        rhyme = []
        r++;
      }
    }
    return obj;
  }

  /** return random text from chains */

  makeText(numWords = 100) {0
    const chain = this.makeChains();
    const keys = Object.keys(chain);
    let phrase = []
    
    do{
      for(let key of keys){
        let ran = Math.floor(Math.random() * chain[key].length);

        if(phrase.length < numWords){
          phrase.push(key);

          if(phrase.length < numWords){
            if(chain[key][ran] == null){
              continue;
            }
            else{
              phrase.push(chain[key][ran]);
            }
          }
          else{
            break;
          }
        }
        else{
          break;
        }
      }
    }
    while(phrase.length < numWords);

    console.log(phrase.join(" "));
    return phrase.join(" ");
  }
}

module.exports = { MarkovMachine: MarkovMachine };
