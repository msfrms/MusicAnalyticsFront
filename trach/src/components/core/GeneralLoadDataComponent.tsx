import { InfoIcon } from '../breadcrumbs/BreadcrumbsComponentStyles'

import React from 'react'

import Grid from '@material-ui/core/Grid'

export enum GeneralLoadDataTypes {
    LoadingData = "GeneralLoadDataTypes.LoadingData",
    EmptyData = "GeneralLoadDataTypes.EmptyData",
    LoadedData = "GeneralLoadDataTypes.LoadedData"
}

export type GeneralLoadDataLoading = {
    type: GeneralLoadDataTypes.LoadingData 
}

export type GeneralLoadDataEmpty = {
    type: GeneralLoadDataTypes.EmptyData
    text: string
}

export type GeneralLoadDataLoaded<T> = {
    type: GeneralLoadDataTypes.LoadedData
    data: T
}

export type GeneralLoadDataProps<T> = GeneralLoadDataLoading | GeneralLoadDataEmpty | GeneralLoadDataLoaded<T>

export function GeneralLoadDataEmptyComponent(props: GeneralLoadDataEmpty) {
    return (
        <Grid item container direction="row" alignItems="center">
            <Grid item style={{marginRight: 10}}>
                <InfoIcon />
            </Grid>
            <Grid item style={{marginTop: 3}}>
                <span style={{
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: 16,
                    color: '#000000',
                }}>
                    {props.text}
                </span>
            </Grid>
        </Grid>        
    )
}
