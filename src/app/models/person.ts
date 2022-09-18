// Describes a single entity from the "People" API
// Only adding whats actually used on the front end for this demo

export interface Person {
    id: string;
    isActive: boolean;
    age: number;
    gender: string;
    name: string;
    registered: string;
    about: string;
}