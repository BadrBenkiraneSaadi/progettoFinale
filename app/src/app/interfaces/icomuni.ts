export interface IComuni {
    content:[
        {
            id: number,
            nome: string,
            provincia: {
                id: number,
                nome: string,
                sigla: string
            }
        }
    ]
}
