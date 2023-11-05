import {CSSProperties, FC, ReactNode} from "react";
import {Link, To, useNavigate} from "react-router-dom";
import {Box, SxProps, Theme, Tooltip} from "@mui/material";

interface IProps {
    to: To | number | null
    relative?: 'path'
    useNavigateProp?: boolean
    children: ReactNode
    sx?: SxProps<Theme>
    tooltip?: boolean
}

export const LinkRouterWrapper: FC<IProps> = ({
                                                  to,
                                                  relative,
                                                  children,
                                                  useNavigateProp = false,
                                                  sx,
                                                  tooltip
                                              }) => {

    const navigate = useNavigate()

    return (
        <>
            {to
                ? useNavigateProp
                    ? <Box onClick={() => {
                        typeof to === 'number' ? navigate(to) : navigate(to)
                    }} sx={sx}>
                        {children}
                    </Box>
                    : tooltip
                        ? <Tooltip title={'Перейти'}>
                            <Link
                                to={to as string}
                                relative={relative ? relative : undefined}
                                style={{textDecoration: 'none', ...sx as CSSProperties}}>
                                {children}
                            </Link>
                        </Tooltip>
                        : <Link
                            to={to as string}
                            relative={relative ? relative : undefined}
                            style={{textDecoration: 'none', ...sx as CSSProperties}}>
                            {children}
                        </Link>
                : children}
        </>
    )
}