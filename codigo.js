console.log("Funciona!");

// Muestra en consola el json de la API de jsonplaceholder.
// Utiliza fetch
// utiliza async/await
// utiliza callback clásico

const BASE = 'https://jsonplaceholder.typicode.com';

// ---------- 1) FETCH con promesas ----------
function casoFetch() {
  console.clear();
  console.log('--- 1) FETCH + then ---');
  fetch(`${BASE}/users/1`)
    .then(respuesta => {
      if (!respuesta.ok) throw new Error('HTTP ' + respuesta.status);
      return respuesta.json();
    })
    .then(datos => console.log('fetch - usuario:', datos))
    .catch(error => console.error('fetch - error:', error));
}

// ---------- 2) ASYNC / AWAIT ----------
async function getJSON(url) {
  const respuesta = await fetch(url);
  if (!respuesta.ok) throw new Error('HTTP ' + respuesta.status);
  return respuesta.json();
}

async function casoAsyncAwait() {
  console.clear();
  console.log('--- 2) ASYNC/AWAIT: inicio ---');
  try {
    const usuario = await getJSON(`${BASE}/users/1`);
    console.log('Async - usuario:', usuario);

    const posts = await getJSON(`${BASE}/posts?userId=${usuario.id}`);
    console.log('Async - posts:', posts);

    const comentarios = await getJSON(`${BASE}/comments?postId=${posts[0].id}`);
    console.log('Async - comentarios:', comentarios);
  } catch (error) {
    console.error('Async - error:', error);
  }
}

// ---------- 3) CALLBACK CLÁSICO (XMLHttpRequest) ----------
// Convención error-first: callback(error, datos)
function get(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      callback(null, JSON.parse(xhr.responseText));
    } else {
      callback(new Error('HTTP ' + xhr.status), null);
    }
  };
  xhr.onerror = () => callback(new Error('Error de red'), null);
  xhr.send();
}

function casoCallback() {
  console.clear();
  console.log('--- 3) CALLBACK: inicio ---');
  get(`${BASE}/users/1`, (err, usuario) => {
    if (err) return console.error('Callback (usuario):', err);
    console.log('Callback - usuario:', usuario);

    get(`${BASE}/posts?userId=${usuario.id}`, (err, posts) => {
      if (err) return console.error('Callback (posts):', err);
      console.log('Callback - posts:', posts);

      get(`${BASE}/comments?postId=${posts[0].id}`, (err, comentarios) => {
        if (err) return console.error('Callback (comentarios):', err);
        console.log('Callback - comentarios:', comentarios);
      });
    });
  });
  console.log('--- 3) CALLBACK: fin del código síncrono ---');
}

// ---------- Enlazar botones ----------
document.getElementById('btnFetch').addEventListener('click', casoFetch);
document.getElementById('btnAsync').addEventListener('click', casoAsyncAwait);
document.getElementById('btnCallback').addEventListener('click', casoCallback);