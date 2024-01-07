
export class TodoEntity {
    constructor(
        public id: number,
        public text: string,
        public completedAt: Date | null
    ) { }

    get isCompleted() {
        return !!this.completedAt;
    }

    //nos creamos para realizar un mapeo a nuestro infraetrucre impl
    public static fromObject(object: { [key: string]: any }):TodoEntity {
        //listamos lo que vamos a extraer
        const { id, text, completedAt } = object;
        //podemos realizar validadeciones 
        if (!id) throw 'Id is required';
        if (!text) throw 'Text is required';

        //la fecha convertimos  el date
        let newCompletedAt;
        if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if (isNaN(newCompletedAt.getTime())) {
                throw 'CompletedAt is not a valid date';
            }
        }
       return new TodoEntity(
            id, text, completedAt
        )
    }
}