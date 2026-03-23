// Users module — mostly untested (higher risk surface)

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'member' | 'viewer';
  createdAt: Date;
}

export interface UserProfile {
  displayName: string;
  avatarUrl?: string;
  bio?: string;
}

// ── Tested ───────────────────────────────────────────────────────────────────

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Untested — production-reachable, exported ─────────────────────────────────

export function hasPermission(user: User, action: string): boolean {
  const permissions: Record<string, string[]> = {
    admin: ['read', 'write', 'delete', 'manage'],
    member: ['read', 'write'],
    viewer: ['read'],
  };
  return permissions[user.role]?.includes(action) ?? false;
}

export function formatUserDisplayName(user: User, profile?: UserProfile): string {
  return profile?.displayName || user.email.split('@')[0];
}

export function sanitizeProfile(profile: UserProfile): UserProfile {
  return {
    displayName: profile.displayName.trim().slice(0, 100),
    avatarUrl: profile.avatarUrl,
    bio: profile.bio?.trim().slice(0, 500),
  };
}

export function mergeProfiles(base: UserProfile, overrides: Partial<UserProfile>): UserProfile {
  return { ...base, ...overrides };
}

export function getUserAge(user: User): number {
  const ms = Date.now() - user.createdAt.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

export function isAdmin(user: User): boolean {
  return user.role === 'admin';
}
