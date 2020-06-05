
/**
* pollFun 轮询函数 function
*/
const rollPolling = (pollFun, timeInterval) => {
  pollFun && pollFun(() => {})
  let arrLen = 2
  const reduceArr = (fucArr) => {
    return fucArr.reduce((pre, cur) => {
      return (next) => {
        return pre((n) => {
          arrLen--
          return cur(next, n)
        })
      }
    })
  }
  const asyncFun = (next) => {
    pollFun(next)
  }
  let fetchList = []
  setInterval(() => {
    if (arrLen <= 0 || fetchList.length === 0) {
      arrLen = 2
      fetchList = []
      for (let i = 0; i <= arrLen; i++) {
        fetchList.push(asyncFun)
      }
      reduceArr(fetchList)(() => {})
    }
  }, timeInterval || 5000)
}


// 使用方法
// 示例轮询函数
const pollFun = (next) => {
  const startTime = +new Date()
  setTimeout(() => {
    const endTime = +new Date()
    console.log(endTime - startTime)
    next()
  }, 2000)
}

rollPolling(pollFun)




// 第二种方式 koa-compose
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <script>
    
    
    /**
* pollFun 轮询函数 function
*/
const rollPolling = (pollFun, timeInterval) => {
  pollFun && pollFun()
  let arrLen = 2
  let fetchList = []
  function compose(middleware) {
      return function () {
        fetchList.shift()
        let index = -1
        return dispatch(0)
        function dispatch(i) {
          const startTime = +new Date()
          if (i <= index) return Promise.reject(new Error('next() called multiple times'))
          index = i
          const fn = middleware[i]
          if (!fn) return Promise.resolve()
          try {
            fetchList.shift()
            return Promise.resolve(fn(function next() {
              const endTime = +new Date()
              console.log(endTime - startTime)
              return dispatch(i + 1)
            }))
          } catch (err) {
            return Promise.reject(fn(function next() {
              console.log(err, 'err')
              const endTime = +new Date()
              console.log(endTime - startTime)
              return dispatch(i + 1)
            }))
          }
        }
      }
    }
  const reduceArr = (fucArr) => {
    return fucArr.reduce((pre, cur) => {
      return (next) => {
        return pre((n) => {
          fetchList.shift()
          return cur(next, n)
        })
      }
    })
  }
  const asyncFun = (next) => {
    pollFun(next)
  }
  setInterval(() => {
    if (fetchList.length === 0) {
      for (let i = 0; i < arrLen; i++) {
        fetchList.push(asyncFun)
      }
      compose(fetchList)()
    }
  }, 2000) // 轮询接口的速度 由于存在每次push进入多个 ajax 所以不会存在定时轮询 只会在前一个接口完成后 再去请求下一个接口
}


// 使用方法
// 示例轮询函数
const pollFun = (next) => {
  setTimeout(() => {
    next && next()
  }, 2000)
}

rollPolling(pollFun, 3000)
  </script>
</body>
</html>
