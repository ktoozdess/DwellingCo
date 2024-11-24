const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    id: { type: String, required: true },  // Ваше поле id
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    previewimg: { type: String, required: true },
    person: { type: String, required: true },
    location: { type: Object, required: true },
    features: { type: Object, required: true },
  });
  

const Property = mongoose.model('dwellings', propertySchema);


module.exports = Property;
