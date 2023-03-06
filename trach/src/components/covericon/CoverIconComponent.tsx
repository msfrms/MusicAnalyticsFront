import Image from '../core/image'
import { FlatButton } from '../core/FlatButton'

import React from 'react'

import Grid from '@material-ui/core/Grid'

export type CoverIconProps = {
    coverUrl: string
    iconElement: React.ReactElement
    onClick: () => void
    style: {
        cover: {
            width: number
            height: number
            borderRadius: number
        },
        icon?: {
            marginLeft?: number,
            marginRight?: number,
            marginTop?: number,
            marginBottom?: number
        }        
    }
}

export default function CoverIconComponent(props: CoverIconProps) {    
    return (
        <Grid container direction="column">
            <Grid item style={{
                ...props.style.cover,
                position: 'relative',
                background: '#000000',
            }}>
                <Image src={props.coverUrl} style={{
                    position: 'absolute',                   
                    width: props.style.cover.width,
                    height: props.style.cover.height,
                    borderRadius: props.style.cover.borderRadius,                    
                    opacity: 0.3,
                }}/>         
                <Grid item container style={{
                    position: 'absolute',
                    ...props.style.icon
                }} justify="center" alignItems="center">
                    <FlatButton onClick={props.onClick}>
                        {props.iconElement}
                    </FlatButton>
                </Grid>
            </Grid>            
        </Grid>
    )
}
