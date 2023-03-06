import { useStyles, LogoIcon, MenuIcon } from './MenuComponentStyles'
import SearchComponent, { SearchProps } from '../search/SearchComponent'
import { InDevelopTooltipComponent } from '../infotooltip/InfoTooltipComponent'
import Image from '../core/image'
import { FlatButton } from '../core/FlatButton'

import React from 'react'

import Grid from '@material-ui/core/Grid'

import Media from 'react-media'
import { HistoryRouter } from '../../core/Router'
import { useHistory } from 'react-router-dom'

export type MenuItemProps = {
    title: string
    onClick: (router: HistoryRouter) => void
}

export type MenuProps = {
    search: SearchProps
    charts: MenuItemProps
    promotion: MenuItemProps
    bookmarks: MenuItemProps
}

function MobileMenuComponent(props: MenuProps) {
    const classes = useStyles()
    return (
        <Grid className={classes.rootMobile} container direction="row" alignItems="center">
            <LogoIcon />
            <Grid container item justify="flex-end" alignItems="center" xs spacing={2}>
                <Grid item>
                    <SearchComponent {...props.search} />
                </Grid>
                <Grid item>
                    <MenuIcon />
                </Grid>
            </Grid>
        </Grid>
    )
}

function DesktopMenuComponent(props: MenuProps) {
    const classes = useStyles()
    const history = useHistory()
    const tooltips = (menuItem: MenuItemProps) => {
        return (
            <InDevelopTooltipComponent
                showInElement={
                    <FlatButton
                        onClick={() => menuItem.onClick(history)}
                        className={classes.item}>
                        {menuItem.title}
                    </FlatButton>
                } />
        )
    }
    return (
        <Grid className={classes.root} container direction="row" alignItems="center" wrap="nowrap">
            <Grid item>
                <LogoIcon />
            </Grid>
            <Grid item style={{
                marginLeft: 20
            }}>
                <SearchComponent {...props.search} />
            </Grid>
            <Grid item style={{
                marginLeft: 30
            }}>
                <FlatButton
                    onClick={() => props.charts.onClick(history)}
                    className={classes.item}>
                    {props.charts.title}
                </FlatButton>
            </Grid>
            <Grid item style={{
                marginLeft: 30
            }}>
                {tooltips(props.promotion)}
            </Grid>

            <Grid container item justify="flex-end" alignItems="center">
                {tooltips(props.bookmarks)}
                <Image src="" className={classes.avatar} />
            </Grid>
        </Grid>
    )
}

export default function MenuComponent(props: MenuProps) {
    return (
        <Grid container>
            <Media
                query="(max-width: 770px)"
                render={() =>
                    <MobileMenuComponent {...props} />
                }
            />
            <Media
                query="(min-width: 771px)"
                render={() =>
                    <DesktopMenuComponent {...props} />
                }
            />
        </Grid>
    )
}
