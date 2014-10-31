class TodoItem {
    constructor(text, completed) {
        this.text = text;
        this.completed = completed;
    }
    toggle() {
        this.completed = !this.completed;
    }
}