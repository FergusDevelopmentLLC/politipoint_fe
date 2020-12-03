export default class LegendMapControl {
  constructor(resultsCount) {
    this.resultsCount = resultsCount
  }

  onAdd(map) {
  
    this.map = map
    
    this.container = document.createElement('div')
    this.container.classList.add('legend-wrapper')
    this.container.setAttribute("id", "legend-wrapper")
  
    this.img = document.createElement('img')
    this.img.classList.add('legend')
    this.img.setAttribute("src", "https://res.cloudinary.com/fergusdev/image/upload/v1603731430/politipoint/legend/legend2_xf7pqa.png")
    this.container.appendChild(this.img)

    this.desc = document.createElement('div')
    this.desc.classList.add('legend-description')
    this.desc.innerHTML = `${this.resultsCount} county viewpoints have been collected.<span id='county-more-detail'> Click on a county for more detail.</span><span id='county-3d-desc'> County height indicates number of tests for that county.</span>`
    this.container.appendChild(this.desc)
    
    return this.container
  }

  onRemove() {
    this.container.parentNode.removeChild(this.container)
    this.map = undefined
  }
}