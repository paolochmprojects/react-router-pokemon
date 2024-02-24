function Input({ id, type,name, placeholder, required,defaultValue }) {
    return (
        <input
            id={id}
            name={name}
            className="w-full p-1 pl-2 text-sm rounded-full"
            type={type}
            placeholder={placeholder} 
            required={required}
            defaultValue={defaultValue}
            />
    )
}

export default Input