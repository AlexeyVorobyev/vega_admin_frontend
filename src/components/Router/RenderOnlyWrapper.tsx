import {FC, ReactNode} from "react";
import {useLocation} from "react-router-dom";

interface IProps {
    paths: string[]
    children: ReactNode

}

export const RenderOnlyWrapper: FC<IProps> = ({
                                                  paths,
                                                  children
                                              }) => {
    const location = useLocation()

    console.log(location)

    return (
        <>
            {paths.includes(location.pathname) ? children : null}
        </>
    )
}