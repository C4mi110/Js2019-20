class Notes {
    constructor(id, title, text, color, priority) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.color = color;
        this.isPickedUp = priority;
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        this.createDate = date+' '+time;
    }
}