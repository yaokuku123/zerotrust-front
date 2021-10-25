import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/soft',
    children: [
      {
        path: 'list',
        component: () => import('@/views/soft/list'),
        name: 'SoftList',
        meta: { title: '软件列表', affix: true }
      },
      {
        path: 'info',
        name: 'SoftInfo',
        component: () => import('@/views/soft/info'),
        meta: { title: '注册软件' }
      },
      {
        path: 'info/:id',
        name: 'SoftInfoEdit',
        component: () => import('@/views/soft/info'),
        meta: { title: '编辑软件' },
        hidden: true // 不在侧边栏显示
      },
      {
        path: 'back/:id',
        name: 'SoftInfoBack',
        component: () => import('@/views/soft/back'),
        meta: { title: '归档' },
        hidden: true

      },
      {
        path: 'upload/:id',
        name: 'SoftUpload',
        component: () => import('@/views/soft/upload'),
        meta: { title: '软件上传', noCache: true },
        hidden: true
      },
      {
        path: 'publish/:id',
        name: 'SoftPublish',
        component: () => import('@/views/soft/publish'),
        meta: { title: '发布软件', noCache: true },
        hidden: true
      },
      {
        path: 'detail/:id',
        name: 'SoftDetail',
        component: () => import('@/views/soft/detail'),
        meta: { title: '软件详情', noCache: true },
        hidden: true
      },
      {
        path: 'verify',
        name: 'VerifyPge',
        component: () => import('@/views/soft/verify'),
        meta: { title: '审核软件', noCache: true },
        hidden: true
      },
      {
        path: 'verifyList/:status',
        name: 'SpecificAppPage',
        component: () => import('@/views/soft/verifyList'),
        meta: { title: '软件审核界面', noCache: true },
        hidden: true
      }
    ]
    // children: [
    //   {
    //     path: 'dashboard',
    //     component: () => import('@/views/dashboard/index'),
    //     name: 'Dashboard',
    //     meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
    //   }
    // ]
  },
  {
    path: '/soft',
    component: Layout,
    redirect: '/soft/list',
    name: 'Soft',
    meta: { title: '软件注册模块', icon: 'form' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/soft/list'),
        name: 'SoftList',
        meta: { title: '软件列表', affix: true }
      },
      {
        path: 'info',
        name: 'SoftInfo',
        component: () => import('@/views/soft/info'),
        meta: { title: '注册软件' }
      },
      {
        path: 'info/:id',
        name: 'SoftInfoEdit',
        component: () => import('@/views/soft/info'),
        meta: { title: '编辑软件' },
        hidden: true // 不在侧边栏显示
      },
      {
        path: 'back/:id',
        name: 'SoftInfoBack',
        component: () => import('@/views/soft/back'),
        meta: { title: '归档' },
        hidden: true

      },
      {
        path: 'upload/:id',
        name: 'SoftUpload',
        component: () => import('@/views/soft/upload'),
        meta: { title: '软件上传', noCache: true },
        hidden: true
      },
      {
        path: 'publish/:id',
        name: 'SoftPublish',
        component: () => import('@/views/soft/publish'),
        meta: { title: '发布软件', noCache: true },
        hidden: true
      },
      {
        path: 'detail/:id',
        name: 'SoftDetail',
        component: () => import('@/views/soft/detail'),
        meta: { title: '软件详情', noCache: true },
        hidden: true
      },
      {
        path: 'verify',
        name: 'VerifyPge',
        component: () => import('@/views/soft/verify'),
        meta: { title: '审核软件', noCache: true },
        hidden: true
      },
      {
        path: 'verifyList/:status',
        name: 'SpecificAppPage',
        component: () => import('@/views/soft/verifyList'),
        meta: { title: '软件审核界面', noCache: true },
        hidden: true
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
