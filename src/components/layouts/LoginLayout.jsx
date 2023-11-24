import { SignIn, SignUp } from "../../page-sections";

function LoginLayout({ handleLogin, setPassword, setUsername, username, password, pagename }) {
  return (
    <div className='login-layout'>
      <div className='row'>
        <div className='wrap-left'>
          <div className='slide'>
            <img src="/assets/images/slide-2.png" alt="" width={800} />
          </div>
        </div>
        <div className='wrap-right'>
          {(pagename === 'signup')? <SignUp/> : <SignIn handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword}
            username={username} password={password}/>}          
        </div>
      </div>
    </div>
  )
}

export default LoginLayout