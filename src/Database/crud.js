import db from './connection.js'
import Wallpaper from './model.js'

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
