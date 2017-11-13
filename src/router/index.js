// 子组件
import Vue from 'vue'
import Router from 'vue-router'

const Homepage = (resolve) => {
    import('components/homepage/homepage').then((module) => {
        resolve(module)
    })
}

const Recommend = (resolve) => {
    import('components/recommend/recommend').then((module) => {
        resolve(module)
    })
}

const Search = (resolve) => {
    import('components/Search/Search').then((module) => {
        resolve(module)
    })
}

const Main = (resolve) => {
    import('components/Main/Main').then((module) => {
        resolve(module)
    })
}

const Music = (resolve) => {
    import('components/music/music.vue').then((module) => {
        resolve(module)
    })
}

const Lines = (resolve) => {
    import('components/lines/lines').then((module) => {
        resolve(module)
    })
}

const Story = (resolve) => {
    import('components/story/story').then((module) => {
        resolve(module)
    })
}

const Comment = (resolve) => {
    import('components/comment/comment').then((module) => {
        resolve(module)
    })
}

const MusicDetail = (resolve) => {
    import('components/music-detail/music-detail').then((module) => {
        resolve(module)
    })
}

const Login = (resolve) => {
    import('base/login/login').then((module) => {
        resolve(module)
    })
}

const SearchList = (resolve) => {
    import('components/search-list/search-list').then((module) => {
        resolve(module)
    })
}

// 路由实例
Vue.use(Router);

// 路由配置
export default new Router({
    linkActiveClass: 'active',
    history,
    routes: [
        {
            path: '/',
            redirect: '/homepage/music',
            component: Homepage,
        },
        {
            name: 'home',
            path: '/homepage',
            redirect: '/homepage/music',
            component: Homepage,
            children: [
                {
                    name: 'music',
                    path: '/homepage/music',
                    component: Music,
                },
                {
                    path: '/homepage/lines',
                    component: Lines
                },
                {
                    path: '/homepage/story',
                    component: Story
                },
                {
                    path: '/homepage/comment',
                    component: Comment
                },
            ]
        },
        {
            name: 'recommend',
            path: '/recommend',
            component: Recommend,
        },
        {
            name: 'search',
            path: '/search',
            component: Search,
        },
        {
            name: 'mine',
            path: '/mine',
            component: Main,
        },
        {
            name: 'musicdetail',
            path: '/music-detail',
            component: MusicDetail
        },
        {
            name: 'login',
            path: '/mumeow/login',
            component: Login
        },
        {
            name: 'search-list',
            path: '/search/search-list',
            component: SearchList
        }
    ]
});
