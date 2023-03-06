import FilterComponent, { FilterProps } from '../../filter/FilterComponent'
import DatePickerComponent, { DatePickerProps } from '../../datepicker/DatePickerComponent'
import TrackComponent, { TrackProps } from '../../track/TrackComponent'
import MenuComponent, { MenuProps } from '../../menu/MenuComponent'
import { useStyles } from './ChartPageComponentStyles'
import { chartPageSelector } from './utils/ChartPageSelector'
import TrackLoaderComponent from '../../track/TrackLoaderComponent'
import { 
    GeneralLoadDataProps, 
    GeneralLoadDataTypes, 
    GeneralLoadDataEmptyComponent 
} from '../../core/GeneralLoadDataComponent'

import React, { Component } from 'react'
import { connectAdvanced } from 'react-redux'

import Grid, { GridWrap } from '@material-ui/core/Grid'

import Media from 'react-media'

export type ChartPageProps = {
    menu: MenuProps
    chartsFilterProps: FilterProps
    tracksFilterProps: FilterProps
    platformFilterProps: FilterProps    
    dateProps: DatePickerProps
    itemProps: GeneralLoadDataProps<TrackProps[]>
    didLoad: () => void 
}

type FilterBlockProps = {
    chartsFilterProps: FilterProps
    tracksFilterProps: FilterProps
    platformFilterProps: FilterProps
    dateProps: DatePickerProps
    wrap: GridWrap
}

function FilterBlockComponent(props: FilterBlockProps) {    
    return (
        <Grid item container spacing={3} wrap={props.wrap}>

                <Grid item container direction="row" spacing={2}>
                    
                    <Grid item direction="column">
                        <FilterComponent 
                            prev={props.chartsFilterProps.prev} 
                            current={props.chartsFilterProps.current} 
                            next={props.chartsFilterProps.next}/>                             
                    </Grid>

                    <Grid item direction="column">
                        <FilterComponent 
                            prev={props.tracksFilterProps.prev} 
                            current={props.tracksFilterProps.current} 
                            next={props.tracksFilterProps.next}/>                             
                    </Grid>

                </Grid>

                <Grid item container direction="row" spacing={2}>

                    <Grid item direction="column">
                        <FilterComponent 
                            prev={props.platformFilterProps.prev} 
                            current={props.platformFilterProps.current} 
                            next={props.platformFilterProps.next}/>                             
                    </Grid>

                    <Grid item direction="column">
                        <DatePickerComponent 
                            initialDate={props.dateProps.initialDate} 
                            onSelected={props.dateProps.onSelected} />                            
                    </Grid>

                </Grid>                           

            </Grid>
    )
}

function ContentComponent(props: GeneralLoadDataProps<TrackProps[]>) {

    switch (props.type) {

        case GeneralLoadDataTypes.EmptyData:
            return (
                <div style={{marginTop: 40}}>
                    <GeneralLoadDataEmptyComponent {...props}/>
                </div>                
            )                    

        case GeneralLoadDataTypes.LoadedData:
            return (
                <Grid item container direction="row" spacing={2} style={{marginTop: 40}}>
                    {props.data.map((track: TrackProps) => 
                        <Grid container item direction="row">
                            <TrackComponent {...track}/>
                        </Grid>
                    )}
                </Grid>
            )

        case GeneralLoadDataTypes.LoadingData:
            return (
                <Grid item container direction="column" style={{marginTop: 40}}>
                    <Grid container item direction="row">
                        <TrackLoaderComponent />
                    </Grid>                    
                    <Grid container item direction="row">
                        <TrackLoaderComponent />
                    </Grid>                    
                    <Grid container item direction="row">
                        <TrackLoaderComponent />
                    </Grid>                    
                    <Grid container item direction="row">
                        <TrackLoaderComponent />
                    </Grid>                    
                    <Grid container item direction="row">
                        <TrackLoaderComponent />
                    </Grid>                                        
                </Grid>
            )    
    }
}

function ChartPageWrapComponent(props: ChartPageProps) {
    const classes = useStyles()
    return (
       <div className={classes.root}>
        <Grid container>

            <MenuComponent {...props.menu}/>
            <Media 
                query="(min-width: 601px)" 
                render={() => 
                    <FilterBlockComponent wrap="wrap" {...props}/>
                }     
            />

            <Media 
                query="(max-width: 600px)" 
                render={() => 
                    <FilterBlockComponent wrap="nowrap" {...props}/>
                }     
            />
            
            <ContentComponent {...props.itemProps}/>
        </Grid>
       </div>      
    )
}

class ChartPageComponent extends Component<ChartPageProps> {

    componentDidMount() {                        
        this.props.didLoad()
    }

    render() {        
        return (
            <ChartPageWrapComponent {...this.props}/>
        )
    }
}

export default connectAdvanced(chartPageSelector)(ChartPageComponent)
