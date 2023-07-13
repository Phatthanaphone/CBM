import React from 'react'
import {StyledEngineProvider} from '@mui/material'


export default function InjecTailwind ({children}: any) {
    return <StyledEngineProvider>{children}</StyledEngineProvider>
}