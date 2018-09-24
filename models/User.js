const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const PLM      = require('passport-local-mongoose')

const userSchema = new Schema({
  username: String,
  email: String,
  photoURL: String,
  post: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  type:{
    type:String,
    enum: [],
    default: 'Empleador'
},
/*location:{
    type:{
        type:String,
        default:'Point'
    },
    address:String,
    coordinates:[{
        type:Number
    }]
}*/
},
  {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }, 
  versionKey: false
})

module.exports = mongoose.model('User', userSchema.plugin(PLM, {usernameField: 'email'}))