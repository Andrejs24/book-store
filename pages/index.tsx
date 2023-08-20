"use client"
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className="container">
      <h1>Welcome to Book Store</h1>
      <div className="buttons">
        <Link href="/books" className="button-link">
        Show books without registration
        </Link>
        <Link href="/login" className="button-link">
          Login 
        </Link>
      </div>
    </div>
  );
}

export default Home;
