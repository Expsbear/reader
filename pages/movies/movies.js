var util = require('../../utils/util.js')
var app = getApp()
Page({
  data:{
    inTheaters:{},
    comingSoon:{},
    top250:{},
    searchResult:{},
    containerShow:true,
    searchPanelShow:false
  },

  onLoad:function(event){
    var inTheatersUrl = app.globalData.doubanBase
    +"/v2/movie/in_theaters"+"?start=0&count=3";

    var comingSoonUrl = app.globalData.doubanBase
    +"/v2/movie/coming_soon"+"?start=0&count=3";

    var top250Url = app.globalData.doubanBase
    +"/v2/movie/top250"+"?start=0&count=3";

    this.getMoviesListData(inTheatersUrl,"inTheaters","正在热映");
    this.getMoviesListData(comingSoonUrl,"comingSoon","即将上映");
    this.getMoviesListData(top250Url,"top250","豆瓣Top250");
  },

  // 点击更多传递相应影片类别
  onMoreTap:function(event){
    var category = event.currentTarget.dataset.category
    wx.navigateTo({
      url: "more-movie/more-movie?category=" + category
    })
  },

  // 点击影片传递相对应id
  onMovieTap:function(event){
    var movieId = event.currentTarget.dataset.movieid  //注意：是movieid而不是movieId
    wx.navigateTo({
      url: "movie-detail/movie-detail?movieId=" + movieId
    })
    console.log(movieId)
  },

  getMoviesListData:function(url,settedKey,categoryTitle){
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "application/texts"
      },
      success: function (res) {
        that.processDoubanData(res.data, settedKey, categoryTitle)
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },

  // 搜索聚焦
  onBindFocus:function(event){
    this.setData({
      containerShow:false,
      searchPanelShow:true
    })
  },

  // 关闭搜索内容
  onCancelTap:function(event){
    this.setData({
      containerShow: true,
      searchPanelShow: false
    })
  },
  
  // 输入关键字搜索相关影片
  onBindBlur:function(event){
    var text = event.detail.value
    var searchUrl = app.globalData.doubanBase
      + "/v2/movie/search?q=" + text;
    this.getMoviesListData(searchUrl,"searchResult","")
  },

  processDoubanData: function (moviesDouban, settedKey, categoryTitle){
    var movies=[];
    for (var index in moviesDouban.subjects){
      var subject = moviesDouban.subjects[index];
      var title = subject.title;
      if(title.length>=6){
        title = title.substring(0,6)+"..."
      }
      var temp={
        stars: util.convertToStarsArray(subject.rating.stars),
        title:title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        movieId:subject.id
      }
      movies.push(temp)
    }
    var readyData={};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies:movies
    }
    this.setData(readyData)
  }

})