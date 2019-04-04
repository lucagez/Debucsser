class Debucsser {
  constructor(props) {
    this.config = props || {};
    //just changed the color from palecioletred to bluish color 
    this.color = this.config.color || 'rgba(121,134,203 ,1)';
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
      //If there are more than 2 classes for an element, spaces are replaced with '.' to achieve a format like h1.bar__one.bar__two 
      const classList = e.target.classList ? e.target.classList.value.replace(' debucsser', '').replace('debucsser','') : undefined;
      var improvisedClassList = undefined;
      if(classList !== '')
      {
       improvisedClassList = '.'+classList.split(' ').join('.');
      }
      const tagName = e.target.tagName;
      //computedStyle gets computed style properties for a selected element
      const computedStyle = window.getComputedStyle(e.target,null);
      //we get the color,font,background-color,display type and add them to debucsser-label to display them
      const computedColor = computedStyle.getPropertyValue('color');
      const fontName=computedStyle['font-size']+' '+computedStyle['font-family'];
      const computedBackgroundColor = computedStyle['background-color'];
      const displayType = computedStyle.getPropertyValue('display');
      const id = e.target.id ? '#' + e.target.id : undefined;
      const dimensions = e.target.getBoundingClientRect();
      //an extra container (debucsser-label__container) has been created to acheieve 'flex'ible layout for debucsser__label
      this.label.innerHTML = `
      <div class="debucsser-label__container">
        <p id="debucsser__tagname">${tagName.toLowerCase()}<strong>${improvisedClassList || id || '' }</strong></p>
        <p>display: <strong>${displayType || `¯\\_(ツ)_/¯`}</strong></p>
        <p>size: <strong>${dimensions.width.toFixed(0)}px</strong> × <strong>${dimensions.height.toFixed(0)}px</strong></p>
        <p>Background: <strong>${computedBackgroundColor}</strong></p>
        <p>color: <strong>${computedColor}</strong></p>
        <p>font: <strong>${fontName}</strong></p>
        </div>
      `;
      this.label.style = `display: block; top:${e.clientY + 20}px; left:${e.clientX + 20}px;`;
    } else {
      this.label.style = 'display: none;';
    }
  }
  inject_label_style() {
    //the whole styling is to improvise the look and feel of the label
    const style = document.createElement('style');
    style.innerHTML = `
      .debucsser-label {
        position: fixed;
        z-index: 999;
       outline:none;
      }
      .debucsser-label__container
      {
        display: flex;
        flex-flow:column nowrap;
        max-width:300px;
        justify-content: center;
        color: #f0f0f0;
        background:#333;
        border-radius:4px;
        -webkit-border-radius:4px;
        -moz-border-radius:4px;
        -ms-border-radius:4px;
        -o-border-radius:4px;
        box-shadow:0px 10px 30px rgba(0,0,0,0.5);
        opacity:0.95;
        outline:none;
      }
    .debucsser-label__container::after
    {
      content: "";
      position: absolute;
      top: 0%;
      left: 0%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: #333 transparent transparent transparent;
    }
    .debucsser-label__container p{
        flex: 1 1 auto ;
        margin:0;
        padding:10px 5px 10px 15px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        outline:none;
    }
    .debucsser-label__container p strong{
        text-align: right;
        color: palevioletred;
        outline:none;
    }
    #debucsser__tagname
    {
      text-align:center;
      padding:5px 2px 2px 2px;
      color:rgba(255,183,77 ,1);

      border-bottom:1px solid #f0f0f0;
    }
    #debucsser__tagname strong
    {
      padding:0px 2px 2px 2px;
      color:rgba(52,152,219 ,1);
    }
    `;
    document.body.appendChild(style);
  }
}


// only for demo purpose
const explain = document.querySelector('.explain');
explain.querySelector('button').addEventListener('click', () => {
  explain.style.transform = 'translateX(2000px)';
  document.querySelector('.wrapper').style.filter = 'none';
});