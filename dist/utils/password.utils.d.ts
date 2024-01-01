export declare const hashPassword: (plainText: string) => string;
export declare const validatePassword: (password: string, hashedPassword: string) => Promise<void>;
export declare const comparePassword: (password: string, hashedPassword: string) => Promise<boolean>;
export declare const PasswordRegex: RegExp;
