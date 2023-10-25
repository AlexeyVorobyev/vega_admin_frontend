import React from "react";
import './index.scss'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {theme} from "./components/Theme/theme";
import {ThemeProvider} from "@mui/system";
import {SkeletonWrapper} from "./components/skeleton/SkeletonWrapper";
import {RouterComponent} from "./components/Router/RouterComponent";
import {store} from "./redux/store/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

const App:React.FC = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <SkeletonWrapper>
                        <RouterComponent/>
                    </SkeletonWrapper>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    )
}

export default App
