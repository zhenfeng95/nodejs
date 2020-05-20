<!-- @format -->

<template>
  <div>
    <main class="app__layout-content">
      <video autoplay></video>
      <input
        type="file"
        capture="camera"
        id="camera"
        class="app__select-photos"
        @change="openCamera"
        value="打开二维码"
      />
      <!-- 兼容pc端扫码登录 -->
      <img
        :src="src"
        id="frame"
        alt
        :class="[appoverlay ? 'app__overlay' : '']"
        ref="img"
      />
    </main>

    <div class="app__overlay">
      <!-- 线条动画 -->
      <div class="custom-scanner" ref="scanningEle"></div>
    </div>
  </div>
</template>

<script>
/** @format */
import { createNamespacedHelpers } from 'vuex'
import QRReader from './qrscan.js'
const { mapState: mapStateWithGlobal } = createNamespacedHelpers('global')
export default {
  name: '',
  data() {
    return {
      isMediaStreamAPISupported:
        navigator &&
        navigator.mediaDevices &&
        'enumerateDevices' in navigator.mediaDevices,
      src: '',
      appoverlay: false,
      noCameraPermission: false
    }
  },
  computed: {
    ...mapStateWithGlobal(['isMobile'])
  },
  methods: {
    openCamera(event) {
      if (event.target && event.target.files.length > 0) {
        this.appoverlay = true
        this.src = URL.createObjectURL(event.target.files[0])
        if (!this.noCameraPermission)
          this.$refs.scanningEle.style.display = 'block'
        if (this.appoverlay) {
          this.$refs.img.style.borderColor = 'rgb(62, 78, 184)'
        }
        this.scan(true)
      }
    },
    scan(forSelectedPhotos = false) {
      let that = this
      if (this.isMediaStreamAPISupported && !this.noCameraPermission) {
        this.$refs.scanningEle.style.display = 'block'
      }
      if (forSelectedPhotos) {
        this.$refs.scanningEle.style.display = 'block'
      } else if (!this.isMobile) {
        this.$refs.scanningEle.style.display = 'none'
      }
      QRReader.scan(result => {
        this.$emit('scanResult', result)
      }, forSelectedPhotos)
    },
    setCameraOverlay() {
      this.$refs.img.style.borderColor = 'solid'
    }
  },
  mounted() {
    QRReader.init() //To initialize QR Scanner
    // Set camera overlay size
    setTimeout(() => {
      this.setCameraOverlay()
      if (this.isMediaStreamAPISupported) {
        this.scan()
      }
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
/** @format */

.app__layout-content {
  height: inherit;
}

.custom-menu-icon {
  font-size: 28px;
  line-height: 47px;
}

.custom-title,
.custom-menu-icon {
  color: #fff;
}

.custom-btn {
  position: fixed;
  right: 26px;
  bottom: 26px;
  background: #448aff;
  border-radius: 50%;
  border: none;
  width: 56px;
  height: 56px;
  outline: none;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  z-index: 9999;
}

.custom-btn:active {
  box-shadow: none;
}

.custom-msg {
  text-align: center;
  width: 90%;
  height: 50%;
  overflow: auto;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  font-size: 16px;
}

.custom-fab-icon {
  color: #fff;
  font-size: 30px;
  margin-top: 2px;
  user-select: none;
}

video {
  transform: translateX(-50%) translateY(-50%);
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  position: absolute;
}

#list li {
  list-style-type: none;
  text-decoration: underline;
  color: #00f;
}

.custom-copy-btn {
  opacity: 0;
}

.hide {
  display: none;
}

@-webkit-keyframes scanner {
  0% {
    bottom: 100%;
  }
  50% {
    bottom: 0%;
  }
  100% {
    bottom: 100%;
  }
}

@-moz-keyframes scanner {
  0% {
    bottom: 100%;
  }
  50% {
    bottom: 0%;
  }
  100% {
    bottom: 100%;
  }
}

@-o-keyframes scanner {
  0% {
    bottom: 100%;
  }
  50% {
    bottom: 0%;
  }
  100% {
    bottom: 100%;
  }
}

@keyframes scanner {
  0% {
    bottom: 100%;
  }
  50% {
    bottom: 0%;
  }
  100% {
    bottom: 100%;
  }
}

.custom-scanner {
  width: 100%;
  height: 2px;
  background: #4caf50;
  position: absolute;
  -webkit-transition: all 200ms linear;
  -moz-transition: all 200ms linear;
  transition: all 200ms linear;
  -webkit-animation: scanner 3s infinite linear;
  -moz-animation: scanner 3s infinite linear;
  -o-animation: scanner 3s infinite linear;
  animation: scanner 3s infinite linear;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.4);
  display: none;
}

/* #camera { */
/* opacity: 0; */
/* } */

.no-support {
  font-size: 20px;
  text-align: center;
}

.app__dialog {
  z-index: 12;
  background-color: #fff;
  width: 290px;
  height: 180px;
  border-radius: 2px;
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  box-shadow: 0 9px 46px 8px rgba(0, 0, 0, 0.14),
    0 11px 15px -7px rgba(0, 0, 0, 0.12), 0 24px 38px 3px rgba(0, 0, 0, 0.2);
}

.app__dialog h5 {
  margin-top: 20px;
  margin-left: 18px;
  font-weight: 500;
}

.app__dialog input {
  width: 250px;
  margin: 20px;
  height: 30px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  outline: none;
  font-size: 15px;
  margin-top: 25px;
  color: rgba(0, 0, 0, 0.54);
  font-weight: 500;
}

.app__overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  transition: all 200ms ease-in;
  width: 320px;
  height: 320px;
  margin: auto;
}

.app__overlay-left,
.app__overlay-right {
  width: 52px;
  height: 340px;
  background: #7f7f7f;
}

.app__overlay-left {
  margin-left: -57px;
  margin-top: -10px;
}

.app__overlay-right {
  margin-right: -57px;
  margin-top: -340px;
  float: right;
}

.app__overlay {
  border: 0;
}

.app__select-photos {
  color: #fff;
  position: absolute;
  bottom: -70px;
  font-size: 18px;
  right: 0;
  text-align: center;
  user-select: none;
}

.camera__icon,
.focus__icon {
  position: relative;
  left: 10px;
  display: none;
}

.app__select-photos {
  width: 58px;
  height: 58px;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: red;
  /* border-radius: 50%;
  background-color: #3f51b5;
  background-image: url('/images/photo-camera.svg');
  background-repeat: no-repeat;
  background-size: 26px;
  background-position: 16px 15px; */
}

.app__select-photos:active {
  opacity: 0.8;
}

/* input[type='file'] {
  display: none;
} */

#frame {
  width: auto;
  height: auto;
}
</style>
