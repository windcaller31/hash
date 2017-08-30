var readline = require('readline');
var  rl = readline.createInterface(process.stdin, process.stdout);
var HashTable = function (){
  this.table = new Array(137);
  this.simpleHash = simpleHash;
  this.showDistro = showDistro;
  this.put = put;
  this.get = get;
  this.buildChains = buildChains;

  function simpleHash(d){
    var total = 0;
    const h = 37;
    for(var i=0; i<d.length;i++){
      total += h * d.charCodeAt(i);
    }
    return total%this.table.length;
  }

  function put(data){
    var h_data = this.simpleHash(data);
    var index = 0;
    if(!this.table[h_data][index]){
      this.table[h_data][index] = data;
    }else{
      while(this.table[h_data][index]){
        index ++;
      }
      this.table[h_data][index] = data;
    }
  }

  function get(key){
    var chain = this.table[this.simpleHash(key)];
    for(var i =0;i<chain.length;i++){
      if(chain[i]){
        return chain[i]
      }
    }
    return null;
  }

  function showDistro(){
    var n = 0;
    for(var i=0; i<this.table.length ;i++){
      if(this.table[i]){
        console.log(i,"===",this.table[i]);
      }
    }
  }

  function buildChains(){
    for(var i =0;i<this.table.length;i++){
      this.table[i] = new Array();
    }
  }

};

function getRandomInt(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
}

function getStuData(arr){
  for(var i=0;i<arr.length;i++){
    var num = "";
    for(var j=1;j<=9;j++){
      num += Math.floor(Math.random()*10);
    }
    num += getRandomInt(50,100);
    arr[i] = num;
  }
}


var test = new HashTable();
test.buildChains();
var someNames = ["David","Jenniy","David","Ramoc","David"];
for(var i =0;i<someNames.length;i++){
  test.put(someNames[i]);
}
// test.showDistro();
console.log(test.get("David"));
