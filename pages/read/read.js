import postList from '../../data/posts-data';
import wxp from '../../utils/wx-promise';
Page({
  data: {},
  onLoad() {
    this.setData({ postList });
  },
  readDetail(e) {
    let postId = e.currentTarget.dataset.postId;
    wxp.navigateTo({
      url:'/pages/read/read-detail/read-detail?id=' + postId
    })
  }
});
