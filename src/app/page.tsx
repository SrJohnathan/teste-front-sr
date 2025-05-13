
import AppBar from "@/components/AppBar";
import Content from "@/app/content";




export default function Home() {
  return (

      <div className={"flex flex-col w-full "}>
        <AppBar/>

          <main style={{height:"800px"}} className={"no-padding  responsive no-margin  flex flex-col "}>
              <img className={"w-full"}  src="/651ac653c8d451.png"/>
                 <Content/>
          </main>

          <footer>

              <div className={"flex flex-col row center-align bg-base-200 padding primary-text"}>

                  <label className={"bold"}>
                      feito com 💜 em maringá-PR
                  </label>

                  <h6 className={"bold no-margin small"}>
                      aiqfome.com © 2007-2023 aiqfome LTDA .
                  </h6>
                  <h6 className={"bold no-margin small"}>CNPJ: 09.186.786/0001-58</h6>
              </div>

          </footer>

      </div>

  );
}
