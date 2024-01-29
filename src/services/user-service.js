export class UserService {
    static baseUrl = "https://dummyjson.com/"

    static async getAll() {
        const response = await fetch(UserService.baseUrl+'users')
        const data = await response.json()

        data.users.map(user => {
            user.fio = user.lastName + " " + user.firstName + " " + user.maidenName
            user.fullAddress = user.address.city + " " + user.address.address
        })
        
        return data.users
    }
}