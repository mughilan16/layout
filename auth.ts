import { login } from "@/api/user";
import { AuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const user = login({email: credentials?.email!, password: credentials?.password!}).then(data => data.user);
                console.log(user);
                //const user = { id: "1", name: "J Smith", email: "email@gmail.com" };
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
