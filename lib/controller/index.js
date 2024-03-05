class C {
    constructor() {
        this.status = true
        this.data = {}
        this.mess = ""
    }

    res() {
        return {
            mess: this.mess,
            data: this.data,
            status: this.status
        }
    }

}