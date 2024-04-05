
function Block({children, title}) {
    return(
        <section className="bg-slate-50 p-10 shadow-md rounded-lg">
            {title && <h1 className="text-xl mb-4">{title}</h1>}
            {children}
        </section>
    )
}

export default Block