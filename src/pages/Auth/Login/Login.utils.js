import LoginView from "./Login.view";

export default function LoginUtils() {
const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
        email: data.get('email'),
        password: data.get('password'),
        });
};
    return (

            <LoginView
            
                handleSubmit = {(e)=>handleSubmit(e)}

            />
                
            
    )
}