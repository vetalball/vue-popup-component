import Vue from 'vue';
import Popup from './Popup.vue';
import store from '../../store';
const popup = (propsData = {
    title: '',
    message: '',
    subtitle: '',
    bodyComponent: {},
    additional: {},
    container: '.popups'
}) => {
    const PopupComponent = Vue.extend(Popup);
    return new PopupComponent({
        el: document.createElement('div'),
        propsData,
        store
    })
}
export default popup;