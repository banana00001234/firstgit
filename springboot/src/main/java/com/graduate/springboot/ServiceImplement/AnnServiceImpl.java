package com.graduate.springboot.ServiceImplement;

import com.graduate.springboot.Dao.EntityMapper;
import com.graduate.springboot.Dao.entity.Entity;
import com.graduate.springboot.Service.AnnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnnServiceImpl implements AnnService {
    @Autowired
    private EntityMapper entity;

    @Override
    public List<Entity> getAnn() {
        return entity.selectAnn();
    }
}
