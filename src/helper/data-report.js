/** @format */

import Store from '../store'
import utils from './utils'
import $ajax from './ajax'

class DateReport {
  reportData = {
    ctime: '', // 采集发生时间点，utc，精确到毫秒

    ugid: '', // 未登录时为空，只允许部分页面存在

    path: '', // 页面路径地址

    eleId: '', // 当前元素id

    sessionId: '', // 记录用户完整行为标识

    ua: navigator.userAgent, // 浏览器标识

    pageId: '' // 页面id
  }

  isInitLocation = false

  constructor() {
    this.init()
  }

  init() {
    // Object.assign(this.reportData, {
    //   appid: getAppId(),
    //   zuid: getStoreUuid(),
    //   ch_sub: getChSub(),
    //   ch: getCh(),
    //   tokenId: createTokenId()
    // })
  }

  report(data) {
    console.log(data)
    // return $ajax.post(
    //   `${process.env.VUE_APP_DATA_REPORT}?zuid=${encodeURIComponent(
    //     this.reportData.zuid
    //   )}=&appid=${encodeURIComponent(this.reportData.appid)}`,
    //   {
    //     customizeHeaders: {},
    //     data
    //   }
    // )
  }

  // axios 不支持设置不同请求  所以这里使用的是 原生的请求
  nativeReportAsync(data) {
    const xhr = new XMLHttpRequest()
    const url = `${process.env.VUE_APP_DATA_REPORT}?zuid=${encodeURIComponent(
      this.reportData.zuid
    )}=&appid=${encodeURIComponent(this.reportData.appid)}`
    xhr.open('post', url, false)
    xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8;')
    xhr.send(JSON.stringify(data))
  }

  /**
   * 点击数据上报
   * @param {Object} params //  params.eleId 元素 id
   * @param {Boolean} isLink 是否是跳转
   * @param {Boolean} outerChain 是否跳转外部链接
   */
  reportClick({ eleId = '' }, outerChain) {
    eleId = typeof eleId === 'function' ? eleId() : eleId
    console.log(eleId)
    const reportData = [
      Object.assign({}, this.reportData, {
        pageId: Store.state.global.currentPageId || '',
        eleId,
        path: location.pathname,
        ctime: new Date().getTime(),
        clickTime: new Date().getTime(),
        ugid: Store.state.user.userGid
      })
    ]

    // 设置同步的 ajax 延迟 dom 的卸载
    // if (outerChain) {
    //   const fn = () => {
    //     this.nativeReportAsync(reportData)

    //     window.removeEventListener('beforeunload', fn)
    //   }

    //   window.addEventListener('beforeunload', fn)
    //   return
    // }

    return this.report(reportData)
  }
}

export default new DateReport()
