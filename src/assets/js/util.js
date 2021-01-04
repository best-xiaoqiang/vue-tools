var util = {}
export default util

// 获取网页的打开方式
util.getOpenin = function () {
  let openin = ''
  let ua = navigator.userAgent.toLowerCase()
  let href = window.location
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    if (/timeline/.test(href)) {
      openin = 'wxcircle' // 微信朋友圈
    } else {
      openin = 'wxfriend' // 微信聊天消息
    }
  } else if (ua.match(/QQ/i) == 'qq') {
    openin = 'qq、qzone' // qq客户端内
  } else {
    openin = 'other'
  }
  return openin
}

// 16位颜色转换成rgba格式
util.toRgba = function(colorHex, opacity){
  if(typeof opacity !== 'number') opacity = 1
  // 16进制颜色值的正则
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 把颜色值变成小写
  var color = colorHex.toLowerCase();
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      var colorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = colorNew;
    }
    // 处理六位的颜色值，转为RGB
    var colorChange = [];
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt('0x' + color.slice(i, i + 2)));
    }
    return 'rgba(' + colorChange.join(',') + ',' + opacity + ')';
  } else {
    return color;
  }
}

// 判断数据类型
const isType = type => target => Object.prototype.toString.call(target) === `[object ${type}]`

util.isArray = isType('Array')