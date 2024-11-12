import { atom } from "recoil";

export const formInputAtom = atom({
    key: "formInputAtom",
    default: {
        id: null,
        name: "Unkown",
        email: "Unkown",
        age: -1,
        phone: null,
    }
});

export const usersListUrl = atom({
    key: "usersListUrl",
    default: "http://localhost:8800/users"
});