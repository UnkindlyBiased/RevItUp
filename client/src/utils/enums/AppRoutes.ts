enum AppRoutes {
    DEFAULT = '/',

    LOGIN = '/login',
    REGISTER = '/register',

    POSTS = '/news',
    POSTS_SEARCH = '/news/search',
    OPENED_POST = '/news/:postLink',

    THREADS = '/threads',
    THREAD_CATEGORY = '/thread-category/:code',

    CATEGORIES = '/categories',
    OPENED_CATEGORY = '/categories/:code',

    YOUR_PROFILE = '/me',
    YOUR_SAVED_POSTS = '/me/saved-posts',
    YOUR_WRITTEN_POSTS = '/me/written-posts',

    ADMIN = '/admin'
}

export default AppRoutes