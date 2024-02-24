function Input({ id, type,name, placeholder, required,defaultValue }) {
    return (
        <input
            id={id}
            name={name}
            className="w-full p-2 rounded-full"
            type={type}
            placeholder={placeholder} 
            required={required}
            defaultValue={defaultValue}
            />
    )
}

export default Input