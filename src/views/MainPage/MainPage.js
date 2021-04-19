import styles from './MainPage.module.scss';
import { Button, Column, Row } from "carbon-components-react"
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
                <Button>Draw Chart</Button>
            </Column>
        </Row>
    );

}

export default MainPage;