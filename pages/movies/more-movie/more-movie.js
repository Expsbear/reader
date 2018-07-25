var util = require('../../../utils/util.js')
var app = getApp()
Page({
  data: {
    navigateTile:'',
    requestUrl:"",
    totalCount:0,
    isEmpty:true
  },

  onLoad: function (options) { 
    var category = options.category;
    this.data.navigateTitle = category;
    console.log(category)
    var dataUrl = "";
    switch (category){
      case "正在热映":
        dataUrl = app.globalData.doubanBase
          + "/v2/movie/in_theaters"
      break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase
          + "/v2/movie/coming_soon"
      break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase
          + "/v2/movie/top250"
      break;
    }
    this.data.requestUrl = dataUrl
    util.http(dataUrl, this.processDoubanData)
  },
  
  //scroll-view组件不能同时存在刷新和加载更多
  // onScrollLower:function(event){
  //   var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20"
  //   util.http(nextUrl, this.processDoubanData)
  //   wx.showNavigationBarLoading()
  // },

  //页面下拉刷新
  onReachBottom:function(event){
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20"
    util.http(nextUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },

  //页面上拉加载更多
  onPullDownRefresh:function(event){
    var refreshUrl = this.data.requestUrl + "?start=0&count=20"
    this.data.movies = {}
    this.data.isEmpty = true
    util.http(refreshUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },

  //注意：是movieid而不是movieId
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid  
    wx.navigateTo({
      url: "../movie-detail/movie-detail?movieId=" + movieId
    })
    console.log(movieId)
  },

  processDoubanData: function (moviesDouban){
    var movies = [];
    for (var index in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[index];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "..."
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var totalMovies = {}
    if(!this.data.isEmpty){
      totalMovies = this.data.movies.concat(movies)
    }else{
      totalMovies = movies
      this.data.isEmpty = false
    }
    this.setData({
      movies: totalMovies
    })
    this.data.totalCount += 20
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },
  
  onReady:function(event){
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  }
})