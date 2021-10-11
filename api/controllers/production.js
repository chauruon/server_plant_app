const product = require('../models/production_model')


// thêm sản phẩm
exports.create_product =  (req,res) => {
    if(!req.body){
        res.status(400).send({message:"Vui lòng nhập đủ thông tin sản phẩm"})
        return;
    }
    let new_product =  new product(req.body);
    new_product.save(new_product).then(data => {
       res.status(200).send({ 
           status: true,
           message: 'Thêm thành công',
           data : data
       })
    }).catch(err => {
        res.status(500).send({
            status:false,
            message:'Thêm thất bại',
        })
    })
}


// xóa sản phẩm
exports.delete_product = async (req, res) =>{
    var id_delete = req.params.id ? {_id:req.params.id} : {};
    product.findByIdAndDelete(id_delete,(err,data) => {
        if(err){
            res.status(400).send({
                status:false,
                message:'Xóa thất bại',
                err : err
            })
        }else if(!data){
            res.status(500).send({ 
                status: false,
                message: 'Server lỗi',
                data : err
            })
            console.log(data)
            
        }else{
            res.status(200).send({
                status:true,
                message: 'Xóa thành công',
                data : data
            })
        }
    })
}

//get all production
exports.get_product = (req,res) => {
    try {
        product.find({})
        .then(data => {
          if(!data){
            res.status(500).send({
              status:false,
              message:'Server error!',
            })
            return data
          }else{
            res.status(200).send({
              status:true,
              data:data
            })
          }})
        .catch(err =>{
          res.status(400).send({
            status:false,
            message:'Not Found',
          })
          return data
        })
    } catch (error) {
        console.log(error)
    }
  }

// update sản phẩm
exports.update_product = (req, res) => {
    var id_updates = req.params.id ? {_id :req.params.id}: {};
    product.findByIdAndUpdate(id_updates,{
        picture : req.body.picture,
        name : req.body.name,
        price : req.body.price,
        size : req.body.size,
        info : req.body.info,
    }).catch(err =>{
       return res.status(400).send({
            status:false,
            message:'Cập nhật thất bại',
            err : err
        })
    }).then(data =>{
       if(!data){
          return res.status(500).send({
            status:false,
            message:'Cập nhật thất bại',
           })
       }else{
        res.status(200).send({ 
            status: 200,
            message: 'Cập nhật thành công',
            data : data
        })
       }
    })
}