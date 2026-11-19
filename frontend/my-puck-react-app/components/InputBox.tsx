import './InputBox.scss';

export const InputBox = ({field, id}) => {
    return (
      <>
        <label className="label" htmlFor={`field-${id}`}>{field.label}</label>
        <input className="input-text" type={field.type} name={field.name} id={`field-${id}`} />
      </>
    )
}
