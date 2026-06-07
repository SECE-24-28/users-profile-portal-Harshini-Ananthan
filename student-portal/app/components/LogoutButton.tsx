import handleLogout from "../actions/handleLogout";

export default function LogoutButton(){
    return (
        <>
            <button onClick = {handleLogout}>Logout</button>
        
        </>
    )
}