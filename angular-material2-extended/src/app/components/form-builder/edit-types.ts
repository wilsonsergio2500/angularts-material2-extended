import { FormlyFieldConfig, FormlyFormBuilder } from '@ngx-formly/core';
import { Fields} from '../../fomly-fields/Fields';
import { FormlyGroup} from '../../fomly-fields/FormlyGroup';

export namespace EDIT_TYPES {

  const getLayoutClasses = () : Fields.ISelectOption[] => {

      let options : Fields.ISelectOption[] = [];
      for(var i = 1; i <= 12; i++){
        options.push({ label: `col-md-${i}`, value: `col-md-${i} col-xs-12`})
      }
    return options;
  }

  const TEMPLATE = [
       new Fields.HiddenField('id', 'id'),
       new Fields.SelectField('className', 'Class', getLayoutClasses(), true),
       new Fields.EditorField('template', 'template', true)
    ]


  const INPUT_TEXT = [
        new Fields.HiddenField('id', 'id'),
        new Fields.InputField('key', 'Key', true),
        new Fields.HiddenField('type', 'Type'),
        new Fields.SelectField('className', 'Class', getLayoutClasses(), true),
        new Fields.InputField('templateOptions.label', 'label', true),
        new Fields.CheckBoxField('templateOptions.required', 'Required')
    ] 


  export const NAMES = {
    input: new FormlyGroup<any>({ fields: INPUT_TEXT}),
    template: new FormlyGroup<any>({ fields: TEMPLATE})

  }

}
