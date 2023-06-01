import '../styles/navbar.css';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div>
      <nav className='navbar_container'>
        <div>
          <h1 className='navbar_title'>to-do-app</h1>
        </div>
        <div className='navbar_links_container'>
          <Link href="/" className='navbar_link'>
            <p>home</p>
          </Link>

          <Link href="/api" className='navbar_link'>
            <p>show tasks</p>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
