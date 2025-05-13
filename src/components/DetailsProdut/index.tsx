import {Item} from "@/interfaces/Foods";


const DetailsProdut = ({food}: { food: Item}) => {

    return (
        <div className="flex medium round padding   flex-col">
            {/* Logo do restaurante */}


            <div className={"row "}>
                <img src={food.image} className="small small-round"/>
                <h5 className="no-margin extra-bold">{food.name}</h5>
            </div>

            <div style={{justifyContent:"space-between"}} className={"row  gap-1 flex"}>

                <div className="row top-padding bottom-padding primary-text ">
                    <i>share</i>
                    <i>favorite</i>

                </div>

                <a style={{color:"#00A296"}} className="text-primary small bold ">mais infos <i className="material-symbols-outlined small">arrow_right</i> </a>
            </div>

            <div className="bold ">
                {/* Título + Link */}
                <div className="row space-between no-space">
                    <div className="primary-text bold  row ">
                        <i>pedal_bike</i>R$ 4,99
                    </div>
                    <i className="small gray-text">arrow_right</i>

                    <span className={"gray-text extra-bold"} >hoje,30-40 min  º 5.2km</span>

                </div>




                {/* Promoção de entrega */}
                <div className="small-space"></div>
                <div style={{color:"#00A296" , backgroundColor: "#00A29620"}} className="chip no-border extra-bold small  no-margin">entrega grátis acima de R$ 35,00</div>

                {/* Avaliação e horário */}
                <div className="row small-space small top-align">
                    <div className={"row gray-text"}><i style={{color:"#FFB300"}} className="fa-solid fa-star"></i> <span className={"bold small"}>{food.rank} de 5</span></div>

                <span className="green-text">fecha às 20:00</span>
                </div>

                {/* Pedido mínimo */}
                <p className="gray-text ">pedido mínimo: R$ 15,00</p>
            </div>
        </div>
    )
}

export default DetailsProdut;