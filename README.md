# learnNote
学习整理
### 1. 开发中需要调试移动设备，方法：
  - 首先确保手机和电脑在同一局域网，查看电脑端的ip地址，（注意必须在本地开启服务器哦）然后将ip地址录入浏览器url输入栏中，在草料网站生成对应的二维码，直接扫二维码就可以查看移动端效果。
  - 
### 2. 移动端真正的1px边框的实现（这是由于dpr的存在，有2，3等，所以设置为1px并不一定是真正的1px）
 - 首先在可以给标签设置伪类::after
 
 ```
 .tab
  position: relative
  &:after
   position: absolute
   top: 0
   bottom: 0
   border-bottom: 1px solid #333
   content: ' '
 ```
  - 然后使用媒体查询
 ```
 @media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5)
  .border-1px 
    &:: after
      -webkit-transform: scaleY(0.7)
      transform: scaleY(0.7)
@media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2)
  .border-1px 
    &:: after
      -webkit-transform: scaleY(0.5)
      transform: scaleY(0.5)
@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
  .border-1px 
    &:: after
      -webkit-transform: scaleY(0.3)
      transform: scaleY(0.3)
 ```
### 3. lazyMan 是一个经典的js流程控制实现
### 4. require.js 加载时有一个默认的基础路径，是以入口模块的(main.js)位置为基准。
    - easjs 的module.export 和 export 都是同时向外暴露数据，相当于var export = module.export; 所以直接修改export = xxx 是不能将数据导出的。只能使用export.aa = xxx ; 或者 module.export = xxx; 就是说一旦给export直接赋值就会切断了与module.export的关联
### 5. node中模块加载时的加载查找机制
   - 当不为路径模块或者是第三方模块时，就先在当前文件目录下的module目录中查找对应的文件夹名，在文件夹下再找package.json中的main属性对应的路径文件。如果没有找到就会查找上一层文件夹的module目录，下面步骤同上。
