import Image from '../core/image'
import { InDevelopTooltipComponent } from '../infotooltip/InfoTooltipComponent'
import { FlatButton } from '../core/FlatButton'
import { useStyles, BookmarkIcon } from './ArtistInfoComponentStyles'

import React from 'react'
import { Box } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

export type ContactProps = {
    title: string
    link: string
    onClick: () => void
}

export type ArtistInfoProps = {
    coverUrl: string
    name: string
    contacts: ContactProps[]
    onClickBookmark: () => void
}

function makeGroups(size: number, items: ContactProps[]): ContactProps[][] {
  var links: ContactProps[][] = []

  if (items.length < size) {
      links.push(items)
      return links
  }

  const count = Math.ceil(items.length / size)

  for (let index = 0; index < count; index++) {
    links.push(items.slice(index * size, index * size + size))
  }

  return links
}

export default function ArtistInfoComponent(props: ArtistInfoProps) {
    const classes = useStyles()

    const links = makeGroups(3, props.contacts)

    var contacts: JSX.Element[] = links.map((group, idx, links) => {
      return (
          <Grid item container direction="row">
              {                  
                  group.map((contact, index, group) => {
                    const isLast = idx === links.length - 1 && index === group.length - 1
                    if ((index + 1) % 3 === 0 || isLast)
                        return (
                            <Grid item direction="column">
                                <Box onClick={contact.onClick} className={classes.contact}>{contact.title}</Box>
                            </Grid>
                        )
                    else 
                        return (
                            <Grid item direction="column">
                                <Box onClick={contact.onClick} className={classes.contactWithPoint}>{contact.title + '  · '}</Box>
                            </Grid>
                        )  
                  })
              }
          </Grid>
      )
  })

    return (
        <Grid container wrap="nowrap">
            <Image className={classes.image} src={props.coverUrl}/>
            <Grid item container direction="column" alignItems="flex-start" justify="center" wrap="nowrap">
                <Grid item>
                  <Box m={0} className={classes.name}>{props.name}</Box>
                </Grid>
                <Grid item xs></Grid>
                <Grid item container xs direction="row" alignItems="center">
                    <div style={{height: 5, width: '100%'}}></div>
                    {contacts}
                </Grid>
                <Grid item xs></Grid>
                <Grid 
                  item 
                  container
                  direction="row"
                  alignContent="flex-end"
                  style={{height: 20, marginTop: 13, marginLeft: -6}}>
                    <InDevelopTooltipComponent showInElement={
                        <FlatButton onClick={props.onClickBookmark}>
                            <Grid item container alignItems="center">
                                <BookmarkIcon/>
                                <span className={classes.button}>В закладки</span>
                            </Grid>
                        </FlatButton>
                    }/>
                </Grid>
            </Grid>
        </Grid>
    )
}
