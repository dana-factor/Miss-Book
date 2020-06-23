import appHeader from './cmps/app-header.cmp.js';
import {myRouter} from './routes.js'

new Vue({
    el: '#App',
    router: myRouter,
    template: `
        <div>
            <!-- <header class="app-header flex justify-center align-center">
                <h1>Ms. Book</h1>
                <nav>
                    <router-link to="/">Home</router-link> |
                    <router-link to="/about">About</router-link> |
                    <router-link to="/books">Books</router-link> |
                </nav>
            </header> -->
            <main>
                <app-header></app-header>
                <router-view />
            </main>
            <!-- <book-app></book-app> -->
        </div>
    `,
    methods: {

    },
    components: {
        appHeader
    }
});
