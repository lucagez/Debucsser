class Debucsser {
  constructor(props) {
    this.config = props || {};
    this.color = this.config.color || 'palevioletred';
    this.width = this.config.width || '3px';
    this.style = this.config.style || 'solid';
    this.customClass = this.config.customClass || null;
    this.grayscaleOnDebug = this.config.grayscaleOnDebug || false;
    this.grayscaleOnDebugAll = this.config.grayscaleOnDebugAll || false;
    this.string = `${this.width} ${this.style} ${this.color}`;
    this.mainKey = this.config.mainKey || 17;
    this.secondKey = this.config.secondKey || 16;
    this.init = this.init.bind(this);
    this.debug = this.debug.bind(this);
    this.debugAll = this.debugAll.bind(this);
    this.stop = this.stop.bind(this);
    this.addClass = this.addClass.bind(this);
    this.labels = this.labels.bind(this);
    this.createGlobalClass = this.createGlobalClass.bind(this);
    this.removeGlobalClass = this.removeGlobalClass.bind(this);
  }
  init() {
    // initialize invisible label element => we'll make it visible on selected keystroke
    this.label = document.createElement('div');
    this.label.classList.add('debucsser-label');
    this.label.style = 'display: none;';
    document.body.appendChild(this.label);

    this.inject_label_style();
    this.createDebugStyle();
    this.debug();
    this.globalStyle = this.createGlobalClass();
  }
  debug() {
    document.addEventListener('keydown', (key) => {
      if (key.keyCode == this.mainKey) {
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
        document.removeEventListener('mousemove', this.labels, true);
        this.label.style = 'display: none;';
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
    const style = document.createElement('style');
    style.innerHTML = `
      .debucsser {
        outline: ${this.string};
        ${this.config.grayscaleOnDebug && 'filter: grayscale(100%);'}
      }
    `;
    document.body.appendChild(style);
  }
  createGlobalClass() {
    const global = document.createElement('style');
    global.innerHTML = `
      * {
        outline: ${this.string};
        ${this.config.grayscaleOnDebugAll && 'filter: grayscale(100%);'}
      }
    `;
    return global;
  }
  removeGlobalClass(key) {
    if (key.keyCode == this.secondKey) {
      document.body.removeChild(this.globalStyle);
    }
  }
  labels(e) {
    if (e.target) {
      const classList = e.target.classList ? e.target.classList.value.replace('debucsser', '') : undefined;
      const id = e.target.id ? '#' + e.target.id : undefined;
      const dimensions = e.target.getBoundingClientRect();
      this.label.innerHTML = `
        <h2>class: <strong>${classList || `¯\\_(ツ)_/¯`}</strong></h2>
        <h2>id: <strong>${id || `¯\\_(ツ)_/¯`}</strong></h2>
        <h2><strong>${dimensions.width.toFixed(0)}px</strong> × <strong>${dimensions.height.toFixed(0)}px</strong></h2>
      `;
      this.label.style = `display: block; top:${e.clientY + 20}px; left:${e.clientX + 20}px;`;
    } else {
      this.label.style = 'display: none;';
    }
  }
  inject_label_style() {
    const style = document.createElement('style');
    style.innerHTML = `
      .debucsser-label {
        position: fixed;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        padding: 10px 20px;
        background: #333;
        border-radius: 3px;
        color: #f9f9f9;
        opacity: 0.9;
        z-index: 999;
      }
      .debucsser-label strong {
        color: palevioletred;
      }
    `;
    document.body.appendChild(style);
  }
}

// init debucsser without custom config
let debug = new Debucsser().init();