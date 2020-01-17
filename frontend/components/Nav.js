import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import Router from 'next/router';
import NProgress from 'nprogress';
import User from './User';
import Signout from './Signout';
import {Mutation } from 'react-apollo';

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
           
            <li>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </li>
            <User>
                 {({data: { me }}) => (
                     <>
                        <li>
                            <Link href="/search">
                                <a>Search</a>
                            </Link>
                        </li>
                
                    
                        {me && (
                            <>
                                <li>
                                    <Link href="/sell">
                                        <a>Sell</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/account">
                                        <a>{me.name}</a>
                                    </Link>
                                </li>
                                {
                                    me.permissions.some(r => {
                                        return ['ADMIN', 'PERMISSIONUPDATE'].includes(r);
                                    }) && (
                                        <li>
                                            <Link href="/permissions">
                                                <a>Permissions</a>
                                            </Link>
                                        </li>
                                    )
                                }
                                <li>
                                    <Signout />
                                </li>
                            </>
                        )}
                        {!me && (
                            <>
                                <li>
                                    <Link href="/signup">
                                        <a>Sign Up / Sign In</a>
                                    </Link>
                                </li>
                            </>
                        )}

                        
                    </>
                    
                    
                )}
            </User>
            
        </ul>
    </NavStyles>
)

export default Nav;