import { InputHTMLAttributes } from "react";
import { formatReal } from "@/app/util/money";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    columnClasses?: string;
    error?: string;
    formatter?: (value: string) => string;
}


export const Input: React.FC<InputProps> = ({
    label,
    columnClasses,
    id,
    error,
    formatter,
    onChange,
    ...inputProps
}: InputProps) => {

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const name = event.target.name;

        const formattedValue = (formatter && formatter(value)) || value;

        onChange?.({
            ...event,
            target: {
                name,
                value: formattedValue
            }
        } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <div className={`field column ${columnClasses}`}>
            <label className="label" htmlFor={id}>{label}</label>
            <div className="control">
                <input className="input"
                    onChange={onInputChange}
                    id={id} {...inputProps}
                />
                {error && <p className="help is-danger">{error}</p>}
            </div>
        </div>
    )
}

export const InputMoney: React.FC<InputProps> = (props: InputProps) => {
    return (
        <Input {...props} formatter={formatReal}/>
    )
}