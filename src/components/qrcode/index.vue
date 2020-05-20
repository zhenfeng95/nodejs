<!-- @format -->

<template>
  <div id="qrCode" ref="qrCodeDiv" @click="downloadQr"></div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  data() {
    return {}
  },
  methods: {
    bindQRCode() {
      new QRCode(this.$refs.qrCodeDiv, {
        text: 'https://www.baidu.com',
        width: 200,
        height: 200,
        colorDark: '#111111', //二维码颜色
        colorLight: '#ffffff', //二维码背景色
        correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
      })
    },
    downloadQr(e) {
      const imgUrl = e.target.src
      // 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候），那么调用该方法去下载图片
      if (window.navigator.msSaveOrOpenBlob) {
        var bstr = atob(imgUrl.split(',')[1])
        var n = bstr.length
        var u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        var blob = new Blob([u8arr])
        window.navigator.msSaveOrOpenBlob(blob, 'chart-download' + '.' + 'png')
      } else {
        // 这里就按照chrome等新版浏览器来处理
        const a = document.createElement('a')
        a.href = imgUrl
        a.setAttribute('download', 'chart-download')
        a.click()
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.bindQRCode()
    })
  }
}
</script>

<style lang="scss" scoped>
.device {
  ul {
    display: flex;
    text-align: left;
    li {
      position: relative;
      div {
        margin: 10px 0;
      }
    }
    .button {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}
</style>
