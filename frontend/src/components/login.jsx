import React, {useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import {Switch, Route, Link, useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../public/login.css';

export default function LogIn(props) {
  let navigate = useNavigate();

  const [error, setError] =  useState(null);

  const [name, setName] =  useState('');
  const [id, setId] = useState('');

  function onChangeName(e) {
    setName(e.target.value);
  }

  function onChangeId(e) {
    setId(e.target.value);
  }

  function login() {
    if (name.length > 5 && id.length > 5) {
      props.login({name:name, id:id});
      navigate('/');
      console.log('id:'+id);
    } else{
      setError(1);
      setTimeout(()=>setError(null), 2000);
    }
  }

  return(
    <div className='App'>
      <Form className="LoginForm">
        <Form.Group className="FormGroup">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={name} onChange={onChangeName} />
        </Form.Group>
        <Form.Group>
          <Form.Label>ID</Form.Label>
          <Form.Control type="password" placeholder="Enter id" value={id} onChange={onChangeId} />
        </Form.Group>
        <Button className="LoginSubmitButton" variant="primary" onClick={login}> Submit </Button>
        {error && <p style={{color:'red'}}>Please check your password and/or id</p>}
      </Form>
    </div>
  );
}
