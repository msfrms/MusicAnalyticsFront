import {IconButton, CaretIcon, useStyles, MenuItemButton} from './FilterComponentStyles'

import React from 'react'

import Popover from '@material-ui/core/Popover'
import Grid from '@material-ui/core/Grid'
import { Box } from '@material-ui/core'

export type MenuItemProps = {
  title: string,
  onClick: () => void
}

export type FilterProps = {
  prev: Array<MenuItemProps>
  current: MenuItemProps
  next: Array<MenuItemProps>
}

export default function FilterComponent(props: FilterProps) {
  const classes = useStyles();   
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const items = props.prev.concat([props.current], props.next)

  return (
    <Box className={classes.root}>
        <Popover
          onClick={handleClose}          
          className={classes.popover}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}>            
            {items.map((item) => <MenuItemButton onClick={item.onClick}>{item.title}</MenuItemButton>)}
        </Popover>

        <IconButton onClick={handleClick}>
          <Grid container direction="row" alignItems="center" wrap="nowrap">
            <Grid item>
              <Box className={classes.text}>{props.current.title}</Box>
            </Grid>            
            <Grid item container xs justify="flex-end">
              <CaretIcon />
            </Grid>
          </Grid>                  
        </IconButton> 
      </Box>
  )
}
