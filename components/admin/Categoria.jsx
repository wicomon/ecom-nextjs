const Categoria = ({categoria}) => {
    return (
        <option value="${categoria.id}">{categoria.subcategoria}</option>
    );
}
 
export default Categoria;