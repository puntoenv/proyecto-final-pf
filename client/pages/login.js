import React from "react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

export default function () {
    const {data: session} = useSession()
    console.log(session)
    
    return (
        <>
            {
                session ? 
                <div>
                    <p>Go to <Link href={'/profile'}>{session.user.name}'s</Link> profile.</p>
                </div> 
                : <div>
                    <h1>LOG IN</h1>
                    <div>
                        <form>
                            <label>User: <input type='text'></input></label>
                            <br />
                            <label>Password: <input type='text'></input></label>
                        </form>
                        <button type="submit">Log in</button>
                    </div>
                    <div>
                        <h1>SIGN IN</h1>
                        <button onClick={() => signIn()}>Sign in</button>
                    </div>
                </div> 
            }
        </>
    )
}