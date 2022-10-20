import React, {useState, useEffect} from 'react';
import MovieDataService from '../services/movies';
import {Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import '../public/movies-list.css';
import logo from '../public/camera.png';

export default function MoviesList(props) {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchRating, setSearchRating] = useState('');
  const [ratings, setRatings] = useState(['All Ratings']);
  const [currentPage, setCurrentPage] = useState(0);
  const [entriesPerPage, setEntriesPage] = useState(0);
  const [currentSearchMode, setCurrentSearchMode] = useState('');


  useEffect(()=>{
      retrieveMovies();
      retrieveRatings();
    }, []);

  useEffect(() =>{
    // retrieveMovies();
    retrieveNextPage();
  },[currentPage]);

  useEffect(()=>{
    setCurrentPage(0);
  }, [currentSearchMode]);

  function retrieveNextPage() {
    if(currentSearchMode === 'findByTitle'){
      findByTitle();
    }else if (currentSearchMode === 'findByRating'){
      findByRating();
    }else {
      retrieveMovies();
    }
  }

  function retrieveMovies() {
    setCurrentSearchMode('');
    MovieDataService.getAll(currentPage).then((response)=>{
      // console.log(response.data);
      setMovies(response.data.movies);
      setCurrentPage(response.data.page);
      setEntriesPage(response.data.entries_per_page);
      }).catch(e=>{console.log(e)});
  }

  function retrieveRatings() {
    MovieDataService.getRatings().then((response)=>{
      // console.log(response.data);
      setRatings(['All Ratings'].concat(response.data));
    }).catch(e=>{console.log(e)});
  }

  function onChangeSearchTitle(e) {
    setSearchTitle(e.target.value);
  }

  function onChangeSearchRating(e) {
    setSearchRating(e.target.value);
  }

  function find(query, by) {
    MovieDataService.find(query, by, currentPage).then(response =>{
       // console.log(response.data);
       setMovies(response.data.movies)
     }).catch(e =>{
       console.log(e)
      })}

  function findByTitle() {
    setCurrentSearchMode('findByTitle');
    find(searchTitle, "title");
  }

  function findByRating() {
    setCurrentSearchMode('findByRating');
    if(searchRating === "All Ratings"){
      retrieveMovies();
    } else{
      find(searchRating, "rated") ;
    }
  }

  return (
    <div className='App'>
      <Container>
        <Form className='SearchForm'>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control type="text" placeholder="Search by title" value={searchTitle} onChange={onChangeSearchTitle} />
              </Form.Group>
              <Button variant="primary" type="button" onClick={findByTitle} >
                Search
              </Button>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control as="select" onChange={onChangeSearchRating} >
                  {ratings.map(rating =>{ return( <option value={rating}>{rating}</option> ) })}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="button" onClick={findByRating} >
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <Row > {movies.map((movie) =>{
          return(
            <Col>
              <Card className="MovieRow" style={{ width: '18rem' }}>
                {movie.poster ? <Card.Img src={movie.poster+"/100px180"} /> : <Card.Img style={{width:'50px'}} src={logo} />}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text> Rating: {movie.rated}</Card.Text>
                  <Card.Text>{movie.plot}</Card.Text>
                  <Link to={"/movies/id/"+movie._id} >View Reviews</Link>
                </Card.Body>
              </Card>
             </Col>
            )
          })}
      </Row>
      <br />
      Showing Page: {currentPage}.
      <Button variant='link' onClick={()=>{setCurrentPage(currentPage+1); window.scrollTo({ top: 0, behavior: 'smooth' });}}>Get next {entriesPerPage} results </Button>
      </Container>
    </div>
  );
}
