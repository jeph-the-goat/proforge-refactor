'use server';

import { compare } from 'bcrypt';
import bcrypt from "bcryptjs";
import { headers } from 'next/headers';

// Rate limiting map
const attempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const userAttempts = attempts.get(ip) || { count: 0, lastAttempt: now };

    // Reset if window has passed
    if (now - userAttempts.lastAttempt > WINDOW_MS) {
        attempts.set(ip, { count: 1, lastAttempt: now });
        return true;
    }

    // Increment attempts
    if (userAttempts.count >= MAX_ATTEMPTS) {
        return false;
    }

    attempts.set(ip, {
        count: userAttempts.count + 1,
        lastAttempt: now
    });
    return true;
}

export async function verifyPassword(
    plainPassword: string,
    hashedPassword: string
): Promise<boolean> {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';

    // Rate limiting
    if (!checkRateLimit(ip)) {
        throw new Error('Too many attempts. Please try again later.');
    }

    // Input validation
    if (!plainPassword || !hashedPassword) {
        throw new Error('Invalid input');
    }

    if (plainPassword.length < 8 || plainPassword.length > 100) {
        throw new Error('Invalid password length');
    }

    try {
        return await compare(plainPassword, hashedPassword);
    } catch (error) {
        console.error('Password verification error:', error);
        throw new Error('Authentication failed');
    }
}

export async function hashPassword(password: string): Promise<string> {
    // Input validation
    if (!password || password.length < 8 || password.length > 100) {
        throw new Error('Invalid password');
    }

    try {
        const salt = await bcrypt.genSalt(12);
        return bcrypt.hash(password, salt);
    } catch (error) {
        console.error('Password hashing error:', error);
        throw new Error('Failed to process password');
    }
}