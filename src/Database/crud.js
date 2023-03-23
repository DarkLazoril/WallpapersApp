import db from './connection.js'
import Wallpaper from './model.js'
import bg1 from './'

let newWallpapers = [
  new Wallpaper({
    title: 'Test Image',
    image: '../cards/bg1.jpg',
    created_at: Date.now(),
  }),
  new Wallpaper({
    title: 'Test image 2',
    image: '../cards/bg2.jpg',
    created_at: Date.now(),
  }),
]
for (const wallpaper of newWallpapers) {
  try {
    await wallpaper.save()
    console.log('ADDED')
  } catch (error) {
    console.log('ERROR: ' + error)
  }
}
async function create(req, res) {
  try {
    const newWallpaper = await Wallpaper.create({
      title: req.body.title,
      image: req.file.buffer,
      created_at: Date.now(),
    })
    await newWallpaper.save()
    res.status(201).json(newWallpaper)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
