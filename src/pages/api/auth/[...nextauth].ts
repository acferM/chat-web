import nextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export default nextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    redirect: ({ url, baseUrl }) => {
      if (url === baseUrl) {
        return `${baseUrl}/chats`;
      }

      return baseUrl;
    },
  },
});
