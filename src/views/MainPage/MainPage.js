import styles from './MainPage.module.scss';
import { Column, Row } from "carbon-components-react"
import ConfigurationSection from "./ConfigurationSection/ConfigurationSection";
import PlotArea from './PlotArea/PlotArea';

const MainPage = () => {

    return(  
        <Row>
            <Column>
                <ConfigurationSection />
            </Column>
            <Column>
                <PlotArea />
            </Column>
        </Row>
    );

}

export default MainPage;