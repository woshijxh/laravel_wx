import wepy from 'wepy'

export default class UnreadCount extends wepy.mixin {
  data = {
    // 轮询
    interval: null,
    // 未读消息数
    unreadCount: 0
  }
  // 页面显示
  onShow() {
    setTimeout(() => {
      // 延迟500毫秒调用，可视实际网络平均状况调整
      this.updateUnreadCount()
    }, 500)
    this.interval = setInterval(() => {
      this.updateUnreadCount()
    }, 30000)
  }
  // 页面隐藏
  onHide() {
    // 关闭轮询
    clearInterval(this.interval)
  }
  // 设置未读消息数
  updateUnreadCount() {
    // 从全局获取未读消息数
    this.unreadCount = this.$parent.globalData.unreadCount
    this.$apply()

    if (this.unreadCount) {
      // 设置 badge
      wepy.setTabBarBadge({
        index: 1,
        text: this.unreadCount.toString()
      })
    } else {
      // 移除 badge
      wepy.removeTabBarBadge({
        index: 1
      })
    }
  }
}
