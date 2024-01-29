import { runInAction, makeObservable, observable, action } from "mobx";
import { UserService } from "../services/user-service";

export const ASC_SORT = "asc_sort"
export const DESC_SORT = "desc_sort"
export const DEFAULT_SORT = "default_sort"

export class ObservableUserStore {
    users = [];
    isLoading = false;
  
    constructor() {
      makeObservable(this, {
        users: observable,
        isLoading: observable,
        addManyAsync: action,
      });
      runInAction(this.addManyAsync)
    }

    addManyAsync = async () => {
        try {
            this.isLoading = true
            this.users = [...(await UserService.getAll())]
        } catch(err) {
            console.log(err)
        } finally {
            this.isLoading = false
        }
    }

    sortByProp(prop, sortType) {
        this.users.sort((a, b) => {
            switch(sortType) {
                case ASC_SORT:
                    return a[prop] > b[prop]
                case DESC_SORT:
                    return a[prop] < b[prop]
            }
        })
    }
  }