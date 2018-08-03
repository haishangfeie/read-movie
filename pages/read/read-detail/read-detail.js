import postList from '../../../data/posts-data';
import wxp from '../../../utils/wx-promise';
let innerAudioContext = null;
Page({
  data: {
    postItem: null,
    isPlaying: false,
    isCollected: false,
    isShared: false
  },
  onLoad(opts) {
    this.setData({ postItem: postList[opts.id], postId: opts.id });
    this.setMusic();
    // wxp
    //   .getStorage({
    //     key: 'collectedObj'
    //   })
    //   .then(res => {
    //     this.setData({
    //       isCollected: !!(res.data[this.data.postId])
    //     });
    //   })
    //   .catch(err => {
    //     this.setData({
    //       isCollected: false
    //     });
    //     wxp.setStorage({
    //       key: 'collectedObj',
    //       data: {}
    //     });
    //   });
    this.initCollectStatus();
  },
  initCollectStatus() {
    let collectObj = wx.getStorageSync('collectedObj');
    if (collectObj === '') {
      wx.setStorageSync('collectedObj', {});
      this.setData({
        isCollected: false
      });
      return;
    }
    this.setData({
      isCollected: !!collectObj[this.data.postId]
    });
  },
  onHide: function() {
    this.endMusic();
  },
  onUnload: function() {
    this.endMusic();
  },
  setMusic() {
    innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.src = this.data.postItem.music.url;
    innerAudioContext.onPlay(() => {
      console.log('开始播放');
    });
    innerAudioContext.onError(res => {
      console.log(res.errMsg);
      console.log(res.errCode);
    });
    innerAudioContext.onEnded(res => {
      console.log('结束了');
      this.setData({
        isPlaying: false
      });
    });
  },
  playOrPauseMusic() {
    this.setData({
      isPlaying: !this.data.isPlaying
    });
    if (this.data.isPlaying) {
      innerAudioContext.play();
    } else {
      innerAudioContext.pause();
    }
  },
  endMusic() {
    innerAudioContext.destroy();
    this.setData({
      isPlaying: false
    });
  },
  collect() {
    const postId = this.data.postId;
    let isCollected = this.data.isCollected;
    this.setData({
      isCollected: !isCollected
    });
    let collectedObj = wx.getStorageSync('collectedObj');
    if (collectedObj === '') {
      wx.setStorageSync('collectedObj', { [this.data.postId]: !isCollected });
      return;
    }
    collectedObj[this.data.postId] = !isCollected;
    wx.setStorageSync('collectedObj', collectedObj);
    // wxp
    //   .getStorage({
    //     key: 'collectedObj'
    //   })
    //   .then(res => {
    //     let obj = res.data;
    //     obj[postId] = !isCollected;
    //     return wxp.setStorage({
    //       key: 'collectedObj',
    //       data: obj
    //     });
    //   })
    //   .catch(err => {
    //     console.log('缓存失败');
    //     this.setData({
    //       isCollected: isCollected
    //     });
    //   });
  },
  share() {
    this.setData({
      isShared: !this.data.isShared
    });
  }
});
