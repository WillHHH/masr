import NextAuth from "next-auth";
import OktaProvider from "next-auth/providers/okta";

const options = {
  providers: [
    OktaProvider({
      clientId: process.env.NEXT_PUBLIC_OKTA_CLIENTID,
      issuer: process.env.NEXT_PUBLIC_OKTA_DOMAIN,
      clientSecret: "",
      checks: ["pkce", "state"],
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
      client: {
        token_endpoint_auth_method: "none",
      },
      idToken: true,
    }),
  ],
  session: {
    maxAge: 30,
  },
  secret: process.env.NEXT_PUBLIC_OKTA_CLIENTID,
  debug: true,
  callbacks: {
    async jwt({ token, profile }: any) {
      if (profile !== undefined) {
        return { ...token, userID: profile.user };
      }
      return { ...token };
    },
    async session({ session, token }: any) {
      return { ...session, userID: token.userID };
    },
  },
};

const handler = async (req: any, res: any) => {
  return NextAuth(req, res, options);
};

export default handler;
