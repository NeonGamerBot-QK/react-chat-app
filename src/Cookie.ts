export interface CookieResult {
    names: string[];
    values: string[];
    size?: number;
    cookie: string
    expires?: Date
    expires_in?: number
    path?: string
    object: Map<string, any>
}
export default class Cookie 
{
static _parse(data: string): string {
let res = data;
try { 
    res = JSON.parse(data);
} catch (e) {
}
return res;
}
    static parse(cookie: string): CookieResult {
        let res:CookieResult = { cookie, names: ([] as string[]), values: ([] as string[]), object: new Map<string, any>()};
let cookies = cookie.split(';')
cookies.forEach((c,i) => {
//    console.log(c)
    let [name, value] = c.split('=');
    res.names.push(name)
    res.values.push(Cookie._parse(value));
res.object.set(name, value);
})
res.size = cookies.length

        return (res as CookieResult)
    }


str: string
destroyed: Boolean
saved: Boolean
    constructor() {
this.str = ""
this.destroyed = false;
this.saved = false;
    }
    private _addProperty(name: string, value:string) {
       if(this.destroyed) return new Error("Cookie Is destroyed");
        this.str += `${name}=${value}; `
    }
    setPath(path: string) {
        this._addProperty("path", path)
    }
    addProperty(name: string, value:string) {
this._addProperty(name, value.toString())
    }
    setString(string: string) {
        this.str = string
    }
    get properties() {
        return Cookie.parse(this.str)
    }
    save() {
        document.cookie += this.str
    this.saved = true
    }
    destroy() {
        this.destroyed = true
        if(this.saved) {
            document.cookie = document.cookie.replace(this.str, '')
            this.saved = false
        }
        this.str = ""

    }
    static setCookie = setCookie
}
export function setCookie(cName:string, cValue:string, expDays?:number) {
    let date = new Date();
    date.setTime(date.getTime() + ((expDays||0) * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}