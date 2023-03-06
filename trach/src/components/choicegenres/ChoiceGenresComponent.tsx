import { useStyles } from './ChoiceGenresComponentStyles'

import React from 'react'

import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';

export type ChoiceGenresProps = {
    genres: Array<string>
    onSelectedGenres: (genres: Array<string>) => void
}

function GenreTextFied(params: any) {
    const classes = useStyles()
    const newInputProps = {
        classes: {              
            notchedOutline: classes.notchedOutline,                                                                            
        },        
        ...params.InputProps            
    }
    return (
        <TextField
        className={classes.root}
            id="standard-name"                                                  
            placeholder="Выберите жанры"                       
            {...params}                      
            InputProps={{ disableUnderline: true, ...newInputProps }}                      
            />        
    )
}

export default function ChoiceGenresComponent(props: ChoiceGenresProps) {    
    return (
        <Autocomplete<string>
            multiple
            freeSolo
            id="genres_tags-filled"
            options={props.genres}
            renderTags={(value: string[], getTagProps) =>
                value.map((option: string, index: number) =>
                    (<Chip
                        variant="outlined"
                        label={option}
                        style={{
                            fontFamily: 'Roboto',
                            fontStyle: 'normal',
                            fontWeight: 'normal',
                            fontSize: 16,
                            textAlign: 'left',
                            color: '#000000',
                            height:30
                        }}
                        {...getTagProps({ index })}
                        />
                    ))}
            renderInput={(params) => GenreTextFied(params)}
            onChange={(_: any, newValue: string[]) => {            
                props.onSelectedGenres(newValue)
            }}
            />
    )
}