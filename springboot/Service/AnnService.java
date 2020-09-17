package com.graduate.springboot.Service;

import java.util.List;
import com.graduate.springboot.Dao.entity.Entity;
import org.apache.ibatis.annotations.Mapper;


public interface AnnService {
    List<Entity> getAnn();
}
