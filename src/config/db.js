import mongoose from 'mongoose';

const connectDb = () => {
  mongoose.connect(process.env.MONGODB_URI)
  .then(()=>{ 
    console.log("Database Connected successfully") 
  })
  .catch((err)=>{ 
    console.log("Error in connecting to the database : ", err.message);
    process.exit(1); 
  })
};

export default connectDb;
