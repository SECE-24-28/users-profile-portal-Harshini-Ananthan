import handleSignup from "@/app/actions/handleSignup";

function signup(){
    return (
        <>
        <form action={handleSignup}>
            <label htmlFor="name" >Full name : </label>
            <input type="text" name="name" id="name" />
            <br/>

            <label htmlFor="email" >Email : </label>
            <input type="text" name="email" id="email" />
            <br/>

            <label htmlFor="password">Password : </label>
            <input type="text" name="password" id="password" />
            <br /><br />

            <button type="submit">signup</button>
        </form>
        </>
    )
}
export default signup;