export const changeFirstChildColor = (e : Event, newColor: string): void =>{
    const target : HTMLElement = e.currentTarget as HTMLElement;
    const child : HTMLElement = target.firstChild as HTMLElement;
    child.style.color = newColor;
}

export const changeColorPropety = (elem : HTMLElement,propety:string,color : string): void =>{
    elem.style.setProperty(propety,color);
}

export const doTransitionLeftColor = (id: number,oldColor: string, newColor: string,speed : number = 1,Itsradial:boolean = true): void => {
    let pos: number = 0;
    const paint = () => {
        if (pos > 100) {
            if (id) cancelAnimationFrame(id);
        } else {
            pos +=speed;
            const radial = Itsradial ? `radial-gradient(circle,rgba(255, 255, 255, 0.35) 0%, transparent ${pos>=72 ? 70 : pos}%),`: '';
            const color = radial+`linear-gradient(to left,${newColor}  ${pos}%, ${oldColor} ${pos}% )`;
            window.document.body.style.backgroundImage = color;
            id = requestAnimationFrame(paint);
        }
    };
    if (id) cancelAnimationFrame(id);
    id = requestAnimationFrame(paint); 
}
