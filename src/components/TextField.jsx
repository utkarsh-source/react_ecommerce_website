import React from 'react'
import {useFormContext, Controller} from 'react-hook-form'

function TextField({ name, label, required }) {
    const { control } = useFormContext();
     return (
        <div>
            <Controller
                as={TextField}
                control={control}
                fullwidth
                name={name}
                label={label}
                required={required}
            />
        </div>
    )
}

export default TextField
