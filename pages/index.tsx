"use client"
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className="container">
      <h1>Welcome to Book Store</h1>
      <div className="buttons">
        <Link href="/user" className="button-link">
        Unauthorized User Page
        </Link>
        <Link href="/admin" className="button-link">
          Admin Page
        </Link>
      </div>
    </div>
  );
}

export default Home;
