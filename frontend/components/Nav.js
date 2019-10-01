import Link from 'next/link';
import NavStyles from './styles/NavStyles';

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
        </ul>
    </NavStyles>
)

export default Nav;