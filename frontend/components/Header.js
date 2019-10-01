import Nav from './Nav'

const Header = () => (
    <div>
        <div className="bar">
            <a href="">Stock Games</a>
        </div>
        <div className="sub-bar">
            <p>Search</p>
        </div>
        <div className="nav">
            <Nav />
        </div>
    </div>
)

export default Header;