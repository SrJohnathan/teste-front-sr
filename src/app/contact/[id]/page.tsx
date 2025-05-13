import DetailsProdut from "@/components/DetailsProdut";
import {getFood} from "@/data/foods";
import DescriptonProduct from "@/components/DescriptonProduct";
import Footer from "@/components/Footer";
import {getMenuProduct} from "@/data/menuProduct";
import Appbar2 from "@/components/Appbar2";


const Page = async ({params}: { params: Promise<{ id: string }> }) => {

    const  pr = await params

      const  food = await  getFood( parseInt( pr.id  ) )

    const menu =  await getMenuProduct()



    return (

        <main className={"no-margin no-padding"}>
            <Appbar2/>
            <DetailsProdut food={food}/>
            <DescriptonProduct idFood={parseInt(pr.id)} menu={menu}/>
            <Footer/>
        </main>

    )

}

export default Page;