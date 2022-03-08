import React from 'react';
import logo from './logo.svg';
import './App.css';
import Cookie from './Cookie'
import io from 'socket.io-client'
import Messages from './componets/Messages';
import MessageInput from './componets/MessageInput'

enum Themes {
  LIGHT,
  DARK
}
function App() {
 const [socket, setSocket] = React.useState<any>(null);

  React.useEffect(() => {
    const newSocket = io(`https://chess-api.neongamerbotqk.repl.co`, { query: { user: Cookie.parse(document.cookie).object.get('user') }});
    setSocket(newSocket);
    return () => { // Remove async from here
      const clear = async () => { // Create a new async function: clear
        // write your cleanup code here
      newSocket.close()
      };
      clear() // Call the clear() function
    };
  }, [setSocket]);
  const toggleSwitch:HTMLInputElement | null = document.querySelector('.theme-switch input[type="checkbox"]');
  function toggleTheme(theme:Themes) {
    if(theme === Themes.DARK && toggleSwitch) {
      if(!document.body.classList.contains('dark-mode')) {
       document.body.classList.add('dark-mode'); 
      }
      toggleSwitch.checked = true;
    } else if(theme === Themes.LIGHT && toggleSwitch) {
      if(document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode'); 
       }
      toggleSwitch.checked = false;
    }
  }
let currentTheme:any = localStorage.getItem('theme');
  if (currentTheme) {
currentTheme = parseInt(currentTheme)
    if (currentTheme === Themes.DARK && toggleSwitch) {
      toggleTheme(currentTheme)  
    }
}
 
function switchTheme(e: any) {
    if (e.target.checked) {
        localStorage.setItem('theme', Themes.DARK.toString())
        toggleTheme(Themes.DARK)
    }
    else {       
      toggleTheme(Themes.LIGHT)
          localStorage.setItem('theme', Themes.LIGHT.toString());
    }    
}

toggleSwitch?.addEventListener('change', switchTheme, false);
  return (
    <div className="App" id="app">
        <div className="theme-switch-wrapper">
       <label className="theme-switch">
    <input type="checkbox" id="checkbox" />
    <div className="slider round"></div>
  </label>
    <em>Enable Dark Mode!</em>
  </div>
  { socket ? (
        <div className="chat-container">
          <Messages socket={socket} />
          <MessageInput socket={socket} />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}

export default App;
