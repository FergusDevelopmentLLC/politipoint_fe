export default class LogoControl {
  onAdd(map) {

    this.map = map

    this.container = document.createElement('div')
    this.container.classList.add('mapboxgl-ctrl')
    this.container.classList.add('mapboxgl-ctrl-group')
    this.container.classList.add('politipoint-button-container')

    this.button = document.createElement('button')
    this.button.classList.add('mapcontrol')
    this.button.setAttribute("id", "politipoint-button")
    this.button.setAttribute("title", 'Make your viewpoint count, take the test!')

    this.img = document.createElement('img')
    this.img.setAttribute("src", "https://res.cloudinary.com/fergusdev/image/upload/v1602701054/politipoint/logos/politipoint-logomark-color_ck5ple.png")
    
    this.button.appendChild(this.img)

    this.container.appendChild(this.button)

    this.button.addEventListener('click', () => {
      window.location.href = "https://politipoint.org";
    })

    return this.container
  }

  onRemove() {
    this.container.parentNode.removeChild(this.container)
    this.map = undefined
  }
}