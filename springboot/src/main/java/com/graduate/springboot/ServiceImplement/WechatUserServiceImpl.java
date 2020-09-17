package com.graduate.springboot.ServiceImplement;


import com.graduate.springboot.Dao.WechatUserMapper;
import com.graduate.springboot.Dao.entity.WechatUser;
import com.graduate.springboot.Service.WechatUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WechatUserServiceImpl implements WechatUserService {
    @Autowired
    private WechatUserMapper wechatUserMapper;
    @Override
    public WechatUser getuserinfo(String openid){
        return wechatUserMapper.selectByOpenid(openid);
    }
    @Override
    public WechatUser getBySessionKey(String custom_code){
        return wechatUserMapper.selectBySessionKey(custom_code);
    }
}
