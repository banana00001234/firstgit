package com.graduate.springboot.Service;

import com.graduate.springboot.Dao.entity.Admin;

import java.util.List;

public interface AdminService {
    List<Admin> selectAdmin(String password);
}
