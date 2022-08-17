import { NextPage } from "next";
import Link from "next/link";

const Login: NextPage = () => {
    return <div>
       <Link href="/api/auth/signin">
          <a>Log in</a>
        </Link>
    </div>
}

export default Login;