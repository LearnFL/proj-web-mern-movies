import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export default function LogOut(props) {
  let navigate = useNavigate();
  useEffect(()=>{
    props.logout();
    navigate('/');
  },[props.logout])
}
