import Scrollbars from "react-custom-scrollbars-2";
import Select, {components, OnChangeValue} from "react-select";
import React from "react";

interface PropTypes {
    options: MODEL[];
    value: MODEL;
    height: number
    onChange: Function;
}

interface MODEL {
    label: string | number,
    value: string | number
}

const InputSelect = (props: PropTypes) => {
    const {Option} = components;
    const renderScrollbar = (item: any) => {
        return (
            <div style={{height: props.height}}>
                <Scrollbars>{item.children}</Scrollbars>
            </div>
        );
    }
    const renderOption = (item: any) => {
        return(
            <Option {...item}>
                <div>{item.data.label}</div>
            </Option>
        );
    }

    const SelectItem = (event: OnChangeValue<MODEL, false>) => {
        props.onChange(event);
    }

    return(
        <Select
            options={props.options}
            placeholder="select ..."
            value={props.value}
            components={{
                Option: renderOption,
                MenuList: renderScrollbar
            }}
            isClearable
            onChange={SelectItem}
        />
    )
}

export default InputSelect;