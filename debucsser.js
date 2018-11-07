// TODO:
// - eliminare stylesheet, tutte le rules devono venire da un unico file
// - migliore file test
// - perchè ogni tanto non parte removeEventListener? 
// - modalità negativo?

const container = document.createElement('div');
container.innerHTML = `
    <style>
      * {
        outline: 4px solid #90b9f9;
      }
    </style>`;

const basicStyle = document.createElement('div');
basicStyle.innerHTML = `
    <style>
      .debug {
        outline: 4px solid #90b9f9;
      }
    </style>`;
document.body.appendChild(basicStyle);

function lol(e) {
  console.log(e.target);
  e.target.classList.add('debug');
}

function remove(e) {
  e.target.classList.remove('debug');
}

function debugAll(bool) {
  if (bool) {
    document.body.appendChild(container);
  } else {
    document.body.removeChild(container);
  }
}

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey) {
    document.addEventListener('mouseover', lol, true);
    document.addEventListener('mouseout', remove, true);
    if (e.shiftKey) {
      debugAll(true);
    }
  }
});

document.addEventListener('keyup', (e) => {
  if (e.ctrlKey || e.shiftKey) {
    document.removeEventListener('mouseover', lol, true);
    debugAll(false);
  }
})