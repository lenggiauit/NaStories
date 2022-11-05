import { ReactElement } from "react"
import { Translation } from "../translation";

const Introduce: React.FC = () => {

    return (<>

        <section className="section">
            <div className="container ">
                <header className="section-header"><h2><Translation tid="header_about_title" /></h2><hr />
                </header>
                <div className="row align-items-center">
                    <div className="col-md-4 team-2 mx-auto">
                        <img src="../../assets/images/ChiVan.jpg" alt="Chi Vạn" style={{ width: 256 }} />
                    </div> 
                    <div className="col-md-8">  
                        <p className="lead-2"> 
                            <Translation tid="header_about_description" /> 
                        </p>
                    </div> 
                </div>
            </div>
        </section>


    </>);
}

export default Introduce;