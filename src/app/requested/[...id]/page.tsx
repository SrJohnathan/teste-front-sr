
import RequestedDetails from "@/components/RequestedDetails";
import {getMenuProduct} from "@/data/menuProduct";
import Appbar2 from "@/components/Appbar2";


const Page = async ({params}: { params: Promise<{ id: string[] }> }) => {

    const  pr = await params

    const product = ( (await getMenuProduct())[2]).products[ parseInt( pr.id[0]  ) ]
    const p = ( (await getMenuProduct())[2])

    return (
        <main className={"no-margin no-padding"}>
            <Appbar2/>
            <RequestedDetails nameItem={p.name} product={product} contact={pr.id[1]}/>

        </main>
    )


}

export default Page;