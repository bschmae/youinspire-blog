import { Link } from 'react-router-dom';

const Navbar = ({ logout }) => {
    return (
        <div className='navbar'>
            <h1>*logo*</h1>
            <div className='navbar-links'>
                <h2><Link to='/' > Home </Link></h2>
                <h2><Link to='/blogform'> Create Blog </Link></h2>
                <h2><Link to='/users'> Users </Link></h2>
            </div>
            <button onClick={logout}>logout</button>
        </div>
    );
};

export default Navbar;