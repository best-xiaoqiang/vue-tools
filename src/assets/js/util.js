var util = {}
export default util

/*
  自定义QQ发网址显示卡片内容：https://www.mom1.cn/3235.html
  vue中动态设置meta标签和title标签的方法：https://www.jb51.net/article/143575.htm
  自定义微信分享卡片：
  https://www.cnblogs.com/backtozero/p/7064247.html
  http://caibaojian.com/wxshare-config.html
*/
function _resetMeta(doc, attriArr, attriVal, content) {
  if (typeof attriArr == 'string') attriArr = [attriArr]
  let head = doc.getElementsByTagName('head')
  let meta = doc.querySelector(`meta[${attriArr[0]}="${attriVal}"]`)
  if (meta) {
    head[0].removeChild(meta)
  }
  meta = doc.createElement('meta')
  attriArr.forEach(attri => {
    meta.setAttribute(attri, attriVal)
  });
  meta.content = content
  head[0].appendChild(meta)
}

// 自定义qq分享卡片
util.setShareCard = function (doc, { title = '自定义标题', desc = '自定义封面', imgUrl } = {}) {
  let metaObj = {
    name: {
      attriArr: 'itemprop',
      content: title
    },
    description: {
      attriArr: ['name', 'itemprop'],
      content: desc
    },
    image: {
      attriArr: 'itemprop',
      content: imgUrl
    },
  }
  for (const key in metaObj) {
    if (Object.prototype.hasOwnProperty.call(metaObj, key)) {
      const metaData = metaObj[key];
      let { attriArr, content } = metaData
      _resetMeta(doc, attriArr, key, content)
    }
  }
}

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