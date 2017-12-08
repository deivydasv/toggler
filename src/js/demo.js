Toggler.Init({
    CLASS_TARGET_VISIBLE: 'active'
});

const load = () => {
    const content = document.getElementById('test-content');
    const button = document.getElementById('test-button');
    
    const toggler = new Toggler(content);
    toggler.show();
    
    button.addEventListener('click', _ => toggler.toggle());
};


document.readyState == 'loading' ? document.addEventListener('DOMContentLoaded', load) : load();