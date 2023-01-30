import React, { useState, useEffect } from 'react';
import { Table, InputGroup, FormControl, DropdownButton, Dropdown,Navbar, Nav, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

function App() {
  const [heroes, setHeroes] = useState([]);
  const [filteredHeroes, setFilteredHeroes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('name');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedOption, setSelectedOption] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleOptionChange = event => {
    setSelectedOption(event.target.value);
  };

  const handleScroll = () => {
    setShowBackToTop(window.pageYOffset > 100);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  useEffect(() => {
    axios.get('https://indonesia-public-static-api.vercel.app/api/heroes')
      .then(response => {
        setHeroes(response.data);
        setFilteredHeroes(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setFilteredHeroes(
      heroes.filter(hero => {
        if (searchBy === 'name') {
          return hero.name.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchBy === 'death_year') {
          return hero.death_year === Number(searchTerm);
        } else if (searchBy === 'birth_year') {
          return hero.birth_year === Number(searchTerm);
        } else if (searchBy === 'description') {
          return hero.description.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchBy === 'ascension_year') {
          return hero.ascension_year === Number(searchTerm);
        }
        return true;
      })
    );
  }, [searchTerm, searchBy, heroes]);

  useEffect(() => {
    setFilteredHeroes(
      filteredHeroes.sort((a, b) => {
        if (sortOrder === 'asc') {
          if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
          } else if (sortBy === 'birth_year') {
            return a.death_year - b.death_year;
          } else if (sortBy === 'death_year') {
            return a.birth_year - b.birth_year;
          } else if (sortBy === 'ascension_year') {
            return a.ascension_year - b.ascension_year;
          }
        } else {
          if (sortBy === 'name') {
            return b.name.localeCompare(a.name);
          } else if (sortBy === 'birth_year') {
            return b.death_year - a.death_year;
          } else if (sortBy === 'death_year') {
            return b.birth_year - a.birth_year;
          } else if (sortBy === 'ascension_year') {
            return b.ascension_year - a.ascension_year;
          }
        }
        return 0;
      })
    );
  }, [sortBy, sortOrder, filteredHeroes]);

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchByChange = value => {
    setSearchBy(value);
  };

  const handleSortByChange = (field) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // const handleSortOrderChange = value => {
  //   setSortOrder(value);
  // };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="https://tubes-rizkynugraha-api.vercel.app/">Pahlawan Indonesia</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="https://tubes-rizkynugraha-api.vercel.app/">Home</Nav.Link>
              </Nav>
            <Nav className="ml-auto">
              <Nav.Link href="https://github.com/lordacil">Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container my-5 shadow-lg p-3 mb-5 bg-white rounded" style={{ background: '#f7f7f7' }}>
      <div className="container p-5">
        <center>
        <div class="card">
  <div class="card-header">
    <h5 align="center">Menggunakan Dropdown</h5>
  </div>
  <div class="card-body ">
    <blockquote class="blockquote mb-0">
    <div>
      <p><select class="form-select" value={selectedOption} onChange={handleOptionChange}>
        {heroes.map(hero => (
          <option key={hero.id} value={hero.name}>
            {hero.name}
          </option>
        ))}
      </select></p>
    </div>
      <footer class="blockquote-footer">Selected option: <cite title="Source Title">{selectedOption}</cite></footer>
    </blockquote>
  </div>
</div>
</center>
<br/><br/>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search Pahlawan..."
          aria-label="Search"
          aria-describedby="basic-addon2"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <DropdownButton
          as={InputGroup.Append}
          variant="outline-secondary"
          title={searchBy === 'name' ? 'Name' : searchBy === 'death_year' ? 'Death Year' : searchBy === 'birth_year' ? 'Birth Year' : searchBy === 'ascension_year' ? 'Ascension Year' : 'Description'}
          id="input-group-dropdown-2"
        >
          <Dropdown.Item onClick={() => handleSearchByChange('name')}>Name</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSearchByChange('birth_year')}>Birth Year</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSearchByChange('death_year')}>Death Year</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSearchByChange('ascension_year')}>Ascension Year</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSearchByChange('description')}>Description</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
      <div className="container my-5">
      <Table striped hover responsive>
        <thead>
          <tr className="text-center">
            <th>
              Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} className={`fa fa-sort-${sortBy === 'name' ? sortOrder : 'asc'} ml-2`} onClick={() => handleSortByChange('name')}/>
            </th>
            <th>
              Description&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} className={`fa fa-sort-${sortBy === 'description' ? sortOrder : 'asc'} ml-2`} onClick={() => handleSortByChange('description')}/>
            </th>
            <th>
              Birth Year&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} className={`fa fa-sort-${sortBy === 'birth_year' ? sortOrder : 'asc'} ml-2`} onClick={() => handleSortByChange('birth_year')}/>
            </th>
            <th>
              Death Year&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} className={`fa fa-sort-${sortBy === 'death_year' ? sortOrder : 'asc'} ml-2`} onClick={() => handleSortByChange('death_year')}/>
            </th>
            <th>
              Ascension Year&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} className={`fa fa-sort-${sortBy === 'ascension_year' ? sortOrder : 'asc'} ml-2`} onClick={() => handleSortByChange('ascension_year')}/>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredHeroes.map(hero => (
            <tr key={hero.id}>
              <td>{hero.name}</td>
              <td>{hero.description}</td>
              <td className="text-center">{hero.birth_year}</td>
              <td className="text-center">{hero.death_year}</td>
              <td className="text-center">{hero.ascension_year}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>

      {showBackToTop && (
        <Button variant="secondary" className="fixed-bottom mr-3 mb-3" onClick={handleBackToTop}>
          Kembali ke Atas
        </Button>
      )}
    </div>

    <div>
</div >
    </div>
    </div>
    
);
};

export default App;
