import {FC, ReactNode} from "react";
import {Link} from "react-router-dom";

interface IProps {
    to: string | null
    children: ReactNode
}

export const LinkRouterWrapper: FC<IProps> = ({
                                                  to,
                                                  children
                                              }) => {
    return (
        <>
            {to ? <Link
                to={to}
                style={{textDecoration: 'none'}}>
                {children}
            </Link> : children}
        </>
    )
}