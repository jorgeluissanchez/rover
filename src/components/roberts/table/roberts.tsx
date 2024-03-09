import { RobertDataTable } from "@/components/roberts/table/robert-data-table"
import { RobertColumns } from "@/components/roberts/table/robert-columns"

// Simulate a database read for tasks.
async function getroberts({ questionId }: { questionId: string }) {
    //const data = await fetchroberts(questionId)
    return [
        {
            id: 1,
            oxigen: 2,
        },
        {
            id: 2,
            oxigen: 3,
        },
        {
            id: 3,
            oxigen: 4,
        },
    ]
}


export async function Roberts({ questionId }: { questionId: string }) {
    const roberts = await getroberts({ questionId })
    return (
        <RobertDataTable columns={RobertColumns} data={roberts} />
    )
}

