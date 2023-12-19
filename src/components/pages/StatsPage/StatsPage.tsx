import {FC} from 'react'
import {Box, Stack, Typography} from '@mui/material'
import {theme} from '../../Theme/theme'
import CONFIG from '../../../globalConfig'

const StatsPage: FC = () => {

    return (<Box sx={{
        width: '100%',
        height: `100%`,
        display: 'flex',
    }}>
        <Stack direction={'column'} spacing={theme.spacing(2)} padding={theme.spacing(2)}
               width={'100%'}
               height={'100%'}>
            <Stack direction={'column'} spacing={theme.spacing(1)} flex={1}>
                <Typography variant={'h4'}>Количество пользователей</Typography>
                <iframe
                    src={CONFIG.stats1}
                    width="100%" height="85%" frameBorder="0"></iframe>
            </Stack>
            {/*<Stack direction={'column'} spacing={theme.spacing(1)}>*/}
            {/*    <Typography variant={'h4'}>Количество новых пользователей</Typography>*/}
            {/*    <iframe*/}
            {/*        src={CONFIG.stats2}*/}
            {/*        width="100%" height="300" frameBorder="0"></iframe>*/}
            {/*</Stack>*/}
        </Stack>
    </Box>)
}

export default StatsPage