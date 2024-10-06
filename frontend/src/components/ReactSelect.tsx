import Select from 'react-select';
import '../home.css'

export default function ReactSelect(props: any) {
    return (
        <Select
        options={props?.options || []}
        onChange={props.onChange}
        value={props.value}
        components={{
            IndicatorSeparator: () => null
          }}
        className='react-select-container'
        classNamePrefix="react-select"
    />
    )
}