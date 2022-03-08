
import Cookie from "./Cookie"
function makeUUIDpart(length: number): string {
    let r = ""
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuv123456789!@#$%^&*".split('')
    for(var i = 0; i < length; i++) {
r+= chars[Math.floor(Math.random() * chars.length)]
    }
    return r;
}

function randomUUID() {
    let res = "";
    let length = 4
res = makeUUIDpart(length) + "-"+makeUUIDpart(length) + "-"+makeUUIDpart(length)
    return res;
}
export default function LoginPage() {
    function saveCookie(e: any) : void {
    e.preventDefault();
        const cookie = new Cookie()

    cookie.addProperty("user", JSON.stringify({
        name: ( document.getElementById('name') as HTMLInputElement).value,
        id: ( document.getElementById('id') as HTMLInputElement).value,
    }))
    cookie.save()
    window.location.reload()
    }
    console.log(randomUUID())
    return (
<div>
    Login
<form onSubmit={(e) => saveCookie(e)}>
    <input type="text" name="username" id="name" />
    <input type="button" value="Submit" />
    <input type="hidden" name="id"  id="id" value={randomUUID()}/>
</form>
</div>
    )
}