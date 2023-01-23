// this base layout is used for all pages
// it also contains the authlayout, homeLayout, bloglayout, etc
// it is the parent of all layouts

// routing each url to a specific layout

import { useRouter } from 'next/router'
import AuthLayout from './AuthLayout'
import BlogLayout from './BlogLayout'
import HomeLayout from './HomeLayout'
import ManageLayout from './ManageLayout'


const authRoutes = ['/login', '/signup']
const blogRoutes = ['/:blogId/:boardId/:postId', '/:blogId/:boardId', '/:blogId'];
const homeRoutes = ['/', '/blog', '/user/:userId']
const manageRoutes = ['/blog/:blogId', '/blog/:blogId/board', '/blog/:blogId/posts', 
                        '/blog/:blogId/newpost', '/blog/:blogId/newPost/:postId', 
                        '/blog/:blogId/newPost/:postId']


const BaseLayout = ({ children } : React.PropsWithChildren) => {
    const { pathname } = useRouter();
    let isAuthPage = authRoutes.some(route => pathToRegexp(route).test(pathname));
    let isBlogPage = blogRoutes.some(route => pathToRegexp(route).test(pathname));
    let isManagePage = manageRoutes.some(route => pathToRegexp(route).test(pathname));
    let isHomePage = homeRoutes.some(route => pathToRegexp(route).test(pathname));

    if (isAuthPage) {
        return <AuthLayout>{children}</AuthLayout>
    }
    if (isBlogPage) {
        return <BlogLayout>{children}</BlogLayout>
    }
    if (isManagePage) {
        return <ManageLayout>{children}</ManageLayout>
    }
    if (isHomePage) {
        return <HomeLayout>{children}</HomeLayout>
    }
    return <>{children}</>
    
}


export default BaseLayout


function pathToRegexp(route: string) {
    return new RegExp('^' + route.replace(/\//g, '\\/').replace(/:\w+/g, '(\\w+)') + '$');
}

