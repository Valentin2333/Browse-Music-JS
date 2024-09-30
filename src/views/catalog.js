import { html } from '../../node_modules/lit-html/lit-html.js';

import { getAlbums } from '../api/data.js';

const catalogTemplate = (albums, email) => html`
<section id="catalogPage">
    <h1>All Albums</h1>
    ${albums.length == 0 
        ? html`<p>No Albums in Catalog!</p>`
        : albums.map(a => albumTemplate(a, email))}`

export const albumTemplate = (album, email) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        <div class="btn-group">
            ${!email 
                ? ''
                : html`<a href="/details/${album._id}" id="details">Details</a>`}
        </div>
    </div>
</div>`

export async function catalogPage(ctx) {
    const albums = await getAlbums();
    const email = sessionStorage.getItem('email');
    ctx.render(catalogTemplate(albums, email));
}