import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import Router from 'next/router';
import NProgress from 'nprogress';
import User from './User';

Router.onRouteChangeStart = () => {
    NProgress.start();
}
Router.onRouteChangeComplete = () => {
    NProgress.done();
}
Router.onRouteChangeError = () => {
    NProgress.done();
}

const Nav = () => (
    <NavStyles data-test="nav">
        <h1 className="bar">
            <a href="">Stock Games</a>
        </h1>
        
        <ul>
            <User>
                {({data: { me }}) => {
                    if(me) {
                        return <li>{me.name}</li>
                    }
                    return null;
                }}
            </User>
            <li>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </li>
            <li>
                <Link href="/sell">
                    <a>Sell</a>
                </Link>
            </li>
            <li>
                <Link href="/search">
                    <a>Search</a>
                </Link>
            </li>
            <li>
                <Link href="/login">
                    <a>Login</a>
                </Link>
            </li>
        </ul>
    </NavStyles>
)

export default Nav;