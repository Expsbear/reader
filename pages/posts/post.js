var postsData = require('../../data/posts-data.js')

Page({
  data:{

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //按住alt + shit + f 可以格式化代码样式
    
    this.setData(
      { postsData: postsData.postsList}
    );
  },
  onPostTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    
  },
  onPostTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: './post-detail/post-detail?id=' + postId,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})