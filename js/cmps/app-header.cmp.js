
export default{
    template:`
        <header class="app-header flex space-between align-center">
            <h1>Ms. Book</h1>
            <nav>
                <router-link to="/">Home</router-link> |
                <router-link to="/about">About</router-link> |
                <router-link to="/books">Books</router-link> |
            </nav>
        </header>
    `,
}