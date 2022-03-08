
import { FormEvent, useState } from 'react'
import './MessageInput.css';
interface Params {
    socket: any
}
export default function Chatboard({ socket }: Params) {
    const [term, setTerm] = useState('');
    function sendMessage(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        socket.emit('message', term)
        setTerm("");
}
    return (
        <div id="chatboard-form">

<form  onSubmit={(e) => sendMessage(e)}>
<input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          type="text"
          placeholder="Enter a term"
          className="input"
          autoFocus
        />
        
    </form>
        </div>
    )
}