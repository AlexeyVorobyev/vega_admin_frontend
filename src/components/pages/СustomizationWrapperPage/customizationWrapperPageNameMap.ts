export const customizationWrapperPageNameMap = new Map([
    ['universities',
        {
            deleteQuery: (id:string) => {
                console.log(id)
            },
            table: 'новое учебное заведение',
            view: 'учебное заведение'
        }
    ]
])