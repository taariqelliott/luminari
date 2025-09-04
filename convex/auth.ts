import GitHub from '@auth/core/providers/github';
import { convexAuth } from '@convex-dev/auth/server';

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      profile(githubProfile, tokens) {
        // Ensure all required fields are properly set
        const id = githubProfile.id?.toString() ?? `github_${Date.now()}`;
        const name = githubProfile.name ?? githubProfile.login ?? 'GitHub User';
        const email = githubProfile.email ?? null;
        const image = githubProfile.avatar_url ?? null;
        
        console.log('GitHub profile data:', { id, name, email, image, originalId: githubProfile.id });
        
        return {
          id,
          name,
          email,
          image,
          githubId: githubProfile.id,
        };
      },
    }),
  ],
});