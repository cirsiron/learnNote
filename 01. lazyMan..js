<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<script>

class LazyMan {
    constructor(name) {
        this.name = name;
        this.tasks = []; //执任务执行队列
        this._init(); //处理化执行
        this._res = null;
    }
    _init() {
        this._pushTask((res) => {
            console.log('name ' + this.name)
            this._next(res);
        });
        this._next();
    }
	// 添加任务
    _pushTask(...args) {
        this.tasks.push(this._createTask(...args))
    }
	// 给头部添加任务
    _headTask(...args) {
        this.tasks.unshift(this._createTask(...args))
    }
	// 任务创建
    _createTask(f, timeout, immed) {
        return () => {
            immed && immed();
            timeout = timeout || 0;
            setTimeout(() => {
                this._res = f();
            }, timeout)
        }
    }
	// 执行列表中的下一个任务
    _next() {
        const fn = this.tasks.shift();
        fn && fn(this._res);
    }
    eat() {
        this._pushTask(() => {
            console.log('eat')  
            this._next();
        })
        return this;
    }
    sleep(timeout) {
        this._pushTask(() => {
            this._next();
        }, timeout, () => {
            console.log('sleep 5000')
        })
        return this;
    }
    headSleep(timeout) {
        this._headTask(() => {
            console.log('睡好了')
            this._next();
        }, timeout, () => {
            console.log('开始sleep 1s')
        })
        return this;
    }

}

const la = new LazyMan('jack')
la.sleep(1000).eat().headSleep(1000);



	</script>
</body>
</html>
