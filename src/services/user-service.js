export class UserService {
    static baseUrl = "https://dummyjson.com/"

    static async getAll() {
        const response = await fetch(UserService.baseUrl+'users')
        const data = await response.json()
        return data.users
    }
}