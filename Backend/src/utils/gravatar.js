import crypto from "crypto";

/**
 * Generate a Gravatar URL for a given email.
 * @param {string} email User's email address
 * @param {number} size Size of the Gravatar image (default 200)
 * @returns {string} Gravatar URL
 */
export function gravatar(email, size = 200) {
    const trimmedEmail = email.trim().toLowerCase();
    const hash = crypto.createHash("md5").update(trimmedEmail).digest("hex");
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}
