import Select, {components, OnChangeValue} from "react-select";
import Scrollbars from "react-custom-scrollbars-2";

interface PropTypes {
    data: {label: string, value: string | number}[];
    value: {label: string, value: string | number};
    disable: false | true;
    callback: Function;
}

const SelectOptions = (props: PropTypes) => {
    const renderScrollbar = (props: any) => {
        return (
            <div style={{height: 130}}>
                <Scrollbars>{props.children}</Scrollbars>
            </div>
        );
    };

    const renderOptions = (props: any) => {
        return (
            <components.Option {...props}>
                <div>{props.data.label}</div>
            </components.Option>
        )
    }

    const handleSelectOptions = (event: OnChangeValue<any, false>) => {
        props.callback(event);
    }


    return(
        <Select
            maxMenuHeight={150}
            value={props.value}
            options={props.data}
            isClearable
            isDisabled={props.disable}
            onChange={handleSelectOptions}
            components={{
                Option: renderOptions,
                MenuList: renderScrollbar
            }}
            theme={theme => ({
                ...theme,
                colors: {
                    ...theme.colors
                },
                spacing: {
                    ...theme.spacing,
                    baseUnit: 4,
                    controlHeight: 38,
                    menuGutter: 8
                }
            })}
        />
    )
}

export default SelectOptions;