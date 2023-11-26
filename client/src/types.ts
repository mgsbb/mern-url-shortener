export interface AuthFormData {
	firstName: string;
	lastName: string;
	email: String;
	password: String;
	confirmPassword: string;
}

export interface ShortlinkFormData {
	title: string;
	description: string;
	target: string;
	shortlink: string;
}

export interface DecodedToken {
	email: string;
	firstName: string;
	lastName: string;
	userId: string;
}
