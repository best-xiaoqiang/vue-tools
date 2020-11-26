/*
  自定义QQ发网址显示卡片内容：https://www.mom1.cn/3235.html
  vue中动态设置meta标签和title标签的方法：https://www.jb51.net/article/143575.htm
  html中替换meta标签内容: https://www.cnblogs.com/jigang/p/13067246.html
  手把手带你使用JS-SDK自定义微信分享效果: https://www.cnblogs.com/backtozero/p/7064247.html
*/
import wx from 'weixin-js-sdk' // npm i -S weixin-js-sdk
const DEFAULT_SHARE_COVER = ''
const DEFAULT_SHARE_TITLE = '我是默认标题'
const DEFAULT_SHARE_DESC = '我是默认描述'

export const setShareCard = function (shareConfig) {
  let { imgUrl, desc, title, link } = shareConfig
  // 设置默认值
  shareConfig = {
    imgUrl: imgUrl || DEFAULT_SHARE_COVER,
    desc: desc || DEFAULT_SHARE_DESC,
    title: title || DEFAULT_SHARE_TITLE,
    link: link || window.location.href
  }
  setQQShareCard(shareConfig)
  setWxShareCard(shareConfig)
}
// QQ通过动态设置meta自定义分享卡片
function setQQShareCard(shareConfig) {
  let { title, desc, imgUrl } = shareConfig
  let metaArr = [
    {
      attriKeyArr: ['itemprop'],
      attriVal: 'name',
      content: title
    },
    {
      attriKeyArr: ['name', 'itemprop'],
      attriVal: 'description',
      content: desc
    },
    {
      attriKeyArr: ['itemprop'],
      attriVal: 'image',
      content: imgUrl
    }
  ]
  metaArr.forEach(metaData => resetMeta(metaData))
}
function resetMeta(metaData) {
  let { attriKeyArr, attriVal, content } = metaData
  let headDom = document.getElementsByTagName('head')
  let metaDom = document.querySelector(`meta[${attriKeyArr[0]}="${attriVal}"]`)
  if (metaDom) headDom[0].removeChild(metaDom)
  metaDom = document.createElement('meta')
  attriKeyArr.forEach(attriKey => {
    metaDom.setAttribute(attriKey, attriVal)
  })
  metaDom.content = content
  headDom[0].appendChild(metaDom)
}
// 微信通过JS-SDK自定义分享卡片
async function setWxShareCard(shareConfig) {
  let { imgUrl, desc, title, link } = shareConfig
  let messageConfig = { imgUrl, desc, title, link }
  let timelineConfig = { imgUrl, title, link } // 朋友圈没有desc
  let { appId, timestamp, nonceStr, signature } = await getWxConfigData()
  wx.config({
    debug: false,
    appId,
    timestamp,
    nonceStr,
    signature,
    jsApiList: [
      'updateAppMessageShareData', // 聊天消息
      'updateTimelineShareData' // 朋友圈
    ]
  });
  wx.ready(function () {
    wx.updateAppMessageShareData(messageConfig)
    wx.updateTimelineShareData(timelineConfig)
  })
}
function getWxConfigData() {
  // TODO 从后端请求并返回{ appId, timestamp, nonceStr, signature }
}