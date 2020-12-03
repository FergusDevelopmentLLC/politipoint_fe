export default class ExtrudeMapControl {
  onAdd(map) {

    this.map = map

    this.container = document.createElement('div')
    this.container.classList.add('mapboxgl-ctrl')
    this.container.classList.add('mapboxgl-ctrl-group')

    this.button = document.createElement('button')
    this.button.classList.add('mapcontrol')
    this.button.setAttribute("id", "threedee")
    this.button.setAttribute("title", 'Extrude Map')

    this.img = document.createElement('img')
    this.img.setAttribute("src", "https://res.cloudinary.com/fergusdev/image/upload/v1603384104/politipoint/icons/threedee_fdkdgk.png")
    
    this.button.appendChild(this.img)

    this.container.appendChild(this.button)

    this.button.addEventListener('click', () => {
      if (this.map.getPitch() === 0) {
        this.img.setAttribute("src", "https://res.cloudinary.com/fergusdev/image/upload/v1603384104/politipoint/icons/threedee-off_ivvyfm.png")
        this.button.setAttribute("title", 'Flatten Map')
        this.map.setPaintProperty('county_extruded', 'fill-extrusion-opacity', .8)
        document.getElementById('county-3d-desc').style.display = 'inline'
        document.getElementById('county-more-detail').style.display = 'none'
        this.map.easeTo({ pitch: 30 })
      } else {
        this.img.setAttribute("src", "https://res.cloudinary.com/fergusdev/image/upload/v1603384104/politipoint/icons/threedee_fdkdgk.png")
        this.button.setAttribute("title", 'Extrude Map')
        this.map.setPaintProperty('county_extruded', 'fill-extrusion-opacity', 0)
        document.getElementById('county-3d-desc').style.display = 'none'
        document.getElementById('county-more-detail').style.display = 'inline'
        this.map.easeTo({ pitch: 0 })
      }
    })

    return this.container
  }

  onRemove() {
    this.container.parentNode.removeChild(this.container)
    this.map = undefined
  }
}