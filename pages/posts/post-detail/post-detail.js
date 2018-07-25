var postsData = require('../../../data/posts-data.js')
var app = getApp();

Page({
  data:{

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.data.currentPostId = postId;
    this.setData({
      postsData: postsData.postsList[postId],
    });
    var postsCollected = wx.getStorageSync("post_collected")
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      })
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("post_collected", postsCollected);
    }

    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentPostId===
      postId){
      this.setData({
        isPlayingMusic:true
      })
    }

    this.setMusicMonitor();

  },
  
  setMusicMonitor:function(){
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true
      app.globalData.g_currentPostId = that.data.currentPostId
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentPostId = null
    });
    wx.onBackgroundAudioStop(function(){
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentPostId = null
    })
  },


  onCollectionTap: function (event) {
    var postsCollected = wx.getStorageSync("post_collected");
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    this.showModal(postsCollected, postCollected)
  },


  showModal: function (postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: '收藏',
      content: postCollected ? '收藏本文章？' : '取消收藏本文章？',
      showCancel: 'true',
      cancelText: '取消',
      cancelColor: '#333',
      confirmText: '确认',
      confirmColor: "#405f80",
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('post_collected', postsCollected);
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  },


  showToast: function (postsCollected, postCollected) {
    wx.setStorageSync('post_collected', postsCollected);
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      duration: 800,
      icon: 'success'
    })
  },

  
  onShareTap: function (event) {
    var itemList = [
      '分享给微信好友',
      '分享到朋友圈',
      '分享到QQ',
      '分享到微博'
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function (res) {
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '现在无法进行分享',
        })
      }

    })
  },


  onMusicTap: function () {
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postsList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic:false
      })
    } else{
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg,
      })
      this.setData({
        isPlayingMusic:true
      })
    }
  }


})