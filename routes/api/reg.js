var express = require('express');
var router = express.Router();
var fs = require('fs');
const pathLib=require('path');
let uploadUrl=require('../../config/global').upload.user;//上传路径
let mgdb = require('../../common/mgdb');

router.post('/',(req,res,next)=>{

  let {username,password} = req.body;//拆除body数据
  console.log(req.body)
  let time=Date.now();//创建服务器上传时间

  //multer拆出上传图片,需要解决没有上传头像
 // let icon = req.files.length ? uploadUrl + req.files[0].filename + pathLib.parse(req.files[0].originalname).ext : '';
  // console.log(icon);
  // if(icon){
  //   fs.renameSync(
  //     req.files[0].path,
  //     req.files[0].path+pathLib.parse(req.files[0].originalname).ext
  //   )
  // }else{
  //   icon = '/upload/noimage.png';
  // }

  //需要先判断用户是否存在ing。。。。。。。
  mgdb(
    {
      collection:'user'
    },
    ({collection,client})=>{
      collection.find({username}).toArray((err,result)=>{
        if(!err && result.length>0){
          res.send(0)//msg:'用户名已存在'
        }else{
          collection.insertOne(
            {username,password,time}//follow:0,fans:0,nikename,icon,time
            ,
            (err,result)=>{
              if(!err && result.result.n){
                // console.log('result...........',result)
                res.send({data:result.ops[0]})//msg:'注册成功'
              }else{
                res.send(1)//,msg:'网络错误'
              }
              client.close();
            }
          )
        }
      })
      
    }
  );
  
})

module.exports=router;