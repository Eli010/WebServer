
export class CreateTodoDto{
    private constructor(
        public readonly text:string,

    ){}

    //aqui realizamos la validaciones
    static create(props:{[key:string]:any}):[string?,CreateTodoDto?]{
        const {text} = props;
        //si el texto no viene
        if(!text) return ['Text property is required', undefined];
        //aqui puede agregar más validaciones,capitalizar en mayuscula

        //retornamos nuestro objeto
        return [ undefined, new CreateTodoDto(text)];
    }
}