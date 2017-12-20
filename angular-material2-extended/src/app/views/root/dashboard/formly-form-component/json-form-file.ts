
import { Fields } from '../../../../fomly-fields/Fields';


let input1 =  new Fields.InputField('input1', 'Input Field', true);
input1.expressionProperties = {
   'templateOptions.disabled': '!model.enabled',
}


let editor =  new Fields.EditorField('editor', 'Editor', true);
editor.expressionProperties = {
   'templateOptions.disabled': '!model.enabled',
}



export const fields = [

    input1,
    new Fields.EmailField('email', 'Email Field', true ),
    new Fields.NumberField('number', 'Number Field', true),
    new Fields.DatePickerField('date', 'Date', true),
    new Fields.CheckBoxField('enabled', 'Enabled'),
    editor

  ]
