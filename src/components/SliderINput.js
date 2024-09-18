import React from 'react'

const SliderINput = ({title, onChange, state, min, max, labelMin, labelMax, underlineTitle}) => {
    return (
        <React.Fragment>
            <label>{title}</label>
            {state > 0 && <span style={{ textDecoration: 'underline' }}>{underlineTitle}</span>}
            <input
                type='range'
                min={min}
                max={max}
                className='slider'
                value={state}
                onChange={onChange} />
            <div className='more-labels'>
                <label>{labelMin ?? (min)}</label>
                <b>{state}</b>
                <label>{labelMax ?? (max)}</label>
            </div>
        </React.Fragment>
    )
}

export default SliderINput;