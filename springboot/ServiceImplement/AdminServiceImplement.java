package com.graduate.springboot.ServiceImplement;

import com.graduate.springboot.Dao.AdminMapper;
import com.graduate.springboot.Dao.entity.Admin;
import com.graduate.springboot.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AdminServiceImplement implements AdminService {
    @Autowired
    private AdminMapper adminMapper;
    public List<Admin>selectAdmin(String password){
        List<Admin> list=adminMapper.selectByPassword(password);
        return list;
    }
}
