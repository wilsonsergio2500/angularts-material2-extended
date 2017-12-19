
import { Fields } from '../../fomly-fields/Fields';
import { FieldGroups } from '../../fomly-fields/FieldGroups';
import { FormlyGroup} from '../../fomly-fields/FormlyGroup';


const input = new Fields.InputField('input', 'Input Type', false);
input.templateOptions.disabled = true;
input.className = 'draggable';

export namespace TYPES{

  const InputGroup = new FormlyGroup<any>({ fields: [ input]})

  export const ALL : FormlyGroup<any>[] = [
    InputGroup
    ]
}

export const TYPE_OPTIONS = [

    input

  
    
]
