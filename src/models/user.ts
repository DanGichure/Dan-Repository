interface Address {
    city: string;
    postalCode: string;
    county: string;
    country: string;
}

export interface User {
    id: string;
    createdAt: Date;
    name: string;
    avatar: string; //URL
    email: string;
    phone: string;
    occupation: string;
    verified: boolean;
    age: number | null;
    company: string;
    skills: string[];
    gender: string;
    county: string;
    biography: string;
    interests: string[];
    address: Address;

}