import '../Scss/app.scss';
import FormValidator from './Validator/FormValidator';

window.addEventListener('load', e => {
    const forms = document.querySelectorAll('form[data-smedia-validate="1"]');

    if (forms.length === 0) {
        return;
    }

    forms.forEach(node => {
        new FormValidator(node);
    });
});
