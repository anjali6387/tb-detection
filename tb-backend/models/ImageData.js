import mongoose from 'mongoose';

const ImageDataSchema = new mongoose.Schema({
  imageName: { type: String, required: true, unique: true },
  areas: [
    {
      x: Number,
      y: Number,
      width: Number,
      height: Number,
      label: String,
    },
  ],
  confidence: { type: Number },
  diagnosis: { type: String },
});

const ImageData = mongoose.model("ImageData", ImageDataSchema);

export default ImageData;
