const express=require('express');
const router=express.Router();

const {    getAllUsers,getUser,createUser,updateUser,deleteUser
}=require('../controllers/Users');

router.route('/').post(createUser).get(getAllUsers);
router.route('/:id').get(getUser).delete(deleteUser).put(updateUser);

module.exports=router;
