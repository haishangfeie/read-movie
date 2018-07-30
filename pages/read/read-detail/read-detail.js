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
    let collected = {};
    wxp
      .getStorage({
        key: 'isCollected'
      })
      .then(res => {
        collected = res.data;
      })
      .catch(err => {
        collected = {};
      });
    collected[postId] = !this.data.isCollected;
    wxp
      .setStorage({
        key: 'isCollected',
        data: collected
      })
      .then(res => {
        this.setData({
          isCollected: collected[postId]
        });
      });
  },
  share() {
    this.setData({
      isShared: !this.data.isShared
    });
  }
});
