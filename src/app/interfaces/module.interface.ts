export interface IModule {
    id: number,
    uniId: string,
    name: string,
    type: string,
    rpm: {
      id: number,
      updatedAt: string | null
    },
    years: number[]
}
