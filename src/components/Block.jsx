
function Block({children, title}) {
    return(
        <section className="bg-white p-10 shadow-md ">
            {title && <h1 className="text-xl mb-4">{title}</h1>}
            {children}
        </section>
    )
}

export default Block