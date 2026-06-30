// src/ui/core/Component.js
export default class Component {
    constructor(props = {}) { this.props = props; this.state = {}; this.element = null; }
    setState(newState) { this.state = { ...this.state, ...newState }; this.update(); }
    template() { return `<div></div>`; }
    render() {
        const temp = document.createElement('template');
        temp.innerHTML = this.template().trim();
        this.element = temp.content.firstChild;
        this.bindEvents(); this.onMount();
        return this.element;
    }
    update() {
        if (!this.element) return;
        const old = this.element; const next = this.render();
        if (old.parentNode) old.parentNode.replaceChild(next, old);
        this.onUpdate();
    }
    mount(selector) { document.querySelector(selector)?.appendChild(this.render()); }
    destroy() { this.onUnmount(); this.element?.remove(); }
    onMount() {} onUpdate() {} onUnmount() {} bindEvents() {}
}
