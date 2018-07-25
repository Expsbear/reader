//根据评分转化成数组[1,1,1,0,0]
function convertToStarsArray(stars){
  var num = stars.toString().substring(0,1);
  var array = [];
  for(var i=1;i<=5;i++){
    if(i<=num){
      array.push(1)
    }else{
      array.push(0)
    }
  }
  return array;
}

function http(url,callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "application/texts"
    },
    success: function (res) {
      callBack(res.data)
    },
    fail: function (error) {
      console.log(error)
    }
  })
}
//将所有影人用"/"分隔开
function convertToCastString(casts){
  var castsjoin = "";
  for(var index in casts){
    castsjoin = castsjoin + casts[index].name + "/"
  }
  return castsjoin.substring(0,castsjoin.length-1)
}

function convertToCastInfos(casts){
  var castsArray = []
  for(var index in casts){
    var cast = {
      img:casts[index].avatars?casts[index].avatars.large:"",
      name:casts[index].name
    }
    castsArray.push(cast)
  }
  return castsArray;
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http:http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}