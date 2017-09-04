class Circle{
    constructor(ctx, id, x, y, radius){
        this.ctx = ctx;
        this.id = id;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = "gray";
        this.ownedBy = null;
        this.numbers = this.radius*2;
        this.selected = false;
    }
    draw(remove = false){
        if(remove){
            ctx.globalCompositeOperation = 'destination-out';
            var radius = this.radius+2;
        } else var radius = this.radius;
        ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 2;
        if(this.selected) ctx.strokeStyle = 'red';
        else ctx.strokeStyle = '#003300';
        ctx.stroke();
        if(remove) ctx.globalCompositeOperation = 'source-over'; 
    }
    writeNumber(){
        this.draw();
        ctx = this.ctx;
        ctx.font = this.radius/2+"px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(this.numbers,this.x,this.y+this.radius/8);
    }
    produceNumbers(){
    this.numbers = Math.round(this.numbers);
    this.numbers += Math.round(this.radius/10);
    this.writeNumber();
    }
    clicked(x, y){
    if(Math.sqrt((x-this.x)*(x-this.x) + (y-this.y)*(y-this.y)) < this.radius) return true;
    return false;
    }
    onClicked(){
        if(SELECTED_ANY == false && this.selected == false && SELECTED == "none" && this.ownedBy == "player"){
            this.selected = true;
            this.writeNumber();
            SELECTED = this.id;
            SELECTED_ANY = true;
        }
        else if(SELECTED_ANY == true && this.selected == false && SELECTED != "none"){
            if(this.ownedBy == CIRCLES[SELECTED].ownedBy) this.transfer();
            else this.defend();
            SELECTED_ANY = false;
            SELECTED = "none";
            this.selected = false;
        }
    }
    defend(){
        var agressor = CIRCLES[SELECTED];
        agressor.numbers = agressor.numbers/2;
        this.numbers -= agressor.numbers;
        if(this.numbers <= 0) this.changeOwned();
        agressor.selected = false;
        agressor.writeNumber();
    }
    transfer(){
        var friend = CIRCLES[SELECTED];
        friend.numbers = friend.numbers/2;
        this.numbers += friend.numbers;
        friend.selected = false;
        friend.writeNumber();
    }
    changeOwned(){
        this.ownedBy = "player";
        this.color = CIRCLES[SELECTED].color;
        this.numbers = 1;
        this.writeNumber();
    }
}
//add more numbers
setInterval(function(){
    for(let circle of CIRCLES){
        circle.produceNumbers();
    }
}, 1000);
