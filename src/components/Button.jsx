function Button({text, type, style, onClick, icon}) {
    return (<button type={type} onClick={onClick}  
                className={`${style === "primary" && "bg-[#666666] text-white"} 
                        ${style=== "secondary" && "bg-[#F7F7F7] text-[#666666]"} 
                        text-sm capitalize font-bold py-1 rounded-full w-full flex justify-center items-center gap-2`}>
        {icon&& <img src={icon}/>}{text}
    </button>
    )
}

export default Button