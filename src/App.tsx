import React from "react";
import {SkeletonWrapper} from "./components/skeleton/SkeletonWrapper";
import {RouterComponent} from "./components/Router/RouterComponent";
import {useLoginStatus} from "./components/functions/useLoginStatus";
import {routesList} from "./components/Router/routesList";

const App:React.FC = () => {

    useLoginStatus()

    return (
        <SkeletonWrapper>
            <RouterComponent routesList={routesList}/>
        </SkeletonWrapper>
    )
}

export default App
