import nextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export default nextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'user',
        },
      },
    }),
  ],
  callbacks: {
    redirect: ({ url, baseUrl }) => {
      if (url === baseUrl) {
        return `${baseUrl}/chats`;
      }

      return baseUrl;
    },
    jwt: async ({ token, profile, account }) => {
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          login: profile.login,
        };
      }

      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        ...token,
      };
    },
  },
});
