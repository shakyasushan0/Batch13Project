import connectDB from './db/connectDB.js';
import products from './db/products.js';
import users from './db/users.js';

import User from './model/User.js';
import Product from './model/Product.js';
import Order from './model/Order.js';

connectDB();

async function importData(){
    try{
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();


        const createdUsers = await User.insertMany(users)
        const adminId = createdUsers[0]._id
        const sampleProducts = products.map(product => {
            return {...product, user: adminId}
        })
        const createdProducts = await Product.insertMany(sampleProducts)
        console.log("Data Imported!")
        process.exit(0)
    }
    catch(err){
        console.log("Error importing data:",err.message)
        process.exit(1)
    }
}

async function destroyData(){
     try{
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log("Data Destroyed!")
        process.exit(0)
    }
    catch(err){
        console.log("Error destroying data:",err.message)
        process.exit(1)
    }
}

const option = process.argv[2]

if(option == '-D'){
    destroyData()
}
else {
    importData()
}