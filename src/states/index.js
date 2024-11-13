import { atom, selector } from "recoil";

/**
 * @typedef {Object} userDataType 
 * @property {String} id
 * @property {String} name
 * @property {String} email
 * @property {Number} age
 * @property {Number} phone
 */

/** @type {import("recoil").RecoilValueReadOnly<userDataType[]>} */
export const fetchUsersSelector = selector({
    key: "fetchUsersSelector",
    get: async ({ get }) => {
        try {
            const url = get(usersListUrl)

            console.log("Fetching", url)
            const response = await fetch(url)


            const results = await response.json()
            console.log("Got", results)
    
          return results
        } catch (error) {
            console.log("Error!", error)

            throw error
        }
    },
})

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

export const userListsAtom = atom({
    key: "userListsAtom",
    default: fetchUsersSelector,
  });
  

export const usersListUrl = atom({
    key: "usersListUrl",
    default: "https://tin-ideapad.taila98457.ts.net/backend/users/"
});