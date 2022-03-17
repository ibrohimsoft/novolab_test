import React,{useEffect,useState,useRef} from 'react';
import { useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {updateCount,updateLogin,updatePassword} from '../../redux/post';
import News from '../News/News';
import {AiOutlineEyeInvisible} from 'react-icons/ai'
import {MdOutlineVisibility} from 'react-icons/md'

import './Login.scss';
function Login() {
     const navigate= useNavigate();
  // const[login,setLogin]=useState('');
  // const[password,setPassword]=useState('');
  const[flag,setFlag]=useState(false );
  const ref=useRef<HTMLInputElement>(null);
interface TodoItems{
  flag:boolean;
}

 const dispatch = useDispatch();
 const [success,setSuccess]=useState(true);
  
 localStorage.setItem('Login',('admin'));
 localStorage.setItem('Password',('admin123'));

const submitUser=(e:any)=>{
   e.preventDefault();
   let log= localStorage.getItem('Login');
   let pass= localStorage.getItem('Password');
   localStorage.setItem('user-login',  e.target[0].value );
   localStorage.setItem('user-password',(e.target[1].value));
   let login:any  = localStorage.getItem('user-login');
   let password:any=localStorage.getItem('user-password')

   dispatch(updateLogin(login))
   dispatch(updatePassword(password))
console.log(login,password);
   if(!login || !password){
    setFlag(false);
    setSuccess(false)
     alert('Please enter login or password')
    }else if(login!==log || password !==pass){
      setFlag(false);
      setSuccess(false) 
    }else{
      dispatch(updateCount(0))
      setSuccess(true) 
      setFlag(true);
      navigate('/news')
     }
    }
    const [show,setShow]=useState(false);
    function toggleVisible(){
      setShow(p=>!p) }
  return <>
  {!flag ?
   <div className="wrapper">
    <div className='mt-3'>
       <h3 className='text-center'>Login page</h3>
         <div className="wrapper_item">
           <div className="wrapper_item_registration">
             <div className="wrapper_item_registration_form">
               <h4 className="enter">Log in</h4>
               <form id={'form'} onSubmit={submitUser} autoComplete="new-password">
                 <input type="text" className={`${!success && 'border border-danger' }`} placeholder="Login" autoComplete="new-password" required/>
                 <div className='d-flex onVisible-wrap'>
                    <input ref={ref} className={`onVisible-wrap ${!success && 'border border-danger' } `} type={show ?'text':'password'} autoComplete="new-password"  placeholder="Parol" required/>                    
                    <span className='onVisible' onClick={toggleVisible}>
                       {show ? <MdOutlineVisibility/>:<AiOutlineEyeInvisible/>}
                    </span>  
                 </div>
                    <div className='d-flex'>{!success ? <p className={`${!success && 'text-danger' }`}>login or password invalid</p>:null}</div>
                 <button form={'form'} type='submit' className="kirish"><span>Enter</span></button>
                 <button type='reset' className="reset">reset</button>
               </form>
             </div>
           </div>
         </div>
       </div>
    </div>
  :<News />  
  }
  </>
}
export default Login;