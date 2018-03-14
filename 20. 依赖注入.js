  /**
	 * Constructor DependencyInjector
	 * @param {Object} - object with dependencies
	 */
	var DI = function (dependency) {
	  this.dependency = dependency;
	};

	// Should return new function with resolved dependencies
	DI.prototype.inject = function (func) {

	  var deps = /^[^(]+\(([^)]+)/.exec(func.toString());
	  var _t = this;
	 //  构建参数绑定数组
	  var par = deps[1].split(",").map(function (dep) {
	      return _t.dependency[dep];
	    });
	  var params = deps ?  par : [];
	  console.log(params)
	  // 通过apply将依赖参数传入函数
	  return function () {
	    return func.apply(this, params);
	  };
	}
	// 要注入的依赖
	var deps = {
	  'dep1': function () {return 'this is dep1';},
	  'dep2': function () {return 'this is dep2';},
	  'dep3': function () {return 'this is dep3';},
	  'dep4': function () {return 'this is dep4';}
	};

	var d = new DI(deps);
	var myFunc = d.inject(function (dep3,dep1,dep2) {
	  return [dep1(), dep2(), dep3()].join(' -> ');
	});
	console.log(myFunc());
