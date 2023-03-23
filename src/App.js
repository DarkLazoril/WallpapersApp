import './App.css'
import { useState, useEffect } from 'react'
import add from './Icons/add.png'
import local from './Icons/local.png'
import online from './Icons/online.png'
import bg1 from './cards/bg1.jpg'
import bg2 from './cards/bg2.jpg'
import bg3 from './cards/bg3.jpg'
import bg4 from './cards/bg4.png'
import bg5 from './cards/bg5.jpg'

const Card = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [panels, setPanels] = useState([
    { image: bg1, title: 'Tomb Raider' },
    { image: bg2, title: 'The Walking Dead' },
    { image: bg3, title: 'Lord of the rings' },
    { image: bg4, title: 'Ellie The last of us' },
    { image: bg5, title: 'Maggie TWD' },
  ])

  const handlePanelClick = (index) => {
    setActiveIndex(index)
  }

  const addNewPanelOnline = () => {
    const newPanelImage = prompt('Enter the URL of the new panel image:')
    if (!newPanelImage) {
      alert('Please enter a valid image URL.')
      return
    }

    // Use a regular expression to validate the URL entered by the user
    const urlPattern = /^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/
    if (!urlPattern.test(newPanelImage)) {
      alert('Please enter a valid image URL.')
      return
    }

    const newPanelTitle = prompt('Enter the title of the new panel:')
    const newPanel = { image: newPanelImage, title: newPanelTitle }
    const updatedPanels = [...panels, newPanel]

    setPanels(updatedPanels)
    setActiveIndex(updatedPanels.length - 1)
  }

  const addNewPanelLocal = () => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = 'image/*'
    fileInput.onchange = (e) => {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        const newPanelTitle = prompt('Enter the title of the new panel:')
        const newPanel = { image: e.target.result, title: newPanelTitle }
        const updatedPanels = [...panels, newPanel]
        setPanels(updatedPanels)
        setActiveIndex(updatedPanels.length - 1)
      }
    }
    fileInput.click()
  }

  useEffect(() => {
    const socialLink = document.querySelector('.social-link')
    const shareLink = document.querySelector('.share-link')

    const handleClick = () => {
      socialLink.classList.toggle('active')
      shareLink.classList.toggle('active')

      clearTimeout(timeoutID)

      timeoutID = setTimeout(() => {
        socialLink.classList.remove('active')
        shareLink.classList.remove('active')
      }, 10000)
    }

    socialLink.addEventListener('click', handleClick)

    let timeoutID

    return () => {
      socialLink.removeEventListener('click', handleClick)
      clearTimeout(timeoutID)
    }
  }, [])

  return (
    <div className="container">
      {panels.map((panel, index) => (
        <div
          className={`panel ${activeIndex === index ? 'active' : ''}`}
          key={index}
          style={{ backgroundImage: `url(${panel.image})` }}
          onMouseEnter={() => handlePanelClick(index)}
          onClick={() => {
            handlePanelClick(index)
            const link = document.createElement('a')
            link.download = `${panel.title}.jpg`
            link.href = panel.image
            link.click()
          }}
        >
          <h3>{panel.title}</h3>
        </div>
      ))}
      <div className="share-container">
        <ul className="share-link">
          <li onClick={addNewPanelLocal}>
            <img src={local} alt="local" />
            Local
          </li>

          <li onClick={addNewPanelOnline}>
            <img src={online} alt="online" />
            Online
          </li>
        </ul>
        <div className="social-link">
          <img className="add" src={add} alt="add" />
          <img
            className="close"
            src="https://i.postimg.cc/LsCMHyJr/close.png"
            alt="close"
          />
        </div>
      </div>
    </div>
  )
}

export default Card
