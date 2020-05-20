/** @format */

export default {
  /**
   * 判断当前设备类型
   */
  getDeviceInfo() {
    const ua = navigator.userAgent
    const browser = {
      mobile: !!ua.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1, // android终端
      wx: ua.indexOf('MicroMessenger') > -1 // 是否微信
    }
    return browser
  }
}
