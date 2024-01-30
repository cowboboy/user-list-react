export class UserService {
    static baseUrl = "https://dummyjson.com/users/"

    static async getOne(id) {
        const response = await fetch(UserService.baseUrl + id)

        if (!response.ok) {
            throw new Error("HTTP error: " + response.status)
        }
        
        let data = await response.json()
        data = UserService.modifyData(data)

        return data.users[0]
    }

    static async getAll() {
        const response = await fetch(UserService.baseUrl)
        
        if (!response.ok) {
            throw new Error("HTTP error: " + response.status)
        }

        let data = await response.json()
        data = UserService.modifyData(data)

        return data.users
    }

    static async search(query) {
        const response = await fetch(UserService.baseUrl+'search?q='+query)
        
        if (!response.ok) {
            throw new Error("HTTP error: " + response.status)
        }
        
        let data = await response.json()
        data = UserService.modifyData(data)

        return data.users
    }

    // Добавляет fio и address поля к результату
    static modifyData(data) {
        data.users.map(user => {
            user.fio = user.lastName + " " + user.firstName + " " + user.maidenName
            user.fullAddress = user.address.city + " " + user.address.address
        })
        return data
    }
}