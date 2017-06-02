# learnNote
学习整理
1. 开发中需要调试移动设备，方法：
  - 首先确保手机和电脑在同一局域网，查看电脑端的ip地址，（注意必须在本地开启服务器哦）然后将ip地址录入浏览器url输入栏中，在草料网站生成对应的二维码，直接扫二维码就可以查看移动端效果。
  - 
2. 移动端真正的1px边框的实现（这是由于dpr的存在，有2，3等，所以设置为1px并不一定是真正的1px）
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
