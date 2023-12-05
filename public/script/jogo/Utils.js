export class Utils{
    
    drawText(context,text, x, y, color="rgb(255,255,255)") {
        context.fillStyle = color;
        context.fillText(text, x, y);

    }

    drawStrokedText(context, text, x, y, color="rgb(255,255,255)") {
    
        context.fillStyle = "rgb(0,0,0)";
        context.font = '15px verdana'
        context.fillText(text, x - 1, y - 1);
        context.fillText(text, x + 1, y - 1);
        context.fillText(text, x - 1, y);
        context.fillText(text, x + 1, y);
        context.fillText(text, x - 1, y + 1);
        context.fillText(text, x + 1, y + 1);
        this.drawText(context, text, x, y, color)
    }
    drawTextPontuacao(context,text, x, y, color="rgb(255,255,255)") {
        context.fillStyle = color;
        context.font = '50px verdana'
        context.fillText(text, x, y);

    }
}