package com.graduate.springboot.Service;

import com.graduate.springboot.Dao.entity.WechatUser;

import java.util.List;

public interface WechatUserService {
    WechatUser getuserinfo(String openid);
    WechatUser getBySessionKey(String custom_code);
}
