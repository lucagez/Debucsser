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
    this.createGlobalClass = this.createGlobalClass.bind(this);
    this.removeGlobalClass = this.removeGlobalClass.bind(this);
  }
  init() {
    this.createDebugStyle();
    this.debug();
    this.globalStyle = this.createGlobalClass();
  }
  debug() {
    console.log(this);
    document.addEventListener('keydown', (key) => {
      if (key.keyCode == this.mainKey) {
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
    console.log(`${this.customClass}`);
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
}