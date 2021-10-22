const User = require('../models/user_model');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { stringify } = require('uuid');

dotenv.config();

exports.signup = (req, res) => {
    if (!req.body.email || !req.body.password) {
		res.status(400).send({message: 'Nhập thông tin'});
		return;
    }
	const{name, email,password} = req.body;
    var emailInput = email ? {email: email} : {};
  
    User.find(emailInput).then((data) => {
		if (data.length !== 0) {
			return res.status(400).json({
			status: false,
			message: 'Email đã tồn tại',
			});
		} else {
			const new_user = new User({
				email,
				name,
				password,
				admin: true,
			});
			new_user.save()
			.then((data) => {
				if (data) {
					res.status(200).send({
						'status': true,
						'message': 'Tạo tài khoản thành công',
						'data': data,
					});
				}
			})
			.catch((err) => {
				res.status(500).send({
					'status': false,
					'message': 'Thất bại err',
				});
				console.log(JSON.stringify(err.message));
			});
		}
    });
};

  
// đăng nhập user
exports.SingIn = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({message: 'Nhập đầy đủ thông tin'});
    return;
  }

  User.findOne({
    email: req.body.email,
    password: req.body.password,
  }).exec((err, user) => {
    if (err) {
		res.status(500).send({
			'status': false,
			'message': 'user err',
		});
    }
    if (!user) {
		res.status(400).send({
			'status': false,
			'message': 'user err',
		});
		return user;
    }
    res.status(200).send({
		'status': true,
		'message': 'Đăng nhập thành công',
		'data': user,
    });
  });
};

// cập nhập thông tin user
exports.update_user = (req, res) => {
  var id_user = req.params.id ? {_id: req.params.id} : {};

  User.findByIdAndUpdate(id_user, {
    email: req.body.email,
  })
    .catch((err) => {
      res.status(400).send({
        api_code: 400,
        api_status: true,
        api_message: 'Cập nhập thông tin thất bại',
        api_version: 'v1.0',
        err: err,
      });
      return;
    })
    .then((data) => {
      if (!data) {
        res.status(500).send({
          api_code: 500,
          api_status: true,
          api_message: 'Not Found',
          api_version: 'v1.0',
        });
        return data;
      } else {
        res.status(200).send({
          api_status: 200,
          api_status: true,
          api_message: 'cập nhập thành công',
          api_version: 'v1.0',
          data: data,
        });
      }
    });
};

// cập nhập password cho user
exports.change_password = (req, res) => {
  var id_change_password = req.params.id ? {_id: req.params.id} : {};

  User.findOneAndUpdate(id_change_password, {
    password: req.body.password,
  })
    .then((data) => {
      if (!data) {
        res.status(500).send({
          api_code: 500,
          api_status:fales,
          api_message: 'Not Found',
          api_version: 'v1.0',
        });
        return;
      } else {
        res.status(200).send({
          api_code: 200,
          api_status: true,
          api_message: 'Cập nhập thành công',
          api_version: 'v1.0',
          data: data,
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        api_code: 400,
        api_status: true,
        api_message: 'Not Found',
        api_version: 'v1.0',
        err: err,
      });
      return 
    });
};