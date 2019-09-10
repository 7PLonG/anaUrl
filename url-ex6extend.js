class anaUrl extends URL {
	constructor (u) {
		super(u);
		this.getkv();
	}
	getkv (e){
		const regKv = /([^=]*?=([^&]*)&?)/g;
		const that = this;
		this._kv = {};
		this.search?
			this.search.slice(1).match(regKv).forEach(function(v){
				let _arrkv = v.match(/([^=]*)=([^&]*)/);
				that._kv[_arrkv[1]] = _arrkv[2];
			}):this._kv = {};
		if(typeof(e) === 'string'){
			return this._kv[e]
		}else if (e === undefined){
			return this._kv
		}
	};
	setkv (obj){
		const that = this;
		this._kv = obj;
		this.search = '?';
		Object.keys(obj).forEach(
			function(k){
				that.search = that.search + k + '=' + obj[k] + '&'
			});
		this.search = this.search.slice(0,-1);
	};
	addkv (obj){
		//es6
		const kvall = Object.assign(obj,this._kv);
		this.setkv(kvall);
	};
	delkv (target){
		const that = this;
		if(typeof(target) === 'string'){
			delete this._kv[target]
		}
		if(Array.isArray(target)){
			target.forEach(
				function(k){
					delete that._kv[k]
				});
		}
		this.setkv(this._kv)
	};
}

var urlall = "https://name:password@mapi.ekwing.com:8080/stuhd/Hw/JsHistoryItemScore?v=1.0&os=Android&driverCode=3.4.0&author_id=50427%23123123&uid=50427&is_http=1&hid=20409&hwcid=99607&method=LAST&js=1&token=iNTANCMjY2QxIz??IjIzIjI3N0dQ==3#hash123";
var ccc = new anaUrl(urlall);

