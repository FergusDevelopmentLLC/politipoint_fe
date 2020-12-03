export default class RotateMapControl {
  onAdd(map) {

    this.map = map

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
      console.log('click')
      // rotator.flip()
      // if (rotator.isRotating()) {
      //   rotateBy(this.map.getBearing())
      //   this.img.setAttribute("src", "https://res.cloudinary.com/fergusdev/image/upload/v1603384104/politipoint/icons/rotate-stop_louvui.png")
      //   this.button.setAttribute('title', 'Stop rotating')
      // }
      // else {
      //   this.img.setAttribute("src", "https://res.cloudinary.com/fergusdev/image/upload/v1603384104/politipoint/icons/rotate_x9tvdg.png")
      //   this.button.setAttribute('title', 'Rotate map')
      // }
    })

    return this.container
  }

  onRemove() {
    this.container.parentNode.removeChild(this.container)
    this.map = undefined
  }
}