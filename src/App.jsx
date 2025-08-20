/*
Update as of 18th August 3:12 AM

The rendering chatroom and sign in dynamically isn't working. Opening on browser works 
but on electron it doesnt because of the permissions set by firebase

*/

import './App.css'
import { useState, useRef, useEffect } from 'react'
import { auth, firestore } from './firebase'
import { collection, query, orderBy, limit, addDoc, serverTimestamp} from "firebase/firestore"
import { useNavigate } from 'react-router-dom'
import google from './assets/google.png'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

function App() {
  const [user, loading, error] = useAuthState(auth); 

  if (loading) return <div>Loading messages...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='app'>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  )
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  const navigate = useNavigate();

  return (
    <div className='landingPage'>
      <div className='title'>
        Hey there!
      </div>
      <div className='access'>
        <button className='button' onClick={() => navigate('/register')}>Register</button>
        <button className='button'>Login</button>
        <button className='button' onClick={signInWithGoogle}>
          <div className='sso'>
            <img className="google_logo" src={google} alt="Google"/>
            <span>Sign in with Google</span>
          </div>
        </button>
      </div>
    </div>
  )
} 

function SignOut() {
  return (
    <button className='button' onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const messagesRef = collection(firestore, 'messages');
  const messagesQuery = query(messagesRef, orderBy('createdAt'), limit(25));
  const [messages, loading, error] = useCollectionData(messagesQuery, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const { uid, photoURL } = auth.currentUser;

  const dummy = useRef();
  
  useEffect(() => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async(e) => {
      e.preventDefault();
      

      await addDoc(messagesRef, {
        text: formValue,
        createdAt: serverTimestamp(),
        uid,
        photoURL
      });

      setFormValue('');
      
  }
  
  if (loading) return <div>Loading messages...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!messages) return <div>No messages found.</div>;
  
  return (
    <>
      <div className="center">
          <SignOut/>
          <img className="profile-picture-main" src={photoURL}></img>
      </div>
    
      <div className='user-messages'>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}  
        <div ref={dummy}></div>
      </div>
      <form onSubmit={sendMessage} className='form'>
        <input className="input-box" value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
        <button type='submit' className='send-button'>Send</button>
      </form>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
  return (
    <>
      <div className={`message ${messageClass}`}>
          <img className="message-picture" src={photoURL}></img>
          <p className='message1'>{text}</p>
      </div>
    </>
  )
}

export default App