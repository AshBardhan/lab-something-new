import './SelectBox.scss';

export const SelectBox = ({field, id}) => {
    return (
      <>
        <label htmlFor={`field-${id}`}>{field.label}</label>
        <select className="select-box" name={field.name} id={`field-${id}`}>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </>
    )
}
