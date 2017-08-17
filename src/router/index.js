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

// const home = r => require.ensure([], () => r(require('@/components/Home')), 'home');

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
            path: '/homepage',
            redirect: '/homepage/music',
            component: Homepage,
            children: [
                {
                    path: '/homepage/music',
                    component: Music
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
            path: '/recommend',
            component: Recommend,
        },
        {
            path: '/search',
            component: Search,
        },
        {
            path: '/main',
            component: Main,
        },
    ]
});
