export default class RotateMapControl {
  constructor(isRotating, toggleRotation) {
    this.isRotating = isRotating
    this.toggleRotation = toggleRotation
  }

  rotateBy = (current) => {
    this.map.rotateTo( current + 5, { duration: 200, easing: (t) => { return t } })//add 5 degrees to the current bearing.
    // source: https://gist.github.com/danswick/ceb7de7a29330b024f88
  }

  onAdd(map) {

    this.map = map

    this.map.on('moveend', () => {
      if (this.isRotating()) this.rotateBy(this.map.getBearing())// if isRotating flag is true, keep the map rotating
    })

    this.container = document.createElement('div')
    this.container.classList.add('mapboxgl-ctrl')
    this.container.classList.add('mapboxgl-ctrl-group')
    
    this.button = document.createElement('button')
    this.button.classList.add('mapcontrol')
    this.button.setAttribute('id', 'rotate')
    this.button.setAttribute('title', 'Rotate map')

    this.img = document.createElement('img')
    this.img.setAttribute("src", "https://res.cloudinary.com/fergusdev/image/upload/v1603384104/politipoint/icons/rotate_x9tvdg.png")
    this.button.appendChild(this.img)

    this.container.appendChild(this.button)

    this.button.addEventListener('click', () => {
      
      this.toggleRotation()

      if (this.isRotating()) {
        this.rotateBy(this.map.getBearing())
        this.img.setAttribute("src", "https://res.cloudinary.com/fergusdev/image/upload/v1603384104/politipoint/icons/rotate-stop_louvui.png")
        this.button.setAttribute('title', 'Stop rotating')
      }
      else {
        this.img.setAttribute("src", "https://res.cloudinary.com/fergusdev/image/upload/v1603384104/politipoint/icons/rotate_x9tvdg.png")
        this.button.setAttribute('title', 'Rotate map')
      }
    })

    return this.container
  }

  onRemove() {
    this.container.parentNode.removeChild(this.container)
    this.map = undefined
  }
}