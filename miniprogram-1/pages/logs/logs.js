
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    articleId:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("--logs page onload")
    console.log("option="+options.id)
    console.log("title="+options.title)
    this.setData({articleId:options.id})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("--logs page onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("--logs page onShow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("--logs page onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("--logs page onUnload")
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
    
  },
  onGetUserInfo: function (e) {
    var that=this
    wx.showNavigationBarLoading()
    wx.login({
      success(e) {
        wx.getSetting({
          success:function(res){
            if (res.authSetting['scope.userInfo']){//查看用户是否已授权
              wx.getUserInfo({
                success: function (info) {
                  console.log(info);
                  console.log("rowdata=" + info.rawData)
                  wx.request({
                    url: 'http://localhost:8080/login',
                    data: {
                      code: e.code,
                      rowData: info.rawData,
                      signature: info.signature,
                      encryptedData: info.encryptedData,
                      iv: info.iv
                    },
                    success: function (anwser) {
                      console.log("sessionid=" + anwser.data)
                      that.setData({ [app.globalData.userinfo]: info.userInfo })
                      wx.setStorageSync("skey", { time: Date.now(), data: anwser.data })
                      wx.setStorageSync("userinfo", info.userInfo) 
                      wx.hideNavigationBarLoading()
                      var pages=getCurrentPages();
                      if(pages.length>2){
                        wx.navigateBack({
                          delta: 1
                        })
                      }
                    },
                    fail:function(e){
                      wx.hideNavigationBarLoading()
                      wx.showToast({
                        title: '网络错误',
                        icon:'none'
                      })
                    }
                  })
                }
              })
            }
            else{
              var  usinfo=wx.getStorageSync("userinfo")
              wx.request({
                url: 'http://localhost:8080/login',
                data: {
                  code: e.code,
                  rowData: usinfo.rawData,
                  signature: usinfo.signature,
                  encryptedData: usinfo.encryptedData,
                  iv: usinfo.iv
                },
                success: function (anwser) {
                  console.log("sessionid=" + anwser.data)
                  that.setData({ [app.globalData.userinfo]: usinfo.userInfo })
                  wx.setStorageSync("skey", { time: Date.now(), data: anwser.data })
                  wx.hideNavigationBarLoading()
                  var pages = getCurrentPages();
                  if (pages.length > 2) {
                    wx.navigateBack({
                      delta: 1
                    })
                  }
                },
                fail: function (e) {
                  wx.hideNavigationBarLoading()
                  wx.showToast({
                    title: '网络错误',
                    icon: 'none'
                  })
                }

              })
            }
          }
        })
        
      }
    })
  }
})
