import homePage from './pages/home-page.cmp.js';
import about from './pages/about.cmp.js';
import bookApp from './pages/book-app.cmp.js';
import bookDetails from './pages/book-details.cmp.js';
// import carDetails from './pages/car-details.cmp.js';
// import userDetails from './pages/user-details.cmp.js';
// import carEdit from './pages/car-edit.cmp.js';


const myRoutes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: about
    },
    {
        path: '/books',
        component: bookApp
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
    // {
    //     path: '/car/edit/:theCarId?',
    //     component: carEdit
    // },
    // {
    //     path: '/car/:carId',
    //     component: carDetails
    // }
];

export const myRouter = new VueRouter({ routes: myRoutes })
