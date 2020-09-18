// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      notype:[{text:"全部"},
              {text:"校园新闻"},
              {text:"学校通知"}],
      currentindex:"0",
      ishidden:true,
      notice:{},
      pageNum:1,
      pageSize:10,
      canloadmore:true
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    wx.request({
      url: 'http://localhost:8080/notice',
      header: {
        'content-type': 'application/json'
      },
      
      data:{
        type:'type0'
      },
      success: function (res) {
        var index1 = 0;
        var index2 = 0;
        console.log(res);
        var noticeurl = that.data.noticeurl;
        var notice = that.data.notice
        //  var nourl1 = 'noticeurl.type1.item['+index1+']';
        //  var nourl2 = 'noticeurl.type2.item['+index2+']';
        // for (let a = 0; a < res.data.length; a++) {
        //   var unixTimestamp = new Date(res.data[a].noDatetime)

        //   var birthday = unixTimestamp.getFullYear() + "-" + (unixTimestamp.getMonth() + 1) + "-" + unixTimestamp.getDate()
        //   res.data[a].noDatetime = birthday
        // }
        that.setData({ notice: res.data })
        //  var no=JSON.stringify(that.data.notice)
        console.log('res=' + that.data.notice[0].noTitle)
        //  for(var type=0;type< res.data.length;type++)
        //  {
        //    var jsonstr = JSON.stringify(res.data[type])
        //    console.log(noticeurl)
        //    if((res.data[type].noType=='type1')&&index1<4){
        //      console.log("type1:" + res.data[type].noType)
        //      that.setData({ ['noticeurl.type1.item['+index1+']']:res.data[type]})
        //      index1=index1+1
        //    }
        //    else if((res.data[type].noType=='type2')&&index2<4)          {
        //      that.setData({ ['noticeurl.type2.item[' + index2 + ']']:res.data[type]})
        //      index2=index2+1
        //    }
        //    else{
        //      break;
        //    }
        //  }
        //  console.log(index1)
        // //  that.setData({ ['noticeurl.type1.item[1]']: res.data[1]})
        //  console.log(noticeurl)
        //  console.log(noticeurl.type1.item[1].id)
      }
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
    wx.showNavigationBarLoading()
    var that = this;
    
      
      var type = "type" + that.data.currentindex
      wx.request({
        url: 'http://localhost:8080/notice',
        method: 'GET',
        data: {
          type
        },
        success: function (res) {
          var notice = that.data.notice
          //  var nourl1 = 'noticeurl.type1.item['+index1+']';
          //  var nourl2 = 'noticeurl.type2.item['+index2+']';
          // for (let a = 0; a < res.data.length; a++) {
          //   let unixTimestamp = new Date(res.data[a].noDatetime)

          //   let birthday = unixTimestamp.getFullYear() + "-" + (unixTimestamp.getMonth() + 1) + "-" + unixTimestamp.getDate() 
          //   res.data[a].noDatetime = birthday
          // }
          that.setData({ notice: res.data })
          that.setData({pageNum:1})
          wx.stopPullDownRefresh();
          wx.hideNavigationBarLoading();
        console.log('refdata'+res.data)
        }
      })
      console.log('refresh')
    
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
  onswitch:function(e){
     var that= this;
     if(that.data.currentindex!==e.currentTarget.dataset.indx){
     that.setData({currentindex:e.currentTarget.dataset.indx})
     var type="type"+that.data.currentindex
     wx.request({
       url: 'http://localhost:8080/notice',
       method:'GET',
       data:{
         type
       },
       success:function(res){
         var notice = that.data.notice
         //  var nourl1 = 'noticeurl.type1.item['+index1+']';
         //  var nourl2 = 'noticeurl.type2.item['+index2+']';
        //  for (let a = 0; a < res.data.length; a++) {
        //    let unixTimestamp = new Date(res.data[a].noDatetime)

        //    let birthday = unixTimestamp.getFullYear() + "-" + (unixTimestamp.getMonth() + 1) + "-" + unixTimestamp.getDate()
        //    res.data[a].noDatetime = birthday
        //  }
         that.setData({ notice: res.data })

       }
     })
     }
    console.log('e' + e.currentTarget.dataset.indx)
    console.log('c'+this.data.currentindex)
  },
  loadmore:function(notice,callback){
    var that=this;
    var type = "type" + that.data.currentindex
    var pageNum=that.data.pageNum;
    var lastitemindex=notice.length-1
    var noticetime=notice[lastitemindex].noDatetime;
    var noticeid=notice[lastitemindex].id;
    var unixTimestamp = new Date(noticetime) 
    var birthday = unixTimestamp.getFullYear() + "-" + (unixTimestamp.getMonth() + 1) + "-" + unixTimestamp.getDate() 
    noticetime = birthday;
    console.log('time='+birthday)
    wx.request({
      url: 'http://localhost:8080/noticemore',
      data:{
        type,
        pageNum,
        noticetime
      },
      success:function(res){
        if(res.data.status==200){
          if (res.data.data != "") {
            var arr = []
            for(let a=0;a<res.data.data.length;a++){
              if(res.data.data[a].id!=noticeid){  
                arr.push(res.data.data[a])
              }
            }
            that.setData({ notice: notice.concat(arr) })
            console.log('chenggong' + res.data.data)
          }
          else {
            wx.showToast({
              title: '暂无更多',
              icon: 'none',
              duration: 2000
            })
          }

        }
        else if(res.data.status==500){
          wx.showToast({
            title: res.data.message,
            icon:'none'
          })
        }
        
      }
    })
    if(callback){
      callback();
    }
  },
  onReachBottom:function(){
    console.log('why')
    this.setData({ishidden:false})
    
    var that=this
    // setTimeout(()=>{
    //   this.setData({ishidden:true})
    // },2000)
    if(that.data.canloadmore==true){
    that.setData({canloadmore:false})
    this.loadmore(that.data.notice,()=>{this.setData({ishidden:true});
      this.setData({ pageNum: that.data.pageNum+1 }
      ); this.setData({ canloadmore: true })
    })
    }
  }
})