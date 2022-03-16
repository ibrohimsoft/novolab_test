import React,{useState,useEffect} from 'react';
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
// import Logo from "../../Main_images/logo.png";
// import HomeIcon from '@mui/icons-material/Home';
import {useDispatch,useSelector} from 'react-redux';

import { AiOutlineHome,AiFillHome } from 'react-icons/ai';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navbar.scss"

import {
    faFacebook,
    faInstagram,
    faTwitter,
    faYoutube,
  } from "@fortawesome/free-brands-svg-icons";

function Navbar() {
  const dispatch = useDispatch();
  const success = useSelector((state:any) =>state.posts.isSuccess);

  const countState = useSelector((state:any) =>state.posts.count);

  const [scroll, setScroll] = useState(false);
  const [isHome,setIsHome] = useState(true);
  const [count,setCount] = useState(-1);
  
  
 useEffect(() => {
   if(success){setCount(countState);
    onNews(countState)
    if(countState===0){
      setCount(countState)}
  }
 },[]) 

  const onHome=()=>{
    setIsHome(true)
    setCount(-1)
  };
  const onNews=(id:number)=>{
   let log= localStorage.getItem('Login');
   let pass= localStorage.getItem('Password');
    setIsHome(false);
   if(log && pass){
    if(countState===0){
    setCount(countState)}
   else{setCount(id)} 
    console.log(id)
    }else{
    setCount(id)
  setCount(1)
  }
}
  
const list=[{id:0,text:'news'},{id:1,text:'login'}]
            
  const handleScroll = () => {
    let y = window.scrollY;
    if (y > 250) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };
useEffect(() => {window.addEventListener('scroll', handleScroll)})

    return (
    <div
     className="navbar-m"
     style={{position: scroll ? 'fixed' :'relative'}}
     >
     <Container>
         <Row>
             <Col md='6' className="nav">
             <Link to='/' className={`nav__list_item_link_n_l mt-2 mb-2 ${isHome ? 'text-primary isLine':''}`} onClick={onHome}>
             {isHome ? 
             <AiFillHome className={`aiFillHome`} onClick={onHome}/>
             :<AiOutlineHome className={`aiFillHome`} onClick={onHome}/> }
             </Link>
             <ul className="nav__list">
              {list.map((v:({
                  id: number;
                  text: string;
              }),i) => 
                <li key={i} className='nav__list_item ' onClick={()=>onNews(v.id)}>
                    <Link to={`/${v.text}`} className={`nav__list_item_link_n_l ${ count===i ? ' text-primary isLine':''}`}>
                      {v.text.toUpperCase()}
                    </Link>
                </li>
               )}
              </ul>
             </Col>
             <Col md="6" className="socials" sm="12" xs="12"
             >
            <ul className="list-inline">
              <li className="list-inline-item">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://youtube.com" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </li>
            </ul>
          </Col>
         </Row>
     </Container>
    </div>
  )
}

export default Navbar;