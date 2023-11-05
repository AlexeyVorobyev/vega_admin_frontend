import {FC, ReactNode, useCallback, useMemo} from "react";
import {useLocation, useSearchParams} from "react-router-dom";
import {Box, Button, Divider, Stack, Typography} from "@mui/material";
import {theme} from "../../Theme/theme";
import {customizationWrapperPageNameMap} from "./customizationWrapperPageNameMap";
import {LinkRouterWrapper} from "../../LinkRouterWrapper/LinkRouterWrapper";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import {AlexDialogButton} from "../../AlexDialog/AlexDialogButton";

export enum EPageType {
    edit = 'edit',
    add = 'add',
    view = 'view'
}

interface IProps {
    children: ReactNode,
    namespace:string
}

export const CustomizationWrapperPage: FC<IProps> = ({children,namespace}) => {
    const location = useLocation()
    const pageState = useMemo(() => location.pathname.split('/')[location.pathname.split('/').length - 1], [location])
    const [searchParams] = useSearchParams()

    const SwitchRender = useCallback(() => {
        switch (pageState) {
            case EPageType.view:
                return (<>
                    <Stack height={'100%'} width={'100%'} direction={'column'}>
                        <Stack direction={'row'} spacing={theme.spacing(2)} padding={theme.spacing(2)}
                               justifyContent={'flex-end'} useFlexGap>
                            <LinkRouterWrapper to={-1} useNavigateProp sx={{marginRight: 'auto'}}>
                                <Button variant={'contained'} startIcon={<KeyboardReturnIcon/>}>
                                    <Typography
                                        variant={'button'}>Назад</Typography>
                                </Button>
                            </LinkRouterWrapper>
                            <AlexDialogButton
                                button={
                                    <Button variant={'contained'} color={'error'}>
                                        <Typography
                                            variant={'button'}>Удалить {customizationWrapperPageNameMap.get(namespace)!.view}</Typography>
                                    </Button>
                                }
                                dialog={{
                                    title: 'Подтвердите удаление',
                                    body: (
                                        <Stack direction={'row'} spacing={theme.spacing(2)} padding={theme.spacing(2)}>
                                            <Button
                                                id={'confirmButton'}
                                                sx={{width: '140px'}}
                                                color={'error'}
                                                variant={'contained'}>
                                                <Typography variant={'button'}
                                                            color={theme.palette.error.contrastText}>Удалить</Typography>
                                            </Button>
                                            <Button
                                                id={'cancelButton'}
                                                sx={{width: '140px'}}
                                                color={'neutral'}
                                                variant={'outlined'}>
                                                <Typography variant={'button'}
                                                            color={theme.palette.neutral.notContrastText}>Отмена</Typography>
                                            </Button>
                                        </Stack>
                                    ),
                                    functionsAssign: {
                                        'cancelButton': {
                                            close:true
                                        },
                                        'confirmButton': {
                                            close:true,
                                            function: () => customizationWrapperPageNameMap.get(namespace)!.deleteQuery(searchParams.get('id')!)
                                        }
                                    }
                                }}/>
                            <LinkRouterWrapper to={`./../edit?id=${searchParams.get('id')}`}>
                                <Button variant={'contained'}>
                                    <Typography
                                        variant={'button'}>Редактировать {customizationWrapperPageNameMap.get(namespace)!.view}</Typography>
                                </Button>
                            </LinkRouterWrapper>
                        </Stack>
                        <Divider/>
                        <Box sx={{display: 'flex', flex: 1, height: 0}}>
                            {children}
                        </Box>
                    </Stack>
                </>)
            case EPageType.edit:
                return (<>
                    {children}
                </>)
            case EPageType.add:
                return (<>
                    {children}
                </>)
            default:
                return (<Stack height={'100%'} width={'100%'} direction={'column'}>
                    <Stack direction={'row'} spacing={theme.spacing(2)} padding={theme.spacing(2)}
                           justifyContent={'flex-end'}>
                        <LinkRouterWrapper to={'add'}>
                            <Button variant={'contained'}>
                                <Typography
                                    variant={'button'}>Добавить {customizationWrapperPageNameMap.get(namespace)!.table}</Typography>
                            </Button>
                        </LinkRouterWrapper>
                    </Stack>
                    <Divider/>
                    <Box sx={{display: 'flex', flex: 1, height: 0}}>
                        {children}
                    </Box>
                </Stack>)
        }
    }, [pageState])

    return <SwitchRender/>
}