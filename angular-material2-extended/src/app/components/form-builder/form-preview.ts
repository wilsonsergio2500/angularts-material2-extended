
import { Fields } from '../../fomly-fields/Fields';
import { FieldGroups } from '../../fomly-fields/FieldGroups';

//const input = new Fields.InputField('input', 'input', false);
//input.className = 'col-md-12';
const group =  new FieldGroups.GroupRow( [

    new FieldGroups.Template('<div [hidden]="true">Group 1</div>')
  
  
  ]);
group.className = 'droppable-group col-md-12';
group.template = '<span>gio</span>'



export const FORM_PREVIEW = [

   group
 
    
]
