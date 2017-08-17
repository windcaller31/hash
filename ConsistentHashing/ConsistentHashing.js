//待添加入Hash环的服务器列表
servers = ["192.168.0.0:111", "192.168.0.1:111", "192.168.0.2:111", "192.168.0.3:111","192.168.0.4:111"];
var  sortedMap = {};
//hash算法
function getHash(str) {
  var p = 16777619;
  var hash = 2166136261;
  for (var i = 0; i < str.length; i++){
    hash = (hash ^ str.charAt(i)) * p;
  }
  hash += hash << 13;
  hash ^= hash >> 7;
  hash += hash << 3;
  hash ^= hash >> 17;
  hash += hash << 5;
  // 如果算出来的值为负数则取其绝对值
  if (hash < 0)
  	hash = Math.abs(hash);
  return hash;
}

//初始化每一个node
function init_map(){
  for (var i = 0; i < servers.length; i++){
    var hash = getHash(servers[i]);
		console.log("[" + servers[i] + "]加入集合中, 其Hash值为" + hash);
		sortedMap[hash] = servers[i];
	}
}

//寻找环（map）中离得最近的
function get_closest(k){
  var bj_key = [];
  var index = 0;
  var first_key = "";
  for(key in sortedMap){
    if(key >= k){
      bj_key.push(key);
    }if(index == 0){
      first_key = key;
    }
    index++;
  }
  bj_key.sort(function(a,b){
    return a-b;
  });
  return bj_key[0]||first_key;
}

function getServer(node) {
	var hash = getHash(node);
  var index = get_closest(hash);
	// 返回对应的服务器名称
	return sortedMap[index];
}

var nodes = ["192.168.89.91:6775", "192.168.89.91:6776", "192.168.89.91:6777i"];
init_map();
for (var i = 0; i < nodes.length; i++){
  console.log("[" + nodes[i] + "]的hash值为" + getHash(nodes[i]) + ", 被路由到结点[" + getServer(nodes[i]) + "]");
}
