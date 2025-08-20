const mongoose=require("mongoose");
const  {ObjectId} = mongoose.Schema.Types;

const userSchema=new mongoose.Schema(
    {
        name:{
            type:"String",
            required:"true"
        },
        email:{
            type:"String",
            required:"true"
        },
        password:{
            type:"String",
            required:"true"
        },
        Photos:{
            type:"String",
            default:"D:\\Instagram-clone2\\Instagram-clone\\Insta-clone\\Backend\\Frontend\\src\\assets\\img\\default-profile.jpg"
        },
        followers:[{type:ObjectId,ref:"User"}],
        following:[{type:ObjectId, ref:"User"}],
    }
);

mongoose.model("User",userSchema);
    