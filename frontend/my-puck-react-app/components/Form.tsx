import './Form.scss';
import { ComponentConfig } from "@measured/puck";
import { SelectBox } from "./SelectBox";
import { RadioCheckboxButton } from "./RadioCheckboxButton";
import { InputBox } from "./InputBox";

export type FormField = {
    label: string;
    type: string;
    name?: string;
}

export type Button = {
  label: string;
  type: "submit" | "reset" | "button";
  variant?: string;
}

export type FormProps = {
    title?: string
    fields: FormField[]
    buttons?: {
      list: Button[],
      align?: "center" | "left" | "right"
    }
};

function renderElement(field: FormField, i: any) {
    switch(field.type) {
      case 'select':
        return <SelectBox field={field} id={i} />
      case 'radio':
      case 'checkbox':
        return <RadioCheckboxButton field={field} id={i} />
      default:
        return <InputBox field={field} id={i}/>
    }
}

export const Form: ComponentConfig<FormProps> = {
    fields: {
        title: { type: "text" },
        fields: {
          label: 'form fields',
          type: "array",
          getItemSummary: (item) => item.label,
          arrayFields: {
            label: { type: "text" },
            name: { type: "text" },
            type: {
              type: "select",
              options: [
                { label: "Text", value: "text" },
                { label: "Number", value: "number" },
                { label: "Radio", value: "radio" },
                { label: "Checkbox", value: "checkbox" },
                { label: "Select", value: "select" },
              ],
            },
          },
          defaultItemProps: {
            label: "Text label",
            type: "text",
            name: 'field-name'
          },
        },
        buttons: {
          type: 'object',
          label: 'button group',
          objectFields: {
            list: {
              type: "array",
              getItemSummary: (item) => item.label || "Button",
              arrayFields: {
                label: { type: "text" },
                type: {
                  type: "select",
                  options: [
                    { label: "button", value: "button" },
                    { label: "submit", value: "submit" },
                    { label: "reset", value: "reset" },
                  ],
                },
                variant: {
                  type: "radio",
                  options: [
                    { label: "primary", value: "primary" },
                    { label: "secondary", value: "secondary" },
                  ],
                },
              },
              defaultItemProps: {
                label: "Button",
                variant: "primary",
                type: "button",
              },
            },
            align: {
              type: "select",
              options: [
                { label: "left", value: "left" },
                { label: "center", value: "center" },
                { label: "right", value: "right" },
              ],
            },
          }
        }
      },
      defaultProps: {
        title: 'My new form',
        fields: [{
          label: "Text label",
          type: "text",
          name: 'field-name'
        }]
      },
      render: ({ title, fields, buttons }) => {
        return (
          <form>
            {title && <h2 className="form-heading">{title}</h2>}
            {fields?.map((field, i) => (
              <div className={(field.type !== 'radio' && field.type !== 'checkbox') && 'form-field'} key={i}>
                {renderElement(field, i)} 
              </div>
            ))}
            {
              buttons &&
              <div className={'btn-group' + (buttons.align ? ` btn-group--${buttons.align}` : '')}>
                {buttons.list?.map((button, i) => (
                  <button type={button.type} key={i} className={'btn btn--'+ button.variant}>
                    {button.label}
                  </button>
                ))}
              </div>
            }
          </form>
        );
    },
}