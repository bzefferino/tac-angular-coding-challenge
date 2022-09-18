// Describes a single entity from the "People" API
// Only adding whats actually used on the front end for this demo

// I could type this as a Person, but i don't know where the data is coming from and if it is ever updated, 
// it could cause problems so using an interface I can use the other properties when i want which is better
// for update calls as i don't know how the server is updating the data in this case and if any fields are missing,
// then it may delete the data there. I didn't design it so I don't know.

export interface Person {
    id: string;
    isActive: boolean;
    age: number;
    gender: string;
    name: string;
    registered: string;
    about: string;
}