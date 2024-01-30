import { autorun, action, makeObservable, observable } from "mobx"

class UIUserModalStore {
    isVisible;
    userId = null;

    constructor() {
        makeObservable(this, {
            isVisible: observable,
            userId: observable,
            show: action.bound,
            hide: action.bound
        })
    }

    show(id) {
        this.isVisible = true
        this.userId = id
    }

    hide() {
        this.isVisible=false
        this.userId=null
    }
}

export default UIUserModalStore