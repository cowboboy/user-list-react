export class UserService {
    static baseUrl = "https://dummyjson.com/users/"

    static async getOne(id) {
        const response = await fetch(UserService.baseUrl + id)
        let data = await response.json()

        data = UserService.modifyUsers(data)

        return data.users[0]
    }

    static async getAll() {
        const response = await fetch(UserService.baseUrl)
        let data = await response.json()

        data = UserService.modifyUsers(data)

        return data.users
    }

    static async search(query) {
        const response = await fetch(UserService.baseUrl+'search?q='+query)
        let data = await response.json()

        data = UserService.modifyUsers(data)

        return data.users
    }

    // Добавляет fio и address поля к результату
    static modifyUsers(data) {
        data.users.map(user => {
            user.fio = user.lastName + " " + user.firstName + " " + user.maidenName
            user.fullAddress = user.address.city + " " + user.address.address
        })
        return data
    }
}