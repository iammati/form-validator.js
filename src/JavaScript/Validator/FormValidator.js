import validateEmail from './Validate/Email';
import validatePhone from './Validate/Phone';

/**
 * @name FormValidator
 * @description A lightweight vanilla-js form-validator.
 * Its email-validation is based on RFC3696 phone-validation
 * Google's libphonenumber package.
 * 
 * @see https://tools.ietf.org/html/rfc3696#page-5
 * @see https://github.com/google/libphonenumber
 * 
 * @author Mati Sediqi<mati_01@icloud.com>
 */
export default class FormValidator {
    classList = {
        error: 'fv-error',
        valid: 'fv-valid',
    };

    PNF;
    phoneUtil;

    /**
     * @param {HTMLFormElement} form The form-element to be validated.
     */
    constructor (form, novalidate = true) {
        this.PNF = require('google-libphonenumber').PhoneNumberFormat;
        this.phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

        if (novalidate) {
            form.setAttribute('novalidate', '');
        }

        const fields = form.querySelectorAll('input:not([type=submit]), select');

        fields.forEach(field => {
            field.addEventListener('blur', e => {
                if (e.currentTarget.value.length !== 0) {
                    this.handleValidation(e.currentTarget, this.validate(e.currentTarget));
                }
            });

            field.addEventListener('keyup', e => {
                if (e.currentTarget.classList.contains(this.classList.error) ||
                    e.currentTarget.classList.contains(this.classList.valid)
                ) {
                    this.handleValidation(e.currentTarget, this.validate(e.currentTarget));
                }
            });
        });

        form.addEventListener('change', e => {
            this.handleValidation(e.target, this.validate(e.target), e);
        });

        form.addEventListener('submit', e => {
            fields.forEach(field => {
                this.handleValidation(field, this.validate(field), e);
            });
        });
    }

    /**
     * @description Validating a single (just like you) field of a form-element.
     * @param {HTMLInputElement|HTMLSelectElement} field 
     * @returns {Boolean}
     */
    validate = (field) => {
        const { 
            type,
            value,
            minlength,
            maxlength,
            required,
        } = field;

        const length = value.length;

        // Validation for min-, maxlength and required
        if (minlength || 
            maxlength || 
            required
        ) {
            // Check here if length is smaller than minlength,
            // length exceeds maxlength or
            // length just equals 0 AND required is present
            if (length < minlength || 
                length > maxlength || 
                (length === 0 && required)
            ) {
                return false;
            }
        }

        // Validation for select
        if (field.tagName === 'SELECT') {
            const selectedOption = field.querySelector('option[selected]');
            const { disabled } = selectedOption;

            if ((required || disabled) && length === 0) {
                return false;
            }
        }

        // Validation for email
        if (type === 'email') {
            return !validateEmail(value);
        }

        // Validation for phone
        if (type === 'tel') {
            return !validatePhone(
                value,
                this.PNF,
                this.phoneUtil
            );
        }

        return true;
    }

    /**
     * @param {HTMLInputElement|HTMLSelectElement} field
     * @param {Boolean} valid
     * @param {Event} e
     * @returns {void}
     */
    handleValidation = (field, valid, e = null) => {
        if (valid === false) {
            if (e !== null) {
                e.preventDefault();
            }

            !field.classList.contains(this.classList.error) && field.classList.add(this.classList.error);
            field.classList.contains(this.classList.valid) && field.classList.remove(this.classList.valid);

            return console.error(field);
        }

        field.classList.contains(this.classList.error) && field.classList.remove(this.classList.error);
        !field.classList.contains(this.classList.valid) && field.classList.add(this.classList.valid);
    }
}
