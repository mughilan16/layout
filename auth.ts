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
                const user = await login({ email: credentials?.email!, password: credentials?.password! });
                if (user) {
                    return {
                        id: user.user.user_id,
                        name: user.user.user_name,
                        token: user.token,
                        profileSetting: user.profileSetting
                    };
                } else {
                    return null;
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
        },
    }
}

const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
