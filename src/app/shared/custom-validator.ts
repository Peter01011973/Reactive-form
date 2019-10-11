import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export class CustomValidators {
    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                // if control is empty return no error
                return null;
            }

            // test the value of the control against the regexp supplied
            const valid = regex.test(control.value);

            // if true, return no error (no error), else return error passed in the second parameter
            return valid ? null : error;
        };
    }

    static passwordMatchValidator(control: AbstractControl) {
        const password: string = control.get('password').value; // get password from our password form control
        const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
        // compare is the password math
        if (password !== confirmPassword) { control.get('confirmPassword').setErrors({ NoPassswordMatch: true }) };
        // if they don't match, set an error in our confirmPassword form control
    }

    static dateValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const pattern = /(\d{2})\/(\d{2})\/(\d{4})/;

            const ptDatePattern = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
            let strDate = control.value;
            let today = new Date();
            let dt = new Date(strDate.replace(pattern,'$3-$2-$1'));
            return (!(strDate.match(ptDatePattern)) || !(today > dt)) ? { "date": true } : null;
        }
    }
}

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {

      const forbidden = nameRe.test(control.value);
      return forbidden ? {'forbiddenName': true} : null;
    };
}
