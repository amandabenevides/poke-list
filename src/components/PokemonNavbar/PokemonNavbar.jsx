import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText
} from 'reactstrap';
import '../PokemonNavbar/PokemonNavbar.css';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../../assets/logo.png';
import { usePokemon } from '../../context/PokemonContext';

const PokemonNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setSearch } = usePokemon();
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="nav-wrap">
      <Navbar className="nav-poke" light expand="md">
        <NavbarBrand href="/">
          <img src={logo} alt="PokéCards Logo" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          </Nav>
          <NavbarText>
            <input className="search-poke-bar" type="text" placeholder="search" onChange={e => setSearch(e.target.value)} />
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default PokemonNavbar;