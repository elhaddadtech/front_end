import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // If no user session is found, set a fallback user session
      if (!session.user) {
        session.user = { email: "guest@example.com" }; // Fallback user
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // Only allow users with a valid domain, e.g., @uca.ac.ma
      if (user.email && user.email.endsWith("@uca.ac.ma")) {
        return true; // Allow sign-in if the domain is valid
      } else {
        // Reject sign-in if the email domain is not allowed
        return false;
      }
    },
  },
  pages: {
    signIn: "/auth/login", // Custom login page
    error: "/auth/error", // Custom error page in case of authentication failure
  },
  secret: process.env.JWT_SECRET, // Secret for signing tokens
  session: {
    strategy: "jwt", // Use JWT for session handling
  },
  events: {
    async signOut(message) {
      console.log("User signed out", message);
    },
  },
});
