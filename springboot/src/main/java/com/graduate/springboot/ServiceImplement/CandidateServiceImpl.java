package com.graduate.springboot.ServiceImplement;

import com.graduate.springboot.Dao.CandidateMapper;
import com.graduate.springboot.Dao.entity.Candidate;
import com.graduate.springboot.Service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class CandidateServiceImpl implements CandidateService{

    @Autowired
    private CandidateMapper candidateMapper;
    @Override
    public void  setCandi(Candidate candidate){

         candidateMapper.insert(candidate);

    };
    @Override
    public List<Candidate>selectByOpenid(String openid){
         return candidateMapper.selectByOpenid(openid);
    }

    @Override
    public  int updateCandi(Candidate candidate){
        return candidateMapper.updateByOpenId(candidate);
    }

    @Override
    public List<Candidate>selectByIdNumber(String candidateIdnumber) {
        return candidateMapper.selectByIdNumber(candidateIdnumber);
    }
    @Override
    public  int insertNoRepeatInfo(Candidate candidate)  {
        return candidateMapper.insertNoRepeatInfo(candidate);
    }
    @Override
    public void autoIncrement(){
        candidateMapper.autoIncrement();
    }
    @Override
    public void inserttest(){
        candidateMapper.inserttest();
    }
    @Override
    public List<Candidate>selectByPage(int pagenum,int limit){
        return candidateMapper.selectByPage(pagenum,limit);
    }
    @Override
    public List<Candidate>getallcandi(){
        return candidateMapper.getallcandi();
    }
    @Override
    public int adminInsertCandi(Candidate candidate){
        return candidateMapper.adminInsertCandi(candidate);
    }
    @Override
    public int updateByPrimaryKey(Candidate candidate){
        return candidateMapper.updateByPrimaryKey(candidate);
    }
    @Override
    public  int deleteByPrimaryKey(int id){
        return candidateMapper.deleteByPrimaryKey(id);
    }

}
