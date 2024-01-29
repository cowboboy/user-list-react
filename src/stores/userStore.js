import { runInAction, makeObservable, observable, action } from "mobx";
import { UserService } from "../services/user-service";

export const ASC_SORT = "asc_sort"
export const DESC_SORT = "desc_sort"
export const DEFAULT_SORT = "default_sort"

export const LOAD_PENDING = "pending"
export const LOAD_DONE = "done"
export const LOAD_ERROR = "error"

export class ObservableUserStore {
    users = []
    sortedUsers = []
    loadStatus = ""; // ASC_SORT, DESC_SORT, DEFAULT_SORT
    error = ""
    sortedBy = [] // Список полей user, по которым ведется сортировка (первые элементы вносят больший вклад)
  
    constructor() {
      makeObservable(this, {
        users: observable,
        sortedUsers: observable,
        loadStatus: observable,
        error: observable,
        sortedBy: observable,
        addManyAsync: action,
        refreshSortedUsers: action,
        sortByProp: action,
        changeLoadStatus: action
      });
      runInAction(this.addManyAsync)
    }

    get getUsers() {
        if (this.sortedBy.length !== 0) {
            return this.sortedUsers
        } else {
            return this.users
        }
    }
 
    // Возвращает отсортированный массив к исходному состоянию без сортировок
    refreshSortedUsers() {
        this.sortedUsers.splice(0, this.sortedUsers.length)
        this.sortedUsers.push(...this.users)
    }

    changeLoadStatus(status) {
        this.loadStatus = status
    }

    addManyAsync = async () => {
        try {
            this.changeLoadStatus(LOAD_PENDING)
            this.users = [...(await UserService.getAll())]
            this.sortedUsers.push(...this.users)
        } catch(err) {
            this.changeLoadStatus(LOAD_ERROR)
            this.error = err
        } finally {
            this.changeLoadStatus(LOAD_DONE)
        }
    }

    sortByProp(prop, sortType) {
        const sortConditionIndex = this.sortedBy.findIndex(sortCondition => sortCondition.prop === prop)
        
        // Проверяет сортируется ли массив users по данному свойстве или нет
        // Если нет, то добавляет его (Пример: без сортировки меняется на сортировку по возрастанию)
        // Если да, то модифицирует существующий (Пример: изменение сортировки по возрастанию на опцию без сортировки)
        if (sortConditionIndex === -1) {
            this.sortedBy.unshift({prop, type: sortType})
        } else {
            this.sortedBy[sortConditionIndex].type = sortType
        }

        // Удаляем сортировку по свойству, если стоит опция без сортировки
        if (sortConditionIndex > -1 && sortType === DEFAULT_SORT) {
            this.sortedBy.splice(sortConditionIndex, 1)
            this.refreshSortedUsers() // позволяет отсортировать массив без данного условия
        }

        this.sortedBy.map(condition => {
            this.sortedUsers.sort((a, b) => {
                switch(condition.type) {
                    case ASC_SORT:
                        return a[condition.prop] > b[condition.prop]
                    case DESC_SORT:
                        return a[condition.prop] < b[condition.prop]
                }
            })
        })
    }
  }