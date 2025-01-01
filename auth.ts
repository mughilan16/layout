import { AuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                Password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                console.log(credentials, req);
                const user = { id: "1", name: "J Smith", email: "email@gmail.com" };
                if (user) {
                    return user
                } else {
                    return null;
                }
            },
        })
    ]
}

const getSession = () => getServerSession(authOptions);

export {authOptions, getSession};
