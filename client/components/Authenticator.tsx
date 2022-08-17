import React, { useEffect } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Authenticator = ({ children }: { children: React.ReactNode}) => {
    const {data, status} = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/login')
        }
    }, [status])

    return <>{children}</>
}

export default Authenticator;