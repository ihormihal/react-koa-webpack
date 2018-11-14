import React from 'react'
import Datetime from 'react-datetime'
import Dropdown from '@/components/dropdown'

const DatePicker = ({ input, meta, placeholder }) => {
    let dateString = input.value ? input.value.toISOString() : placeholder

    return (
        <Dropdown position="bottom" onClick={true} render={(close) => 
            <Datetime
                onChange={(value) => {
                    input.onChange(value)
                    // close()
                }}
                locale={'ru'}
                defaultValue={input.value}
                input={false}
            />
        }>
            <div className="btn">
                {dateString} <i className="ml1 mdi mdi-calendar" />
            </div>
        </Dropdown>
    )
}

export default DatePicker