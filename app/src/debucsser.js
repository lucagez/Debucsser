class Debucsser {
  constructor(props) {
    const config = props ? props : {};
    this.color = config.color || '#333';
    this.width = config.width || '3px';
    this.style = config.style || 'solid';
    this.customClass = config.customClass || null;
    this.grayscaleOnDebug = config.grayscaleOnDebug || false;
    this.grayscaleOnDebugAll = config.grayscaleOnDebugAll || false;
    this.string = `${this.width} ${this.style} ${this.color}`;
    this.mainKey = config.mainKey || 17;
    this.secondKey = config.secondKey || 16;
    this.init = this.init.bind(this);
    this.debug = this.debug.bind(this);
    this.debugAll = this.debugAll.bind(this);
    this.stop = this.stop.bind(this);
    this.addClass = this.addClass.bind(this);
    // bind also to labels
    // this.labels = this.labels.bind(this);
    this.createGlobalClass = this.createGlobalClass.bind(this);
    this.removeGlobalClass = this.removeGlobalClass.bind(this);
  }
  init() {
    // initialize label element to fill later with classnames
    this.label = document.createElement('div');
    this.label.style = 'display: none;';
    document.body.appendChild(this.label);

    this.createDebugStyle();
    this.debug();
    this.globalStyle = this.createGlobalClass();
  }
  debug() {
    console.log(this);
    document.addEventListener('keydown', (key) => {
      if (key.keyCode == this.mainKey) {
        // ! adding listeners for labels
        document.addEventListener('mousemove', this.labels, true);
        document.addEventListener('mouseover', this.addClass, true);
        document.addEventListener('keydown', this.debugAll, true);
      }
      this.stop();
    });
  }
  stop() {
    document.addEventListener('keyup', (key) => {
      if (key.keyCode == this.mainKey) {
        document.removeEventListener('mouseover', this.addClass, true);
      }
    })
  }
  addClass(over) {
    over.target.classList.add(this.customClass ? this.customClass : 'debucsser');
    document.addEventListener('mouseout', (out) => {
      out.target.classList.remove(this.customClass ? this.customClass : 'debucsser');
    }, true);
  }
  debugAll(key) {
    if (key.keyCode == this.secondKey) {
      document.body.appendChild(this.globalStyle);
      document.addEventListener('keyup', this.removeGlobalClass, true)
    }
  }
  createDebugStyle() {
    const style = document.createElement('div');
    style.innerHTML = `
    <style>
      .debucsser {
        outline: ${this.string};
        ${config.grayscaleOnDebug && 'filter: grayscale(100%);'}
      }
    </style>`;
    document.body.appendChild(style);
  }
  createGlobalClass() {
    const global = document.createElement('div');
    global.innerHTML = `
    <style>
      * {
        outline: ${this.string};
        ${config.grayscaleOnDebugAll && 'filter: grayscale(100%);'}
      }
    </style>`;
    return global;
  }
  removeGlobalClass(key) {
    if (key.keyCode == this.secondKey) {
      document.body.removeChild(this.globalStyle);
    }
  }

  // TODO: labels not working!
  // labels(e) {
  //   console.log(e.target.classList);
  //   if (e.target.classList[0]) {
  //     this.label.innerHTML = `
  //       <h2>${e.target.classlist[0]}</h2>
  //       <p>${e.target}</p>
  //     `;
  //     this.label.style = `display: block; position: fixed; z-index: 999; top:${e.clientY + 20}px; left:${e.clientX + 20}px;`;
  //   } else {
  //     this.label.style = 'display: none;'
  //   }
  // }
}