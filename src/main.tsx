import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App";
import {store} from "./redux/store/store";
import {theme} from "./components/Theme/theme";
import {Provider} from "react-redux";
import {ThemeProvider} from "@mui/system";
import {BrowserRouter} from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
)
