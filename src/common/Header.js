import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Drawer = () => <h2>Drawer</h2>;

const Header = () => (
  <div>
    <nav>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/about">Acerca De</Link>
        </li>
        <li>
          <Link to="/drawer">Drawer</Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Header;
