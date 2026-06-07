import handleLogin from "@/app/actions/handleLogin";

function login(){
    return (
        <>
        <form action={handleLogin}>
            <label htmlFor="email" >Email : </label>
            <input type="text" name="email" id="email" />
            <br/>

            <label htmlFor="password">Password : </label>
            <input type="text" name="password" id="password" />
            <br /><br />

            <button type="submit">login</button>
        </form>
        </>
    )
}
export default login;