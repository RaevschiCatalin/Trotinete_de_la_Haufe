"use client";
import {auth, updateSocial, updateUserSkils} from "../firebase"
import {signOut} from "firebase/auth"
import Link from "next/link";
import {useEffect, useState} from 'react';
import {getUser} from "../firebase";
import Image from "next/image";


const Profile = () => {
    const [user, setUser] = useState({
        id: "",
        mail: "",
        username: "",

    })

    useEffect(() => {
        const getUserByMail = async () => {
            await getUser(auth.currentUser?.email).then(resp => {
                // @ts-ignore
                return setUser(resp);
            })
        }
        getUserByMail();
        console.log(user)
    }, [])
    const handleSignOut = () => {
        signOut(auth)
            .catch(err => alert(err))
    }


    return (
        <div className="flex flex-col justify-center w-full align-middle mt-6 p-24">
            <h1 className=" text-4xl font-extrabold text-center mb-12 ">Hello, <span
                className="purple_gradient">{user.username}</span>!</h1>
            <h1 className=" text-4xl font-extrabold text-center mb-12 ">*Ride History*</h1>
            <h1 className="text-2xl text-center mt-12 font-extrabold">Log Out</h1>
            <button className="self-center w-1/4 mt-12 mb-24" onClick={handleSignOut}><Link href="/">
                <Image alt={"logout"} src={require("./icons/logout.png")} height={32} width={32}/>
            </Link></button>
        </div>
    )
}

export default Profile;