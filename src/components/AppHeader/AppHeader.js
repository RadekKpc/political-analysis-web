import {Header, HeaderName} from 'carbon-components-react';
import styles from './AppHeader.module.scss';

const AppHeader = () => {

    return  <div className={styles.appHeader}>
                <Header aria-label="IBM Platform Name">
                    <HeaderName href="#" prefix="AGH">
                        Politics Analytics
                    </HeaderName>
                </Header>
            </div>

}

export default AppHeader;