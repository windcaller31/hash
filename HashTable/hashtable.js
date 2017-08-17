var hashtable = function(){
  var size = 0;
  var entry = {};

  this.clear = function(){
    entry = {};
  }

  //wait for modify
  this.hash_val = function(val){
    return val;
  };

  this.getValue = function(key){
    key = this.hash_val(val);
    return this.containsKey(key) ? entry[key] : null;
  }

  this.containsKey = function(key){
    key = this.hash_val(key);
    for(key in entry){
      if(entry[key]){
        return true;
      }
    }
    return false;
  }

  this.add = function(val){
    var key = this.hash_val(val);
    while(this.containsKey(key)){
      key = this.hash_val(val)+1;
    }
    entry[key] = val;
    size++;
    return size;
  };

  this.del = function(key){
    key = this.hash_val(val);
    this.containsKey(key)? delete entry[key] : null;
    size --;
    return size;
  }

  this.getAll = function(){
    return entry;
  }

  this.len = function(){
    return size;
  }
}

var test = new hashtable();
test.add(1);
console.log(JSON.stringify(test.getAll()));
console.log(test.len());
