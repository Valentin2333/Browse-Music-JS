import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAlbums, searchAlbums } from '../api/data.js';
import { albumTemplate } from './catalog.js';

const searchTemplate = (albums, onSearch, params = '', email) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <form @submit=${onSearch} class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name" .value=${params}>
        <button class="button-list">Search</button>
    </form>

    <h2>Results:</h2>

    <!--Show after click Search button-->
    <div class="search-result">
    ${albums.length == 0
    ? html`<p class="no-result">No result.</p>`
    : html`<ul>
        ${albums.map(a => albumTemplate(a, email))}
    </ul>`}
    </div>
</section>`;

export async function searchPage(ctx) {
    const params = ctx.querystring.split('=')[1];
    let albums = [];

    if (params) {
        albums = await searchAlbums(decodeURIComponent(params));
    }
    const email = sessionStorage.getItem('email');

    ctx.render(searchTemplate(albums, onSearch, params, email));

    function onSearch(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const search = formData.get('search');

        if (search) {
            ctx.page.redirect('/search?query=' + encodeURIComponent(search));
        }
    }
}