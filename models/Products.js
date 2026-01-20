const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
    name: {
        type: String,
        required: [true , 'This is required']
    },
    description: {
        type: String,
        required: [true , 'This is required']
    },
    price: {
        type: Number,
        validate:{
            validator: value => value > 0,
            message: 'Price must be grater than $0'
        }
    },
    category: {
        type: String,
        required: [true , 'This is required']
    },
    inStock: {
        type: Boolean,
        default: true
    },
    tags: {
        type:[String]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model('Product' , productSchema)

module.exports = Product