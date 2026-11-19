import './RadioCheckboxButton.scss';

export const RadioCheckboxButton = ({field, id}) => {
    return (
      <>
        <label className="radio-checkbox-label" htmlFor={`field-${id}`}>
          <input type={field.type} name={field.name} id={`field-${id}`}/>
          <span className="radio-checkbox-button"></span>
          <span className="radio-checkbox-text">{field.label}</span>
        </label>
      </>
    )
}
