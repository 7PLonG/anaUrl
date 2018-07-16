function anaUrl(){
	const regKv = /([^=]*?=([^&]*)&?)/g;
	let temp = arguments.length===0?
		new URL():
		new URL(Array.prototype.join.call(arguments,''));
	Object.setPrototypeOf(temp, anaUrl.prototype);

	temp.kv = {};
	temp.search?
	temp.search.slice(1).match(regKv).forEach(function(v){
		let _arrkv = v.match(/([^=]*)=([^&]*)/);
		temp.kv[_arrkv[1]] = _arrkv[2];
	}):
	temp.kv = {};
	return temp
}
anaUrl.prototype = Object.create(URL.prototype);
anaUrl.prototype.getkv = function(){
	const regKv = /([^=]*?=([^&]*)&?)/g;
	let that = this;
	this.kv = {};
	this.search?
		this.search.slice(1).match(regKv).forEach(function(v){
			let _arrkv = v.match(/([^=]*)=([^&]*)/);
			that.kv[_arrkv[1]] = _arrkv[2];
		}):this.kv = {};
	return this.kv
};
anaUrl.prototype.setkv = function(obj){
	let that = this;
	this.kv = obj;
	this.search = '?';
	Object.keys(obj).forEach(
		function(k){
			that.search += that.search + k + '=' + obj[k] + '&'
		});
	this.search = this.search.slice(0,-1);
};
anaUrl.prototype.addkv = function(obj){
	//es6
	let kvall = Object.assign(obj,this.kv);
	this.setkv(kvall);
};
anaUrl.prototype.delkv = function(target){
	let that = this;
	if(typeof(target) === 'string'){
		delete this.kv[target]
	}
	if(Array.isArray(target)){
		target.forEach(
			function(k){
				delete that.kv[k]
			});
	}
	this.setkv(this.kv)
};

if (typeof Object.assign !== 'function') {
	// Must be writable: true, enumerable: false, configurable: true
	Object.defineProperty(Object, "assign", {
		value: function assign(target, varArgs) { // .length of function is 2
			'use strict';
			if (target == null) { // TypeError if undefined or null
				throw new TypeError('Cannot convert undefined or null to object');
			}

			var to = Object(target);

			for (var index = 1; index < arguments.length; index++) {
				var nextSource = arguments[index];

				if (nextSource != null) { // Skip over if undefined or null
					for (var nextKey in nextSource) {
						// Avoid bugs when hasOwnProperty is shadowed
						if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
							to[nextKey] = nextSource[nextKey];
						}
					}
				}
			}
			return to;
		},
		writable: true,
		configurable: true
	});
}


var urlall = "https://name:password@mapi.ekwing.com:8080/stuhd/Hw/JsHistoryItemScore?v=1.0&os=Android&driverCode=3.4.0&author_id=50427%23123123&uid=50427&is_http=1&hid=20409&hwcid=99607&method=LAST&js=1&token=iNTANCMjY2QxIz??IjIzIjI3N0dQ==3#hash123";
var ccc = new anaUrl(urlall);


// 直接修改search等属性时如何触发getkv??
//    ans1: 直接去除.kv 只通过get set 操作
