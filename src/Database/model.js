import mongoose from 'mongoose'
const { Schema } = mongoose
const WallpaperSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: Image,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
})

const Wallpaper = mongoose.model('Wallpaper', WallpaperSchema)

export default Wallpaper
