Page({
  data:{},
  ontap:function(){

    //switchTab只能跳转到带有tab的页面，而redirectTo和navigateTo不能跳转到带有tab的页面
    wx.switchTab({  
      url: '../posts/post',
    })
    
  }
})