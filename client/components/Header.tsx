import { Button, PageHeader } from "antd";
import { signOut, useSession } from 'next-auth/react';

const SignOutButton = () => {
    return (
        <Button onClick={() => signOut()}>
            Log out
        </Button>
    )
}
const Header = () => {
    const {data: session, status} = useSession();

    return <PageHeader>
        { session ? <SignOutButton /> : <div>HEADER</div> }
    </PageHeader>
}

export default Header;