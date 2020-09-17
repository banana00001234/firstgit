package com.graduate.springboot.Service;

import com.graduate.springboot.Dao.entity.Candidate;

import java.sql.SQLException;
import java.util.List;

public interface CandidateService {
    public void setCandi(Candidate candidate);
    List<Candidate>selectByOpenid(String openid);
    public int updateCandi(Candidate candidate);
    List<Candidate>selectByIdNumber(String candidateIdnumber);
    public int insertNoRepeatInfo(Candidate candidate) ;
     void autoIncrement();
     void inserttest();
     List<Candidate>selectByPage(int pagenum,int limit);
     List<Candidate>getallcandi();
     public int adminInsertCandi(Candidate candidate);
     public int updateByPrimaryKey(Candidate candidate);
     public int deleteByPrimaryKey(int id);
}
