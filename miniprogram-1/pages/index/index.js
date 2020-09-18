//index.js
// const audioctx = wx.createInnerAudioContext();
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    imgurl:"http://localhost:8080/static/image/",
    imgu:"",
    isplay:false,
    dots:true,
    cir:true,
    scrolltop:0,
    intoview:"",
    imgUrls:[
      "/image/core1.jpg",
      "/image/core2.jpg",
      "/image/core5.jpg"
    ],
    autoplay:true,
    interval:5000,
    duration:1500,

    avator:'',
    index:['0','1','2','3'],
    animationData:{}
  },
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    var that = this;
    // var ur=that.data.imgUrls;
    var _imgurl = that.data.imgurl;
    // console.log(ur[0])
    console.log("--index page onShow--")
    //请求轮播图数据
    wx.request({
      url: 'http://localhost:8080/ann',
      success: function (res) {
        for (var i = 0; i < res.data.length; i++) {
          // console.log("i=" + i)
          var ulr = 'imgUrls[' + i + ']';
          that.setData({ [ulr]: _imgurl + res.data[i].annPicUrl })
          // console.log("url="+ulr)
        }
      }
    })

    //请求通知类数据
    wx.request({
      url: 'http://localhost:8080/no',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var index1 = 0;
        var index2 = 0;
        console.log(res);
        var noticeurl = that.data.noticeurl;
        var notice = that.data.notice
        that.setData({ notice: res.data })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("--index page onReady--")
    this.audioCtx = wx.createAudioContext('myAudio')
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
    console.log("--index page onHide--")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("--index page onUnload--")
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
  itemClick:function(){
    wx.reLaunch({
      url: '../logs/logs?id=1&title="日志详情"',
    })
    // wx.redirectTo({
    //   url: '../logs/logs',
    // })
  },
  scrollToUpper:function(event){
    console.log(event)
  },
  scrollToLower:function(event){
    console.log(event)
  },
  scroll:function(event){
    // console.log(event)
  },
  click:function(){
     console.log("click...")
     this.setData({intoview:"demo4"})
  },
  change:function(event){
    // console.log(event)
  },
  allnews:function(){
    wx.navigateTo({
      url: '/pages/detail/detail',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }

})
