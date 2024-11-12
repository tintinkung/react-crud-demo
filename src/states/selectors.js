import { selector } from "recoil"
import { usersListUrl } from "./atoms"
/**
 * @typedef {Object} InputFormType 
 * @property {String} id
 * @property {String} name
 * @property {String} email
 * @property {Number} age
 * @property {Number} phone
 */

/** @type {import("recoil").RecoilValueReadOnly<InputFormType[]>} */
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