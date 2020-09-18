// pages/select/select.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    candi_info:null,
    name:null,
    age:null,
    phone:null,
    birthday:null,
    email:null,
    nceescore:null,
    idnumber:null,
    nceewish:null,
    mansex:null,
    womansex:null,
    award:null,
    nativeplace:null,
    disabled:true
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var skey=wx.getStorageSync("skey")
    var skeytime = Date.now()-skey.time
    if(!skey.data||skeytime>120000){
        wx.showModal({
          title: '请重新登录授权',
          content: '',
          success:function(e){
            if(e.confirm){
              wx.navigateTo({
                url: '/pages/logs/logs',
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
              })
            }
            else{

            }
          }
        })
    }else{
    var that= this;
    wx.request({//查询登录用户的报名信息
      url: 'http://localhost:8080/selectcandidate',
      data:{
         sessionkey:skey.data
      },
      success:function(res){
        // console.log(res.data[0])
        if(res.data.status==200){
        that.data.candi_info=res.data.data[0]
        var candiInfo = res.data.data[0]
        that.setData({age:candiInfo.candidateAge,name:candiInfo.candidateName,
        phone:candiInfo.candidatePhone,
        birthday:candiInfo.candidateBirthday,
        award:candiInfo.candidateAward,
        email:candiInfo.candidateEmail,
        idnumber:candiInfo.candidateIdnumber,
        nativeplace:candiInfo.candidateNativeplace,
        nceescore:candiInfo.candidateNceeScore,
        nceewish:candiInfo.candidateNceeWish,
        
        })
        if(candiInfo.candidateSex=="man"){
          that.setData({mansex:true,womansex:false})
        }
        else{
          that.setData({mansex:false,womansex:true})
        }
        console.log(candiInfo)
        }
        else{
          wx.showToast({
            title: res.data.message,
            icon:'none'
          })
        }
      },
      fail:function(e){
        wx.showToast({
          title: '网络错误,请重试',
          icon:'none'
        })
      }
    })
  }
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

  },
  update(){
    this.setData({disabled:false})

  },
  update_cancel(){//重置信息到更改前的状态
    this.setData({
      disabled: true, 
      age: this.data.candi_info.candidateAge, 
      name: this.data.candi_info.candidateName,
      phone: this.data.candi_info.candidatePhone,
      birthday: this.data.candi_info.candidateBirthday,
      award: this.data.candi_info.candidateAward,
      email: this.data.candi_info.candidateEmail,
      idnumber: this.data.candi_info.candidateIdnumber,
      nativeplace: this.data.candi_info.candidateNativeplace,
      nceescore: this.data.candi_info.candidateNceeScore,
      nceewish: this.data.candi_info.candidateNceeWish})
    
  },
  updateInfo:function(e){
    var that=this;
      var sskey=wx.getStorageSync("skey")
      var sketime = Date.now() - sskey.time
      console.log(e.detail.value.candidate_age)
    if (!sskey.data){//若登录码为空提示用户登录
       that.setData({disabled:true})
       wx.showModal({
         title: '',
         content: '请重新登录',
         confirmText:'登录',
         success:function(e){
           if(e.confirm){
             wx.navigateTo({
               url: 'pages/logs/logs',
             })
           }else{
             console.log(e)
           }
         }
       })
     }
     else{
      if(Date.now()-sskey.time>120000){//若登录码过期提示用户重新登陆
        wx.showModal({
          title: '',
          content: '请重新登录',
          confirmText: '登录',
          success: function (e) {
            if (e.confirm) {
              wx.navigateTo({
                url: '../logs/logs',
              })
            } else {

            }
          }
        })
      }else{
        if (e.detail.value.candidate_name == "") {
          that.setData({ ['e.detail.value.candidate_name']: that.data.name })

        }
        if (e.detail.value.candidate_age == "") {
          that.setData({ ['e.detail.value.candidate_age']: that.data.age })

        }
        if (e.detail.value.candidate_phone == "") {
          that.setData({ ['e.detail.value.candidate_phone']: that.data.phone })

        }
        if (e.detail.value.candidate_sex == "") {
          that.setData({ ['e.detail.value.candidate_sex']: that.data.sex })

        }
        if (e.detail.value.candidate_birthday == "") {
          that.setData({ ['e.detail.value.candidate_birthday']: that.data.birthday })

        }
        if (e.detail.value.candidate_idnumber == "") {
          that.setData({ ['e.detail.value.candidate_idnumber']: that.data.idnumber })

        }
        if (e.detail.value.candidate_nativeplace == "") {
          that.setData({ ['e.detail.value.candidate_nativeplace']: that.data.nativeplace })

        }
        if (e.detail.value.candidate_email == "") {
          that.setData({ ['e.detail.value.candidate_email']: that.data.email })

        }
        if (e.detail.value.candidate_ncee_score == "") {
          that.setData({ ['e.detail.value.candidate_ncee_score']: that.data.nceescore })

        }
        if (e.detail.value.candidate_ncee_wish == "") {
          that.setData({ ['e.detail.value.candidate_ncee_wish']: that.data.nceewish })

        }
        if (e.detail.value.candidate_award == "") {
          that.setData({ ['e.detail.value.candidate_award']: that.data.award })

        }
        console.log(e.detail.value)
        wx.login({
          success: function (res) {
            wx.request({
              url: 'http://localhost:8080/update',
              data: {
                data: e.detail.value,
                code: res.code,
                skey: sskey.data
              },
              success: function (resp) {
                console.log(resp.data.message)
                if(resp.data.status==200){
                wx.showToast({
                  title: '更新成功',
                  icon:'none'
                })
                }else{
                  wx.showToast({
                    title: resp.data.message,
                    icon:'none'
                  })
                }
              }
            })
          }
        })
      }
     }
  },
  scoreInput: function (e) {
    let score = e.detail.value;
    let str = /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/
    if (str.test(score)) {
      if (score >= 0 && score < 1000 || score == "") {

      } else {
        wx.showToast({
          title: '请填写正确的数字',
          icon:'none'
        })
      }
    }
    else {
      wx.showToast({
        title: '请填写正确的数字',
        icon: 'none'
      })
    }
  },
  birthdayInput: function (e) {
    let birthday = e.detail.value;
    let str = /^(19|20)\d{2}-(1[0-2]|0?[1-9])-(0?[1-9]|[1-2][0-9]|3[0-1])$/;
    if (str.test(birthday) || birthday == "") {

    } else {
      wx.showToast({
        title: '请填写正确的年份',
        icon: 'none'
      })
    }
  },
  nameInput: function (e) {
    let name = e.detail.value;
    let str = /^[\u2E80-\u9FFF]+$/;
    if (str.test(name) || name == "") {

    } else {
      wx.showToast({
        title: '请填写正确的汉字',
        icon: 'none'
      })
    }
  },
  phoneInput: function (e) {
    let phone = e.detail.value;
    let str = /^1[34578]\d{9}$/;
    if (str.test(phone)) {

    } else {
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none'
      })
    }
  },
  ageInput: function (e) {
    let str = /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
    let age = e.detail.value;
    if (str.test(age)) {
      if (age >= 1 && age <= 150 || age == "") {

      }
      else {
        wx.showToast({
          title: '请填写正确的年龄',
          icon: 'none'
        })
      }
    } else {
      wx.showToast({
        title: '请填写正确的年龄',
        icon: 'none'
      })
    }
  },
  idnumberInput: function (e) {
    let idnumber = e.detail.value;
    let str = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if (str.test(idnumber)) {

    } else {
      wx.showToast({
        title: '请填写正确的身份证号',
        icon: 'none'
      })
    }
  },
  nativeInput: function (e) {
    let native = e.detail.value;
    let str = /^[\u2E80-\u9FFF]+$/;
    if (str.test(native) || native == "") {

    } else {
      wx.showToast({
        title: '请填写正确的籍贯',
        icon: 'none'
      })
    }
  },
  wishInput: function (e) {
    let wish = e.detail.value;
    let str = /^[\u2E80-\u9FFF]+$/;
    if (str.test(wish) || wish == "") {

    } else {
      wx.showToast({
        title: '请填写正确的志愿',
        icon: 'none'
      })
    }
  },
  emailInput: function (e) {
    let email = e.detail.value;
    let str = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (str.test(email)) {

    } else {
      wx.showToast({
        title: '请填写正确的邮箱',
        icon: 'none'
      })
    }
  }

})