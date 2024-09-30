import { render } from '../../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { logout as apiLogout } from './api/data.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { searchPage } from './views/search.js';

const main = document.getElementById('main-content');
document.getElementById('logoutBtn').addEventListener('click', logout);
setUserNav();
page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/search', searchPage);

page.start();
page.redirect('/');

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;

    next();
}

function setUserNav() {
    const email = sessionStorage.getItem('email');

    if (email != null) {
        const guestElements = document.querySelectorAll('.guest');
        [...guestElements].map(a => a.style.display = 'none');
        const userElements = document.querySelectorAll('.user');
        [...userElements].map(a => a.style.display = 'inline-block');
    } else {
        const guestElements = document.querySelectorAll('.guest');
        [...guestElements].map(a => a.style.display = 'inline-block');
        const userElements = document.querySelectorAll('.user');
        [...userElements].map(a => a.style.display = 'none');
    }
}

async function logout() {
    await apiLogout();
    setUserNav();
    page.redirect('/');
}