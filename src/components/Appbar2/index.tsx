

const Appbar2 = () => {

    return (
        <header className={"primary fixed no-round"}>
            <nav >
                <a className="transparent">
                    <img className="responsive" src="/aiqbranding.png"/>
                </a>

                <div className={"flex row max center-align"}>

                    <i className="fa-solid fa-location-dot  "></i>
                    <div className={"flex flex-col"}>
                        <span className={"bold"}>entregando em</span>
                        <h6 className={"bold small no-margin "}>Rua Mandaguari, 198 <i></i> </h6>
                    </div>

                </div>

                <a href={"/tickets"} className="circle transparent">
                    <i className="fa-regular fa-user"></i>
                </a>

            </nav>



        </header>
    )

}

export default Appbar2;