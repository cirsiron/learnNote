
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
