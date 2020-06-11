var util = {}


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
    if (metaObj.hasOwnProperty(key)) {
      const metaData = metaObj[key];
      let { attriArr, content } = metaData
      _resetMeta(doc, attriArr, key, content)
    }
  }
}

export default util