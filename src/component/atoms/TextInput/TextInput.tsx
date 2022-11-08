
interface PropTypes {
    className?: string;
    type?: "text" | "password" | "number" | "date" | "time" | "email"
    name: string;
    value: string | number;
    placeholder: string;
    onChange: React.ChangeEventHandler;
    list?: string;
    isDisabled?: boolean;
}

const TextInput = (props: PropTypes) => {
    return(
        <input
            className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 ${props.className}`}
            type={props.type}
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
            list={props.list}
            onChange={props.onChange}
            disabled={props.isDisabled}
        />
    )
}

export default TextInput;