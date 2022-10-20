import React, {useState, useEffect} from 'react';
import MovieDataService from '../services/movies';
import {Link, Router, useParams, useNavigate} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import logo from '../public/camera.png';
import Figure from 'react-bootstrap/Figure';
import moment from 'moment';
import '../public/movie.css';

// 2022123456

function Movie(props) {
  const navigate = useNavigate();

  const [style, setStyle] = useState({
      textDecoration: 'none'
  });

  const {id} = useParams();
  const [movie, setMovie] = useState({
    id: null,
    title: '',
    rated: '',
    reviews: []
  });

  function getMovie(idd) {
    MovieDataService.get(idd).then((res)=>{
      setMovie(res.data[0]);
      // console.log(res.data);
    }).catch(e=>{console.log(e)});
  }

  useEffect(()=>{
    getMovie(id);
  }, [id]);

  async function deleteReview(reviewId,index) {
    MovieDataService.deleteReview(reviewId, props.user.id).then(response => {
      setMovie((prevState) => {
        prevState.reviews.splice(index,1);
        return({ ...prevState });
      })
    }).catch(e=>{console.log(e)});
  }

  return (
    <div className='App'>
      <Container>
        <Row>
         <Col>
          <Figure>
            {movie.poster ?  <Figure.Image src={movie.poster+"/100px250"} fluid /> : <Figure.Image style={{width:'250px', border:'3px solid #555'}} src={logo} /> }
            {!movie.poster && <Figure.Caption><h3>Image not available</h3></Figure.Caption> }
          </Figure>
         </Col>
         <Col>
          <Card>
            <Card.Header as="h5">{movie.title}</Card.Header>
            <Card.Body>
              <Card.Text>
                {movie.plot}
              </Card.Text> ​​
              {props.user && <Link style={style} onMouseOut={()=>setStyle({textDecoration:'none'})} onMouseOver={()=>setStyle({textDecoration:'underline'})} to={"/movies/id/" + id + "/review"}> Add Review </Link>}
            </Card.Body>
          </Card>
            <br></br>
            <h2>Reviews</h2>
            <br />
            {movie.reviews.map((review, idx)=>{
              return (
                <Card style={{marginBottom:'0px', border:'none'}}>
                  <Card.Body>
                      <h5>{review.name + " reviewed on " + moment(review.date).format('Do MMMM YYYY')}</h5>
                      <p>{review.review}</p>
                      {props.user && props.user.id === review.user_id.toString() &&
                        <Row>
                          <Col>
                            <span>
                              <Link className='UserActionLink' state={{currentReview:review}} to={"/movies/id/"+ id+"/review"}>Edit</Link>
                              <Link onClick={()=>{deleteReview(review._id, idx)}} className='UserActionLink' style={{marginLeft: '10px'}}>Delete</Link>
                            </span>

                          </Col>

                        </Row>
                      }
                  </Card.Body>
                </Card>
              )
            })}
         </Col>
       </Row>
     </Container>
    </div>
  );
}

export default Movie;
