import mongoose from 'mongoose'


export const connectToMongo = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Đã kết nối đến Database');
    mongoose.connection.on('connected', () => {
    });
    mongoose.connection.on('error', (err) => {
        console.log('Lỗi kết nối đến DB: ' + err);
    });
};

