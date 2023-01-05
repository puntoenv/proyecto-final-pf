import React from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import Image from "next/image";
import styles from '../styles/profile.module.css'

const profile = () => {
    const {data: session} = useSession()

    return (
        <div>
            {
                session ? 
                <div>
                    <Image src={session.user.image} width={150} height={150} style={{borderRadius: '50%'}} alt={session.user.name}></Image>
                    <h1>Welcome, {session.user.name}</h1>
                    <button onClick={() => signOut()}>Sign out</button>
                </div> : 
                <div>
                    <p>You are not sign in</p>
                </div>
            }
        </div>
    ); 
};

export default profile

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if(!session) {
        return {
            redirect: {
                destination: '/login'
            }
        }
    };

    return {
        props: { session }
    };
};