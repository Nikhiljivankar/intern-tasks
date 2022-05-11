const req = require("express/lib/request");
const res = require("express/lib/response");
const db = require("../model");
var jwt=require("jsonwebtoken");
const config = require("../config/auth.config");
const { users } = require("../model");
const User = db.users;
const Op = db.Sequelize.Op;

// const emailvalidator = require("email-validator");


exports.signUp = async (req, res) => {
  
  const user = {
    Name: req.body.Name,
    Age: req.body.Age,
    Gender: req.body.Gender,
    Email: req.body.Email,
    Password:req.body.Password
  };
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

exports.findAll=(req,res)=>{
  const Name =req.query.title
  var condition = Name ? {Name:{[Op.like]: `%${Name}%`}} :null

  User.findAll({where : condition}).then(data=>{
    res.send(data)}).catch(err=>{
      res.status(500).send({
        message:err.message
      })
    })
  
}

exports.signIn=(req,res)=>{
  const id =req.params.id

  User.findByPk(id).then(data=>{
    var token=jwt.sign({id:users.id},config.secret,{
      expiresIn:86400
    })
    res.send({
      Data:data,
      accessToken:token

    })
  }).catch(err=>{
    res.status(500).send({
      message:err.message
    })
  })
}

exports.update= (req,res)=>{
  const id = req.params.id

  User.update(req.body,{
    where:{id: id}
  }).then(num=>{
    if(num==1){
      res.send({
        message: "user updated sucessfully!"    })
    }else{
      res.send({
        message:`Cannot Update user with id=${id}. Maybe User was not found`

      })
    }
  }).catch(err=>{
    res.status(500).send({
      message:`Error Updating Tutorial with id=${id} `
    })
})


}

exports.delete=(req,res)=>{
  const id = req.params.id

  User.destroy({
    where:{id:id}
  }).then(num=>{
    if(num==1){
      res.send({
        message:"user deleted sucessfully!"
      })
    }else{
      res.send({
        message:`cannot delete user with id=${id}`
      })
    }
  }).catch(err=>{
    res.status(500).send({
      message:`could not delete user eith id=${id}`
    })
  })
}

exports.deleteAll=(req,res)=>{
  User.destroy({
    where:{},
    truncate:false
  }).then(nums=>{
    res.send({
      message:`${num} User were deleted sucessfully!`
    }).catch(err=>{
      res.send({
        message:err.message
      })
    })
  })
}