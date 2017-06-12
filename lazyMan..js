//js流程经典控制，实现一个lazyMan
(function(window){
  //定义一个构造函数
  function _lazyMan(name) {
    var _t = this;
    var tasks = [];//存储事件方法
    var fn = (function() {
      return function() {
        console.log("this is " + name);
        _t.next();
      }  
    })();
    this.tasks.push(fn);
    setTimeout(function(){
      //这里需让next自己执行一次显示name
      _t.next();
    },0);
  }
  _lazyMan.prototype.next = function() {
    var fn = this.tasks.shift();
    fn && fn();
  }
  function LazyMan(name) {
    return new _lazyMan(name);
  }
  _LazyMan.prototype.eat = function(food) {
            var _t = this;
            var fn = (function() {
                return function() {
                    console.log("i like eat" + food);
                    _t.next();
                }
            })();
            this.tasks.push(fn);
            return this;
        }
        _LazyMan.prototype.sleep = function(sec) {
            var _t = this;
            var fn = (function() {
                return function() {
                    setTimeout(function() {
                        console.log("this is " + sec);
                        _t.next();
                    }, sec * 1000);
                }
            })();
            this.tasks.push(fn);
            return this;
        }
        _LazyMan.prototype.firstSleep = function(sec) {
            var _t = this;
            var fn = (function() {
                return function() {
                    setTimeout(function() {
                        console.log("fisrt" + sec)
                        _t.next();
                    }, sec * 1000);
                }
            })();
            this.tasks.unshift(fn);
            return this;
        }

        function Lazyman(name) {
            return new _LazyMan(name);
        }

        Lazyman("jack").sleep(3).eat("food1").eat("food2").eat("food3").firstSleep(2);
  
})(window,undefined);
