var mongoose = require('mongoose');
var Schema = mongoose.Schema; // su dung doi tuong tao ra template cho collection
var productSchema = new Schema({
    name: {type: String, required: true, unique: true},
    image: {type: String, default: null},
    price: {type: Number, default: null},
    cate_id: {type: Schema.Types.ObjectId, ref: 'categories'},
    detail: {type: String, default: null}
});

module.exports = mongoose.model('products', productSchema);