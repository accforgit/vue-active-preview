<template>
  <div class="active-preview">
    <span class="preview-counter" v-if="showCounter && previewItemCount > 1" :style="counterStyle">{{activeIndex}} / {{previewItemCount - 2}}</span>
    <div
      class="preview-wrapper"
      ref="previewWrapper"
      :style="{
        transform: `translate3d(${transX}px, 0, 0)`,
        transition: isTransToX ? `transform ${duration}ms ease-out` : ''
      }"
      @touchstart="touchstartFn"
      @touchmove="touchmoveFn"
      @touchend="touchendFn"
      @transitionend="transitionEndFn">
      <div class="preview-box" v-for="(item, index) in currentList" :key="item._id">
        <div class="preview-item" :style="{
          left: (index === activeIndex ? left : '0') + 'px',
          top: (index === activeIndex ? top : '0') + 'px',
          width: index === activeIndex ? (currentW + 'px') : '100%',
          height: index === activeIndex ? (currentH + 'px') : '100%',
          transform: index === activeIndex ? `translate3d(${doubleSingleTransLeft}px, ${doubleSingleTransTop}px, 0) scale(${scaleValue})` : '',
          transformOrigin: `${transOriginX}px ${transOriginY}px`,
          backgroundImage: `url(${item.url})`,
          backgroundSize,
          transition: isDoubleTapScaling && index === activeIndex ? 'all 0.16s ease-out' : ''
        }"></div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
// 屏幕宽度
let clientW = document.documentElement.clientWidth
let clientH = document.documentElement.clientHeight

// 1：单指滑动；2：双指缩放，3：双指缩放后进行单指滑动查看缩放后的图片
let figureType = 0

// 单指操作 - 滑动坐标相关，即 figureType = 1
const singleTransferInfo = {
  // touchStart 点击坐标和时间戳
  startX: 0,
  startY: 0,
  // 上个周期中的tranlateX 坐标
  prevX: 0,
  // 当前是否需要自动滑动到下一张图片
  autoNext: false,
  // 滑动的方向，true为右滑，false为左滑
  directionFlag: true
}

// 双指缩放操作 - 滑动坐标相关，即 figureType = 2
const doubleTransferInfo = {
  startDistance: 0,
  maxScaleWidth: 0
}

// 双指缩放后进行单指滑动查看缩放后的图片 ，即 figureType = 3
const doubleSingleTransferInfo = {
  // touchStart 点击坐标
  startX: 0,
  startY: 0,
  prevX: 0,
  prevY: 0,
  lastClientX: 0,
  lastClientY: 0
}

// 用于辅助判断是否是双击/单击/长按事件
const touchStartInfo = {
  timeStamp: 0,
  startX: -1,
  startY: -1,
  isDoubleTap: false
}

// 当前正在预览的图片次序，用于位置计算
let activeIndex = 0
let criticalWidth = 0
// 用于取消自动轮播（如果指定了的话）
let autoPlayTimer = null
// previewWrapper上的触摸点数量
let touchCount = 0

// 兼容性相关
const raf = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || (callback => {
    setTimeout(callback, 1000 / 60)
  })
const cancelRaf = window.cancelAnimationFrame
  || window.webkitCancelAnimationFrame
  || window.mozCancelAnimationFrame
  || (handler => {
    clearTimeout(handler)
  })
let rafHandler = null

const isSupportGetBoundingClientRect = typeof document.documentElement.getBoundingClientRect === 'function'

function noOp () {}

export default {
  name: 'VueActivePreview',
  props: {
    urlList: {
      type: Array,
      required: true,
      default: () => []
    },
    // 图片以何种缩放的形式铺在 滑动容器框内
    backgroundSize: {
      type: String,
      required: false,
      default: 'contain'
    },
    maxScaleValue: {
      type: Number,
      required: false,
      // 最大放大倍数，默认为5，最小为 1，如果为0，则表示不进行放大倍数的限制
      default: 5,
      validator(value) {
        return value === 0 || value >= 1
      }
    },
    // 是否需要默认的计数器
    showCounter: {
      type: Boolean,
      required: false,
      default: true
    },
    // 自定义默认计数器的样式 
    counterStyle: {
      type: Object,
      required: false,
      default: null
    },
    // 单指操作 - 起始index
    startIndex: {
      type: Number,
      required: false,
      default: 0
    },
    // 单指操作 - 临界点的比例值，当超过这个临界点，则需要自动滑动到下一张图片
    criticalValue: {
      type: Number,
      required: false,
      default: 1 / 3
    },
    // 单指操作 - 自动滚动到固定位置所需的时间，单位是秒(ms)
    duration: {
      type: Number,
      required: false,
      default: 350,
      validator(value) {
        return value === 0 || value >= 0
      }
    },
    // 如果指定了此参数，并且值 >= 0，则将会将此值当做 delay的时间(单位为 ms)进行自动轮播；不指定则不自动轮播
    // 如果想要指定此值，一般建议设置为 3000
    autoPlayDelay: {
      type: Number,
      required: false,
      default: null,
      validator(value) {
        return value >= 0
      }
    },
    // 如果只有一个 swipe-item，则不允许拖动
    noDragWhenSingle: {
      type: Boolean,
      required: false,
      default: true
    },
    // 单指操作 - 每次滚动结束后的回调
    changeCallback: {
      type: Function,
      required: false,
      default: noOp
    }
  },
  data () {
    return {
      // 当前显示在DOM中的图片列表
      currentList: [],
      // 单指滑动的位移
      transX: 0,
      // 当前正在预览的图片次序
      activeIndex: 0,
      // 双指操作相关，双指缩放的比例
      scaleValue: 1,
      // 双指操作相关，缩放变换的基点
      transOriginX: '0',
      transOriginY: '0',
      // 双指操作相关，当前被缩放的图片的即时宽高
      currentW: clientW,
      currentH: clientH,
      // 双指操作相关，当前被缩放的图片的即时定位
      top: 0,
      left: 0,
      // 双指缩放后进行单指滑动查看缩放后的图片的定位
      doubleSingleTransLeft: 0,
      doubleSingleTransTop: 0,
      // 是否在双击缩放过程中
      isDoubleTapScaling: false,
      // 正在自动滚动到固定位置的过程中
      isTransToX: false,
      previewItemCount: 0
    }
  },
  created () {
    this.currentList = this.urlList.length > 1
      ? this.urlList.slice(-1).concat(this.urlList, this.urlList.slice(0, 1)).map((url, index) => ({ url, _id: index }))
      : this.urlList.map((url, index) => ({ url, _id: index }))

    this.previewItemCount = this.currentList.length
    criticalWidth = clientW * this.criticalValue
    if (this.previewItemCount > 1) {
      // 因为首尾都多加了一个previewItem元素，所以顺延一位
      this.activeIndex = activeIndex = this.getActiveIndex(this.startIndex + 1)
      singleTransferInfo.prevX = -clientW * activeIndex
      this.transX = -clientW * activeIndex
    }
    if (typeof this.maxScaleValue === 'number') {
      doubleTransferInfo.maxScaleWidth = clientW * this.maxScaleValue
    }
    this.autoPlayFn()
  },
  methods: {
    touchstartFn (e) {
      e.preventDefault()
      touchCount = e.touches.length
      if (this.isDoubleTapScaling) return
      // 取消自动轮播事件
      clearTimeout(autoPlayTimer)
      // 稳定下来后，应该的偏移位置
      const fixedTransX = -clientW * activeIndex
      if (this.isTransToX) {
        if (isSupportGetBoundingClientRect) {
          const rect = this.$refs.previewWrapper.getBoundingClientRect()
          this.isTransToX = false
          this.transX = singleTransferInfo.prevX = rect.left
        } else {
          figureType = 0
          return
        }
      }
      const touch0 = e.touches[0]
      if (touchCount === 1) {
        if (this.currentW === clientW || doubleSingleTransferInfo.exceedBoundary) {
          if (this.transX === fixedTransX && this.isDoubleTap(e)) {
            // 双击放大 -> 双指缩放
            figureType = 2
            this.doubleTapAction(touch0, true)
          } else {
            figureType = 1
            this.singleTouchStartFn(e)
          }
        } else if (this.currentW > clientW && this.transX === fixedTransX) {
          if (this.isDoubleTap(e)) {
            // 双击恢复 -> 双指缩放
            figureType = 0
            this.doubleTapAction(touch0, false)
          } else {
            // 双指缩放操作过程中，单指滑动查看放大后的图片
            figureType = 3
            this.doubleSingleTouchStartFn(e)
          }
        }
        // 用于判断 单击、双击、长按事件
        touchStartInfo.timeStamp = e.timeStamp
        touchStartInfo.startX = touch0.clientX
        touchStartInfo.startY = touch0.clientY
      } else if (touchCount === 2) {
        if (this.transX === fixedTransX) {
          figureType = 2
          // 双指缩放
          this.doubleTouchStartFn(e)
        }
      }
    },
    touchmoveFn (e) {
      e.preventDefault()
      if (this.isDoubleTapScaling) return
      const len = e.touches.length
      if (figureType === 1 && len === 1) {
        this.singleTouchMoveFn(e)
      } else if (figureType === 2 && len === 2) {
        this.doubleTouchMoveFn(e)
      } else if (figureType === 3 && len === 1) {
        this.doubleSingleTouchMoveFn(e)
      }
    },
    touchendFn (e) {
      e.preventDefault()
      const touches = e.touches
      touchCount = touches.length
      if (this.isDoubleTapScaling) {
        if (this.currentW === clientW) {
          // 缩小到正常大小，重启轮播（如果指定了的话）
          this.autoPlayFn()
        }
        return
      }
      // 手机触摸数量超过 2，则忽略
      if (touchCount > 2) return
      if (touchCount === 2) {
        if (this.transX === -clientW * activeIndex) {
          figureType = 2
          this.doubleTouchStartFn(e)
        }
        return
      }
      if (touchStartInfo.isDoubleTap) {
        // 重置
        touchStartInfo.isDoubleTap = false
        touchStartInfo.startX = -1
        touchStartInfo.startY = -1
        touchStartInfo.timeStamp = 0
      }
      
      if (figureType === 1) {
        if (touchCount === 0) {
          this.singleTouchEndFn()
        }
      } else if (figureType === 2) {
        if (this.scaleValue !== 1) {
          this.doubleTouchEndFn()
        }
      } else if (figureType === 3) {
        this.doubleSingleTouchEndFn(e)
      }
      // 更新状态
      if (touchCount === 1) {
        if (figureType !== 0) {
          singleTransferInfo.startX = doubleSingleTransferInfo.startX = touches[0].clientX
          singleTransferInfo.prevX = this.transX
          doubleSingleTransferInfo.startY = touches[0].clientY
          doubleSingleTransferInfo.prevX = this.doubleSingleTransLeft
          doubleSingleTransferInfo.prevY = this.doubleSingleTransTop
          if (this.transX === -clientW * activeIndex) {
            if (this.currentW !== clientW) {
              figureType = 2
            } else {
              figureType = 1
            }
          } else {
            figureType = 1
          }
        }
      } else {
        figureType = 0
      }
    },
    // 单指滑动行为 - start
    singleTouchStartFn (e) {
      if (this.ignoreTouch()) return
      // 取消还没结束的自动轮播（如果指定了轮播的话）
      clearTimeout(autoPlayTimer)
      singleTransferInfo.startX = e.touches[0].clientX
    },
    // 单指滑动行为 - move
    singleTouchMoveFn (e) {
      if (this.ignoreTouch()) return
      if (this.previewItemCount !== 1) {
        let transX = e.touches[0].clientX - singleTransferInfo.startX + singleTransferInfo.prevX
        if (transX > 0) {
          // 滑动到到第一个了
          singleTransferInfo.startX = e.touches[0].clientX
          // 矫正到正确位置
          singleTransferInfo.prevX = transX = -clientW * (this.previewItemCount - 2)
        } else if (transX < -clientW * (this.previewItemCount - 1)) {
          // 滑动到最后一个了
          singleTransferInfo.startX = e.touches[0].clientX
          // 矫正到正确位置
          singleTransferInfo.prevX = transX = -clientW
        }
        this.transX = transX
      } else {
        // 数量为1
        if (!this.noDragWhenSingle) {
          // 允许拖动
          this.transX = (e.touches[0].clientX - singleTransferInfo.startX) * 0.1 + singleTransferInfo.prevX
        }
      }
    },
    // 单指滑动行为 - end
    singleTouchEndFn () {
      if (this.ignoreTouch()) return
      if (this.previewItemCount !== 1 || !this.noDragWhenSingle) {
        let toX = this.previewItemCount === 1 ? 0 : this.getSingleTouchEndMultipleChildToX()
        if (this.transX === toX) {
          // 已经手动滑到正确的位置
          this.transEndFn()
        } else {
          // 自由滚动到合适的位置
          this.isTransToX = true
          this.transX = toX
          this.correctDurationAct()
        }
      }
    },
    // 单指滑动行为 - end，preview-item数量大于 1 的情况
    getSingleTouchEndMultipleChildToX () {
      let toX = 0
      let diffX = this.transX + clientW * activeIndex
      const wholeBlock = Math.floor(diffX / clientW)
      // 如果连续滑过超过一个 previewItem 块
      if (Math.abs(diffX) > clientW) {
        activeIndex = Math.ceil(-this.transX / clientW)
        diffX = diffX - clientW * wholeBlock
      }
      // diffX 大于0 说明是右滑，小于0 则是左滑
      if (diffX > 0) {
        singleTransferInfo.directionFlag = -1
        singleTransferInfo.autoNext = diffX > criticalWidth
        toX = singleTransferInfo.autoNext ? -clientW * (activeIndex - 1) : -clientW * activeIndex
      } else if (diffX < 0) {
        singleTransferInfo.directionFlag = 1
        singleTransferInfo.autoNext = Math.abs(diffX) > criticalWidth
        toX = singleTransferInfo.autoNext ? -clientW * (activeIndex + 1) : -clientW * activeIndex
      } else {
        singleTransferInfo.directionFlag = 0
        singleTransferInfo.autoNext = false
        toX = -clientW * activeIndex
      }
      return toX
    },
    transEndFn () {
      const currentActiveIndex = this.getActiveIndex(activeIndex + (singleTransferInfo.autoNext ? singleTransferInfo.directionFlag : 0))
      this.transX = singleTransferInfo.prevX = -clientW * currentActiveIndex
      // 双指放大后的单指滑动行为
      if (doubleSingleTransferInfo.exceedBoundary) {
        doubleSingleTransferInfo.exceedBoundary = false
        if (currentActiveIndex !== activeIndex) {
          this.left = 0
          this.top = 0
          this.currentW = clientW
          this.currentH = clientH
        }
      }
      this.activeIndex = activeIndex = currentActiveIndex
      this.changeCallback(this.activeIndex)
      // setTimeout是为了避免当 autoPlayDelay值被指定为 0 时无限轮播出现问题
      // 16.7 是 1000/60 的大约值
      setTimeout(() => {
        this.autoPlayFn()
      }, 16.7)
    },
    // 双指缩放行为 - start
    doubleTouchStartFn (e) {
      const targetTouch1 = e.touches[0]
      const targetTouch2 = e.touches[1]
      // 两指之间的中心点坐标，当做一个标准对齐坐标
      this.transOriginX = (targetTouch1.clientX + targetTouch2.clientX) / 2 - this.left
      this.transOriginY = (targetTouch1.clientY + targetTouch2.clientY) / 2 - this.top
      // 获取开始时两指间距离
      doubleTransferInfo.startDistance = this.getDistance(targetTouch1, targetTouch2)
    },
    // 双指缩放行为 - move
    doubleTouchMoveFn (e) {
      // 得到本次两指间的距离和上次两指间的距离比例，即为缩放比例
      this.scaleValue = this.getDistance(e.touches[0], e.touches[1]) / doubleTransferInfo.startDistance
    },
    // 双指缩放行为 - end
    doubleTouchEndFn () {
      let scaleValue = this.scaleValue
      // 缩放比例没有改变，无需更新状态
      if (scaleValue === 1) return
      let currentW = scaleValue * this.currentW
      let currentH = 0
      // 超出最大放大倍数了，需回退到最大倍数的状态
      if (doubleTransferInfo.maxScaleWidth !== 0 && currentW > doubleTransferInfo.maxScaleWidth) {
        currentW = doubleTransferInfo.maxScaleWidth
        // 重新计算本次 scaleValue
        scaleValue = currentW / this.currentW
      }
      // 如果缩放比例小于1，则恢复到1
      if (currentW < clientW) {
        currentW = clientW
        // 重新计算本次 scaleValue
        scaleValue = currentW / this.currentW
      }
      currentH = scaleValue * this.currentH
      let left = -(scaleValue - 1) * this.transOriginX + this.left
      let top = -(scaleValue - 1) * this.transOriginY + this.top
      // 缩放后的图片没有完全占据屏幕，则补全空白屏幕空间
      if (left < 0) {
        if (Math.abs(left) + clientW > currentW) {
          left = clientW - currentW
        }
      } else {
        left = 0
      }
      if (top < 0) {
        if (Math.abs(top) + clientH > currentH) {
          top = clientH - currentH
        }
      } else {
        top = 0
      }
      // 更新当前状态
      this.left = left
      this.top = top
      this.currentW = currentW
      this.currentH = currentH
      this.scaleValue = 1
    },
    // 双指缩放后，单指滑动查看大图行为 - start
    doubleSingleTouchStartFn (e) {
      // 如果有自动滚动未停止则将其取消掉
      if (rafHandler) {
        cancelRaf(rafHandler)
        rafHandler = null
        this.fixedDoubleSingleStatus()
      }
      doubleSingleTransferInfo.startX = e.touches[0].clientX
      doubleSingleTransferInfo.startY = e.touches[0].clientY
    },
    // 双指缩放后，单指滑动查看大图行为 - move
    doubleSingleTouchMoveFn (e) {
      const touch = e.touches[0]
      doubleSingleTransferInfo.speedX = touch.clientX - doubleSingleTransferInfo.lastClientX
      doubleSingleTransferInfo.speedY = touch.clientY - doubleSingleTransferInfo.lastClientY
      doubleSingleTransferInfo.lastClientX = touch.clientX
      doubleSingleTransferInfo.lastClientY = touch.clientY
      let transX = doubleSingleTransferInfo.lastClientX - doubleSingleTransferInfo.startX + doubleSingleTransferInfo.prevX
      let transY = doubleSingleTransferInfo.lastClientY - doubleSingleTransferInfo.startY + doubleSingleTransferInfo.prevY
      // 滚动到边界的情况
      if (transX > 0) {
        if (transX + this.left > 0) {
          // 左越界
          if (this.left === 0) {
            doubleSingleTransferInfo.exceedBoundary = true
            doubleSingleTransferInfo.lastClientX = doubleSingleTransferInfo.lastClientY= 0
            this.top = this.getLimitVerticalBoundaryTop(transY)
            singleTransferInfo.startX = e.touches[0].clientX
            figureType = 1
            transX = transY = 0
          } else {
            transX = -this.left
          }
        }
      } else if (transX < 0) {
        const maxLeft = clientW - this.currentW
        if (transX + this.left < maxLeft) {
          // 右越界
          if (this.left === maxLeft) {
            doubleSingleTransferInfo.exceedBoundary = true
            doubleSingleTransferInfo.lastClientX = doubleSingleTransferInfo.lastClientY= 0
            this.top = this.getLimitVerticalBoundaryTop(transY)
            singleTransferInfo.startX = e.touches[0].clientX
            figureType = 1
            transX = transY = 0
          } else {
            transX = maxLeft - this.left
          }
        }
      }
      if (transY > 0) {
        // 上边界
        if (transY + this.top > 0) {
          // 不允许越界
          this.top = transY = 0
        }
      } else if (transY < 0) {
        // 下边界
        if (transY + this.top < clientH - this.currentH) {
          this.top = clientH - this.currentH
          transY = 0
        }
      }
      this.doubleSingleTransLeft = transX
      this.doubleSingleTransTop = transY
    },
    // 双指缩放后，单指滑动查看大图行为 - end
    doubleSingleTouchEndFn () {
      if (doubleSingleTransferInfo.lastClientX) {
        doubleSingleTransferInfo.lastClientX = doubleSingleTransferInfo.lastClientY = 0
        // 惯性滚动
        this.frictionMove(doubleSingleTransferInfo.speedX, doubleSingleTransferInfo.speedY)
      } else {
        this.fixedDoubleSingleStatus()
      }
    },
    // 左、右越界时，上下边界的处理
    getLimitVerticalBoundaryTop(transY) {
      let nextTop = transY + this.top
      if (nextTop > 0) {
        nextTop = 0
      } else if (nextTop < clientH - this.currentH) {
        nextTop = clientH - this.currentH
      }
      return nextTop
    },
    frictionMove (speedX, speedY) {
      let doubleSingleTransLeft = null
      let doubleSingleTransTop = null
      rafHandler = raf(() => {
        speedX *= 0.9
        speedY *= 0.9
        doubleSingleTransLeft = this.doubleSingleTransLeft + speedX
        doubleSingleTransTop = this.doubleSingleTransTop + speedY
        if (doubleSingleTransLeft + this.left > 0) {
          doubleSingleTransLeft = -this.left
          speedX = 0
        } else if (clientW - this.currentW > doubleSingleTransLeft + this.left) {
          doubleSingleTransLeft = clientW - this.currentW - this.left
          speedX = 0
        }
        if (doubleSingleTransTop + this.top > 0) {
          // 上边界越界
          doubleSingleTransTop = -this.top
          speedY = 0
        } else if (clientH - this.currentH > doubleSingleTransTop + this.top) {
          // 下边界越界
          doubleSingleTransTop = clientH - this.currentH - this.top
          speedY = 0
        }
        this.doubleSingleTransLeft = doubleSingleTransLeft
        this.doubleSingleTransTop = doubleSingleTransTop
        if (Math.abs(speedX) < 1) speedX = 0
        if (Math.abs(speedY) < 1) speedY = 0
        if (speedX !== 0 || speedY !== 0) {
          this.frictionMove(speedX, speedY)
        } else {
          this.fixedDoubleSingleStatus()
        }
      })
    },
    fixedDoubleSingleStatus () {
      const doubleSingleTransLeft = this.doubleSingleTransLeft
      const doubleSingleTransTop = this.doubleSingleTransTop
      this.left = doubleSingleTransLeft + this.left
      this.top = doubleSingleTransTop + this.top
      this.doubleSingleTransLeft = this.doubleSingleTransTop = 0
      doubleSingleTransferInfo.prevX = doubleSingleTransferInfo.prevY = 0
      doubleSingleTransferInfo.lastClientX = doubleSingleTransferInfo.lastClientY = 0
    },
    // 是否是双击行为
    isDoubleTap (e) {
      touchStartInfo.isDoubleTap = e.timeStamp - touchStartInfo.timeStamp <= 250
        && Math.abs(e.touches[0].clientX - touchStartInfo.startX) < 30
        && Math.abs(e.touches[0].clientY - touchStartInfo.startY) < 30
      return touchStartInfo.isDoubleTap
    },
    // 双击放大/恢复状态，enlarge：是否是放大操作
    doubleTapAction (touch, isEnlarge) {
      // 正在滑动中则忽略双击缩放
      if (this.transX !== -clientW * activeIndex) return
      if (this.isTransToX) return
      this.isDoubleTapScaling = true
      if (isEnlarge) {
        // 需要放大
        this.transOriginX = touch.clientX
        this.transOriginY = touch.clientY
        this.scaleValue = 2
        this.doubleTouchEndFn()
      } else {
        // 需要缩小恢复到原始状态
        this.left = 0
        this.top = 0
        this.currentW = clientW
        this.currentH = clientH
      }
    },
    getActiveIndex (index) {
      if (this.previewItemCount === 1) return 0
      if (index >= this.previewItemCount - 1) return 1
      if (index <= 0) return this.previewItemCount - 2
      return index
    },
    // 获取两指点间的距离长度
    getDistance (p1, p2) {
      return Math.sqrt(Math.pow(p2.clientX - p1.clientX, 2) + Math.pow(p2.clientY - p1.clientY, 2))
    },
    transitionEndFn (e) {
      const targetClassName = e.target.className
      if (targetClassName === 'preview-wrapper') {
        // 单指滑动
        if (this.isTransToX) {
          // 单指操作 - 自动滑动结束
          this.isTransToX = false
          this.transEndFn()
        }
      } else if (targetClassName === 'preview-item') {
        // 缩放
        this.isDoubleTapScaling = false
      }
    },
    autoPlayFn () {
      // 判断是否满足自动轮播的条件
      if (this.previewItemCount > 1 && typeof this.autoPlayDelay === 'number' && this.autoPlayDelay >= 0
        && touchCount === 0
        && this.transX % clientW === 0
        && this.currentW === clientW) {
        autoPlayTimer = setTimeout(() => {
          activeIndex = activeIndex + 1
          this.transX = -clientW * activeIndex
          this.isTransToX = true
          this.correctDurationAct()
          // 校正
          singleTransferInfo.autoNext = false
        }, this.autoPlayDelay)
      }
    },
    // 如果没有传入 preview-item子元素，或者只传入了一个子元素并且 noDragWhenSingle为 true，
    // 则不对 touch 事件进行滑动响应
    ignoreTouch () {
      return this.previewItemCount === 0 || (this.previewItemCount === 1 && this.noDragWhenSingle)
    },
    // duration不正确或为0，导致不会触发transitionend函数，所以需要直接调用 transEndFn
    correctDurationAct () {
      if (typeof this.duration !== 'number' || this.duration <= 0) {
        this.isTransToX = false
        this.transEndFn()
      }
    }
  }
}
</script>

<style>
.active-preview {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #000;
  z-index: 1000;
}
.preview-counter {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  line-height: 44px;
  color: #fff;
  text-align: center;
  z-index: 1010;
}
.preview-wrapper {
  height: 100%;
  white-space: nowrap;
  font-size: 0;
}
.preview-box {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.preview-item {
  position: absolute;
  width: 100%;
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>
