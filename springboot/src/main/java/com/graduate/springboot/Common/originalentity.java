package com.graduate.springboot.Common;

public class originalentity {
    public String openid;

    private Integer status;

    private String message;

    private Object data;

    private int total;

    public static originalentity ErrorMsg(String message){
        return new originalentity(500,message);
    }
    public static originalentity success(Object data){
        return new originalentity(data);
    }
    public static originalentity error(Object data){
        return new originalentity(500,"error",data);
    }
    public originalentity(Object data){
        this.status=200;
        this.message="success";
        this.data=data;
    }
    public originalentity(Integer status,String message) {
        this.status = status;
        this.message = message;
    }
    public originalentity(Integer status,String message,Object data){
        this.status=status;
        this.message=message;
        this.data=data;
    }
    public originalentity(Integer status,String message,int total,Object data){
        this.status=status;
        this.message=message;
        this.total=total;
        this.data=data;
    }

    public Integer getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public static originalentity build(Integer status,String message,Object data){
        return  new originalentity(status,message,data);
    }
    public  void setOpenid(String openid) {
        this.openid = openid;
    }

    public String getOpenid() {
        return openid;
    }
}
